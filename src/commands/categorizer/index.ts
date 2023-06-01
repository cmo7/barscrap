import {Command, Args} from '@oclif/core'
import {promises as fs} from 'node:fs'
// eslint-disable-next-line node/no-missing-import
import {parse, stringify} from 'csv/sync'

interface Rule {
    keywords: string[],
    category: string,
}

interface Product {
  id: string,
  name: string,
  description: string,
  category?: string[]
}

export class Categorizer extends Command {
    static description: string | undefined = 'Genera un archivo de reglas JSON a partir de un CSV';

    static args = {
      in: Args.string({
        name: 'in',
        description: 'Archivo con los productos a categorizar, CSV',
        required: true,
      }),
      rules: Args.string({
        name: 'rules',
        description: 'Archivo de reglas en formato JSON',
        required: true,
      }),
      out: Args.string({
        name: 'out',
        description: 'Archivo que contendrá los productos categorizados',
        required: true,
      }),
    }

    async run(): Promise<void> {
      const {args} = await this.parse(Categorizer)
      const csvString = await fs.readFile(args.in, 'utf-8')
      const rows = parse(csvString, {
        // eslint-disable-next-line camelcase
        skip_empty_lines: true,
      }).map((r: string[]) => {
        const product: Product = {
          id: r[0],
          name: r[1],
          description: r[2],
        }
        return product
      }) as Product[]

      const rulesString = await fs.readFile(args.rules, 'utf-8')
      const rules: Rule[] = await JSON.parse(rulesString)

      const categorized = rows.map(item => {
        item.category = []
        for (const rule of rules) {
          for (const keyword of rule.keywords) {
            const rawTextField = item.name + ' ' + item.description
            if (rawTextField.toLocaleLowerCase().includes(keyword)) {
              console.log('---- Text ----')
              console.log(rawTextField)
              console.log('---- contains -----')
              console.log(keyword)
              item.category.push(rule.category)
            }
          }
        }

        return item
      })

      const data = stringify(categorized, {
        header: true,
        columns: Object.keys(categorized[0]).map(x => {
          return {key: x, header: x}
        }),
      })
      await fs.writeFile(args.out, data, 'utf-8')
    }
}
