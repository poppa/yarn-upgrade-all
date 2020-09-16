// eslint-disable-next-line @typescript-eslint/no-var-requires
require('source-map-support').install()

import { yellow } from 'chalk'
import inquirer from 'inquirer'
import Listr from 'listr'
import { argv } from './args'
import { collectPackageJsonFiles } from './lib/collect'
import { parsePackageJsonFiles } from './lib/parse'
import { getTasks } from './lib/tasks'

export async function main(): Promise<boolean> {
  const path = argv._[0] ?? '.'
  const files = await collectPackageJsonFiles(path, { recurive: argv.r })
  const packs = await parsePackageJsonFiles(files)

  for (const p of packs) {
    const ok = await inquirer.prompt({
      message: `Do you want to upgrade all packages in ${yellow(p.name)}`,
      type: 'confirm',
      name: 'update',
    })

    if (ok.update) {
      const tasks = getTasks(p)
      const listr = new Listr([
        {
          title: `Upgrading packages in ${yellow(p.name)}`,
          task(): Listr {
            return new Listr(tasks)
          },
        },
      ])

      await listr.run()
    }
  }

  return true
}

// If not imported, e.g. run as entrypoint
if (require.main?.filename === __filename) {
  main().catch((e) => console.error(`Error in main:`, e))
}
