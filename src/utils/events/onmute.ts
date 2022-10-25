import { Env } from '../../types'

export interface Options {
  cb: (soundId: number) => void
  env: Env
}

/**
 * 资源加载完成事件
 * @param options
 */
export default function onmute(options: Options) {
  const { cb } = options

  return (soundId: number) => {
    cb && cb(soundId)
  }
}
