import { IDependencyMap, IPackageJSON } from 'package-json'
import { readFile } from './fs'

export interface PackageJsonFile {
  path: string
  name: string
  isWorkspace?: boolean
  readonly deps?: IDependencyMap
  readonly devDeps?: IDependencyMap
  readonly optionalDeps?: IDependencyMap
  readonly error?: Error
}

export async function parsePackageJsonFiles(
  files: string[]
): Promise<PackageJsonFile[]> {
  const packs: PackageJsonFile[] = []

  for (const file of files) {
    try {
      const p = JSON.parse((await readFile(file)).toString()) as IPackageJSON

      packs.push({
        path: file,
        name: p.name,
        deps: p.dependencies,
        devDeps: p.devDependencies,
        optionalDeps: p.optionalDependencies,
        isWorkspace: !!p.workspaces,
      })
    } catch (e) {
      packs.push({
        error: e,
        path: file,
        name: '<unresolved>',
      })
    }
  }

  return packs
}
