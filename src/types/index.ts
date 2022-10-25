import MyApiMap from './ApiMap'
import Merge from './Merge'

/**
 * 初始化选项
 */
export interface Options {
  url: string | string[] // 音乐 url
  loop?: boolean // 循环
  volume?: number // 音量
  preload?: boolean | 'metadata' // 是否提前加载
  keydownPlay?: boolean // 是否按键后播放
  touchPlay?: boolean // 是否触摸后播放
  visiblePlay?: boolean // 页面是否激活状态才播放
  onload?: Callback // 音频加载完毕回调
  onplay?: Callback // 音频开始播放回调
  onpause?: Callback // 音频暂停播放回调
  onend?: Callback // 音频结束播放回调
  onmute?: Callback // 音频静音回调
  env?: Env // 环境变量
}

/**
 * 默认选项
 */
export interface DefaultOptions {
  loop: boolean
  volume: number
  preload: boolean | 'metadata'
  keydownPlay: boolean
  touchPlay: boolean
  visiblePlay: boolean
  env: Env
}

export type BGMState = 'play' | 'pause' | 'end'

/**
 * 环境变量回调
 */
export type Env = 'prod' | 'dev'

/**
 * 回调
 */
export type Callback = (soundId: number) => void

/**
 * 内部选项
 */
export type InnerOptions = Merge<Options, DefaultOptions> & Record<string, any>

/**
 * 映射列表类型
 */
export type ApiMap = MyApiMap<InnerOptions>
