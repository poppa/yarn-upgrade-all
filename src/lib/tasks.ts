import execa from 'execa'
import { green } from 'chalk'
import { ListrTask } from 'listr'
import { PackageJsonFile } from './parse'
import { IDependencyMap } from 'package-json'
import { dirname } from 'path'

type DepKeys = 'dependencies' | 'devDependencies' | 'optionalDependencies'

interface TaskOptions {
  key: DepKeys
  packs: IDependencyMap
  isWorkspace?: boolean
  path: string
}

function task({ key, packs, isWorkspace, path }: TaskOptions): ListrTask {
  const args = ['add', ...Object.keys(packs)]

  if (isWorkspace) {
    args.push('-W')
  }

  switch (key) {
    case 'devDependencies':
      args.push('--dev')
      break

    case 'optionalDependencies':
      args.push('--optional')
      break

    case 'dependencies':
      // No extra
      break
  }

  return {
    title: `Upgrading ${green(key)}`,
    async task(): Promise<boolean> {
      const res = await execa('yarn', args, { cwd: path })
      return res.exitCode === 0
    },
  }
}

export function getTasks(pack: PackageJsonFile): ListrTask[] {
  const tasks: ListrTask[] = []

  const dir = dirname(pack.path)

  if (pack.deps) {
    tasks.push(
      task({
        key: 'dependencies',
        packs: pack.deps,
        isWorkspace: pack.isWorkspace,
        path: dir,
      })
    )
  }

  if (pack.devDeps) {
    tasks.push(
      task({
        key: 'devDependencies',
        packs: pack.devDeps,
        isWorkspace: pack.isWorkspace,
        path: dir,
      })
    )
  }

  if (pack.optionalDeps) {
    tasks.push(
      task({
        key: 'optionalDependencies',
        packs: pack.optionalDeps,
        isWorkspace: pack.isWorkspace,
        path: dir,
      })
    )
  }

  return tasks
}
