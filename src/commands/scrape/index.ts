import {Args, Command, Flags} from '@oclif/core'
import {promises as fs} from 'node:fs'
// eslint-disable-next-line node/no-missing-import
import {parse, stringify} from 'csv/sync'
import {batchProcess} from '../../web-scraper'
import webpages from '../../webpages'
import {Product} from '../../product'
// eslint-disable-next-line unicorn/import-style
import * as chalk from 'chalk'

export class Scrape extends Command {
  static description: string | undefined = 'Intenta descargar los datos de una serie de productos.';

  static args = {
    file: Args.string({
      name: 'file',
      description: 'Archivo de entrada con formato de un codigo de barras por línea',
      required: true,
    }),
    out: Args.string({
      name: 'out',
      description: 'Archivo de salida, con formato de un producto por fila en CSV',
      required: true,
    }),
    instances: Args.integer({
      min: 1,
      max: 20,
      default: 5,
      description: 'Número máximo de búsquedas simultaneas (por defecto 5)',
    }),
  }

  static flags = {
    failFile: Flags.string(
      {
        char: 'f',
        description: 'Fichero donde guardar registros no encontrados',
      },
    ),
  }

  async run(): Promise<any> {
    const {args} = await this.parse(Scrape)
    const {flags} = await this.parse(Scrape)
    console.log(`
██████╗  █████╗ ██████╗ ███████╗ ██████╗██████╗  █████╗ ██████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
██████╔╝███████║██████╔╝███████╗██║     ██████╔╝███████║██████╔╝
██╔══██╗██╔══██║██╔══██╗╚════██║██║     ██╔══██╗██╔══██║██╔═══╝
██████╔╝██║  ██║██║  ██║███████║╚██████╗██║  ██║██║  ██║██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝
    `)

    console.log(chalk.bold('Obteniendo productos de CSV de ' + args.file))
    console.log()

    const csvString = await fs.readFile(args.file, 'utf-8')
    const rows =  parse(csvString, {
      // eslint-disable-next-line camelcase
      skip_empty_lines: true,
    }) as string[]

    /*     console.log(`Buscando en Heo ${rows.length} registros`)
    const [resultsHeo, rowsNotFoundOnHeo] = await batchProcess(rows, 2, webpages.heo)
    console.log(`Encontrados ${resultsHeo.length} registros`)

    console.log(`Buscando en SD ${rowsNotFoundOnHeo.length} registros`)
    const [resultsSD, rowsNotFoundOnSD] = await batchProcess(rowsNotFoundOnHeo, 2, webpages.sd)
    console.log(`Encontrados ${resultsSD.length} registros`) */

    let pending = [...rows]
    let results: Product[] = []
    for (const w of Object.values(webpages)) {
      console.log()
      console.log('---------------------------------------------')
      console.log(
        chalk.green(
          `Buscando en ${w.name} ${pending.length} registros`,
        ))
      console.log('---------------------------------------------')

      // eslint-disable-next-line no-await-in-loop
      const [found, notFound] = await batchProcess(pending, args.instances, w)
      console.log('---------------------------------------------')
      console.log(`Encontrados ${found.length} registros`)
      pending = [...notFound]
      results = [...results, ...found]
    }

    const out = results.map(x => {
      return {
        ...x,
        code: x.code[0],
        imageURLs: x.imageURLs.join(', ').replace(/nrm\/m_/g, 'nrm/d_'),
      }
    })
    const data = stringify(out, {
      header: true,
      columns: Object.keys(out[0]).map(x => {
        return {key: x, header: x}
      }),
    })

    await fs.writeFile(args.out, data, 'utf-8')

    const plural = pending.length !== 1
    if (pending.length > 0) {
      console.log(`No se ${plural ? 'han' : 'ha'} podido encontrar ${chalk.red(pending.length)} ${plural ? 'productos' : 'producto'}`)
    }

    if (flags.failFile && pending.length > 0) {
      console.log(chalk.bold(
        plural ?
          `Los productos no encontrados se escriben en el archivo ${flags.failFile}` :
          `El producto no encontrado se escribe en el archivo ${flags.failFile}`,
      ))
      await fs.writeFile(flags.failFile, pending.join('/n'), 'utf-8')
    }
  }
}
