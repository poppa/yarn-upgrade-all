import fs from 'fs'
import { promisify } from 'util'
import { Glob, IOptions } from 'glob'
import { Maybe } from '../types'

export const readDir = promisify(fs.readdir)
export const readFile = promisify(fs.readFile)
export const stat = promisify(fs.stat)
export const exists = async (path: fs.PathLike): Promise<boolean> => {
  try {
    return !!(await stat(path))
  } catch (e) {
    return false
  }
}
export const mkdir = promisify(fs.mkdir)
export const rmdir = promisify(fs.rmdir)
export const writeFile = promisify(fs.writeFile)
export const unlink = promisify(fs.unlink)
export const rename = promisify(fs.rename)
export const symlink = promisify(fs.symlink)
export const truncate = promisify(fs.truncate)
export const write = promisify(fs.write)
export const access = promisify(fs.access)
export const appendFile = promisify(fs.appendFile)
export const chmod = promisify(fs.chmod)
export const chown = promisify(fs.chown)
export const close = promisify(fs.close)
export const copyFile = promisify(fs.copyFile)
export const link = promisify(fs.link)
export const readLink = promisify(fs.readlink)
export const realpath = promisify(fs.realpath)
export async function safeStat(path: fs.PathLike): Promise<Maybe<fs.Stats>> {
  try {
    return await stat(path)
  } catch {
    return undefined
  }
}

export async function glob(
  globPath: string,
  options?: IOptions
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      new Glob(globPath, options ?? {}, (err, matches) => {
        if (err) {
          reject(err)
        } else {
          resolve(matches)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
