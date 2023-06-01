import {Command, Args} from '@oclif/core'
import {promises as fs} from 'node:fs'
// eslint-disable-next-line node/no-missing-import
import {parse} from 'csv/sync'

interface Rule {
    keywords: string[],
    category: string,
}

export class Rules extends Command {
    static description: string | undefined = 'Genera un archivo de reglas JSON a partir de un CSV';

    static args = {
      in: Args.string({
        name: 'in',
        description: 'Archivo de reglas en formato CSV',
        required: true,
      }),
      out: Args.string({
        name: 'out',
        description: 'Archivo de reglas en formato JSON',
        required: true,
      }),
    }

    async run(): Promise<void> {
      const {args} = await this.parse(Rules)
      const csvString = await fs.readFile(args.in, 'utf-8')
      const rows = parse(csvString, {
        // eslint-disable-next-line camelcase
        skip_empty_lines: true,
      }) as string[]

      const rules: Rule[] = rows.map(r => {
        const rule: Rule = {
          category: r[0],
          keywords: [],
        }
        if (r[6] !== '') {
          rule.keywords.push(r[6].toLocaleLowerCase())
        }

        if (r[7] !== '') {
          rule.keywords.push(r[7].toLocaleLowerCase())
        }

        return rule
      })

      const newRules: Rule[] = []

      for (const rule of rules) {
        const existingRule = newRules.find(r => r.category === rule.category)
        if (existingRule === undefined) {
          newRules.push(rule)
        } else {
          existingRule.keywords = [...existingRule.keywords, ...rule.keywords].filter((x, i, arr) => arr.indexOf(x) === i)
        }
      }

      const data = JSON.stringify(newRules.filter(x => x.keywords.length > 0 && x.category !== ''))

      await fs.writeFile(args.out, data, 'utf-8')
    }
}
