import puppeteer, {Browser, Page} from 'puppeteer'
// eslint-disable-next-line unicorn/import-style
import * as chalk from 'chalk'
import {Webpage} from '../types/webpage'
import {Product} from '../types/product'

async function completeProduct(p: Product, page: Page, s: Webpage): Promise<Product> {
  const fullInfo = await extractProduct(page, s, p.code)
  return fullInfo
}

async function extractProduct(
  page: Page,
  s: Webpage,
  barcode: string,
): Promise<Product> {
  const selections = await Promise.all([
    page.$eval(s.dataSelectors.name, x => x.textContent),
    page.$eval(s.dataSelectors.mainImageURL, x => x.getAttribute('src')),
    page.$eval(s.dataSelectors.description, x => x.textContent),
    page.$eval(s.dataSelectors.brand, x => x.textContent),
    page.$eval(s.dataSelectors.category, x => x.textContent),
  ])

  const values = selections.map(x => x || '')

  const extraImages =
    (await page.$$eval(s.dataSelectors.extraImages, x =>
      x.map(y => y.getAttribute('src')),
    )) || []

  const p: Product = {
    code: barcode,
    provider: s.name,
    providerURL: page.url(),
    name: values[0],
    imageURLs: [values[1]],
    description: values[2],
    brand: values[3],
    category: values[4].split(','),
  }

  if (extraImages)
    p.imageURLs = [
      ...p.imageURLs,
      ...(extraImages.filter(x => x !== null) as string[]),
    ]

  // db.insert(p)

  return p
}

async function scrape(
  s: Webpage,
  barcode: string,
  browser: Browser,
): Promise<Product> {
  const page = await browser.newPage()
  await page.goto(s.url, {waitUntil: 'domcontentloaded'})
  await page.setViewport({width: 1920, height: 1080})
  await page.waitForSelector(s.navSelectors.ready)

  if (s.navSelectors.openSearch !== undefined) {
    await page.click(s.navSelectors.openSearch)
  }

  await page.waitForSelector(s.navSelectors.searchBox)
  await page.type(s.navSelectors.searchBox, barcode)
  await page.waitForSelector(s.navSelectors.searchButton)
  await page.click(s.navSelectors.searchButton)

  // await wait(1000)

  let p: Product = {
    code: barcode,
    name: '',
    imageURLs: [],
    description: '',
    brand: '',
    category: [],
    providerURL: '',
    provider: 'not found',
  }

  if (s.navSelectors.multipleResultsPage && s.navSelectors.firstResult) {
    try {
      await page.waitForSelector(s.navSelectors.multipleResultsPage, {
        timeout: 1000,
      })
      await page.click(s.navSelectors.firstResult)
    } catch {
      // console.log('No hay definidos selectores de búsquedas')
    }
  }

  try {
    await page.waitForSelector(s.navSelectors.resultsPage, {
      timeout: 1000,
    })
    p = await extractProduct(page, s, barcode)
  } catch {}

  await page.close()

  if (p.provider === 'not found') {
    console.log(chalk.red('No encontrado ') + barcode)
  } else {
    console.log(chalk.blue('Encontrado    ') + barcode)
  }

  return p
}

async function batchProcess(
  barcodes: string[],
  batchSize: number,
  w: Webpage,
): Promise<[Product[], string[]]> {
  const browser = await puppeteer.launch({headless: 'new'})

  let queue = barcodes // .filter(async x => !db.exists(x))

  let processed = 0
  let results: Product[] = []
  while (processed < queue.length) {
    // eslint-disable-next-line no-await-in-loop
    const openPages = await browser.pages()
    console.log('Páginas abiertas: ' + openPages.length)
    const batch = queue.slice(processed, processed + batchSize)
    try {
      console.log('Procesando Batch:')
      console.log(batch)
      results = [
        ...results,
        // eslint-disable-next-line no-await-in-loop
        ...(await Promise.all(batch.map(x => scrape(w, x, browser)))),
      ]
      processed += batchSize
    } catch {
      console.log('Error con el batch, devolviendo a la cola y continuando')
      queue = [...queue, ...batch]
    }
  }

  await browser.close()
  return [
    results.filter(x => x.provider !== 'not found'),
    results.filter(x => x.provider === 'not found').map(x => x.code),
  ]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function splitInBatches(
  barcodes: string[],
  batchSize: number,
): Promise<string[][]> {
  const result = []
  while (barcodes.length > 0) {
    const b = []
    for (let i = 0; i < batchSize && barcodes.length > 0; i++) {
      const data = barcodes.pop()
      if (data) b.push(data)
    }

    result.push(b)
  }

  return result
}

export {scrape, batchProcess, completeProduct}
