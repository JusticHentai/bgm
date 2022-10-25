import { Env } from '../../types'

export interface Options {
  cb: (soundId: number) => void
  env: Env
}

/**
 * 资源加载完成事件
 * @param options
 */
export default function onplay(options: Options) {
  const { cb, env } = options

  return (soundId: number) => {
    env === 'dev' &&
      console.log(`%c[bgm]: ${soundId} 开始播放`, 'color: #00b894;')

    cb && cb(soundId)
  }
}
