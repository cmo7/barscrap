import {Command, Args} from '@oclif/core'
import {promises as fs} from 'node:fs'
// eslint-disable-next-line node/no-missing-import
import {parse, stringify} from 'csv/sync'
import {categorizeProduct} from '../../lib/categorizer'
import {Product} from '../../types/product'
import {Rule} from '../../types/rule'

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
          code: r[0],
          name: r[1],
          description: r[2],
          providerURL: '',
          provider: '',
          imageURLs: [],
          brand: '',
          category: [],
        }
        return product
      }) as Product[]

      const rulesString = await fs.readFile(args.rules, 'utf-8')
      const rules: Rule[] = await JSON.parse(rulesString)

      const categorized = rows.map(x => {
        return categorizeProduct(x, rules)
      }).map(p => {
        return {
          code: p.code,
          categories: p.category.join(','),
        }
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
