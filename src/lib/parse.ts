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

function filterInternal(packs: PackageJsonFile[]): PackageJsonFile[] {
  const names = packs.map((p) => p.name)

  const rm = (deps?: IDependencyMap): void => {
    if (deps) {
      Object.keys(deps).forEach((n) => {
        if (names.includes(n)) {
          delete deps[n]
        }
      })
    }
  }

  for (const p of packs) {
    rm(p.deps)
    rm(p.devDeps)
    rm(p.optionalDeps)
  }

  return packs
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

  return filterInternal(packs)
}

export function hasDependencies(pack: PackageJsonFile): boolean {
  return (
    Object.keys(pack.deps || {}).length > 0 ||
    Object.keys(pack.devDeps || {}).length > 0 ||
    Object.keys(pack.optionalDeps || {}).length > 0
  )
}
