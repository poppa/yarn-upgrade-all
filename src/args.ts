import yargs from 'yargs'

const width: number | null =
  (process.stdout.columns || 0) > 120 ? 120 : process.stdout.columns || null

export const argv = yargs
  .usage('Usage: $0 [path] <options>')
  .option('r', {
    desc: 'Recursively update all package.json files in [path]',
    type: 'boolean',
    default: false,
  })
  .wrap(width)
  .version()
  .alias('version', 'v')
  .help()
  .alias('h', 'help')
  .epilog(`Copyright © ${new Date().getFullYear()}, Pontus Östlund`).argv
