import { cyan } from 'chalk'
import { glob, safeStat } from './fs'

export interface CollectPackageJsonOptions {
  recurive?: boolean
}

export async function collectPackageJsonFiles(
  path: string,
  { recurive }: CollectPackageJsonOptions
): Promise<string[]> {
  const stat = await safeStat(path)

  let files: string[] = []

  if (!stat) {
    throw new Error(`Unknown path ${cyan(path)}`)
  }

  if (stat.isDirectory()) {
    console.log(`Handle directory`)

    if (!path.endsWith('/')) {
      path += '/'
    }

    if (recurive) {
      const globPath = `${path}**/package.json`

      files = await glob(globPath, {
        ignore: [`${path}**/node_modules/**`],
      })
    } else {
      files = [`${path}package.json`]
    }
  } else {
    files = [path]
  }

  return files
}
