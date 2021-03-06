import { cyan } from 'chalk'
import { glob, safeStat } from './fs'

export interface CollectPackageJsonOptions {
  recursive?: boolean
}

export async function collectPackageJsonFiles(
  path: string,
  { recursive }: CollectPackageJsonOptions
): Promise<string[]> {
  const stat = await safeStat(path)

  let files: string[] = []

  if (!stat) {
    throw new Error(`Unknown path ${cyan(path)}`)
  }

  if (stat.isDirectory()) {
    if (!path.endsWith('/')) {
      path += '/'
    }

    if (recursive) {
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
