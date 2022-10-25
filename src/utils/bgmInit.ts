import { isArray } from '@justichentai/is'
import { Howl } from 'howler'

export type Options = {
  bgm: string | string[]
  loop: boolean
  preload: boolean | 'metadata'
  volume: number
} & Record<string, any>

/**
 * 初始化 bgm
 */
export default function bgmInit(options: Options): Howl {
  const { bgm, loop, preload, volume, ...rest } = options

  const src = isArray(bgm) ? bgm : [bgm]

  return new Howl({
    src,
    loop,
    preload,
    volume,
    ...rest,
  })
}
