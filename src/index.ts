import { Howl } from 'howler'
import {
  BGMState,
  Callback,
  DefaultOptions,
  InnerOptions,
  Options,
} from './types'
import bgmInit from './utils/bgmInit'
import eventInit from './utils/eventInit'
import keydownPlayInit from './utils/keydownPlayInit'
import touchPlayInit from './utils/touchPlayInit'
import visiblePlayInit from './utils/visiblePlayInit'

/**
 * bgm
 */
export default class Bgm {
  public options: InnerOptions
  private defaults: DefaultOptions = {
    loop: false,
    volume: 0.4,
    preload: 'metadata',
    touchPlay: false,
    keydownPlay: false,
    visiblePlay: true,
    env: 'dev',
  }

  constructor(options: Options) {
    this.options = { ...this.defaults, ...options }

    this.bgmInit()
  }

  // bgm 本体
  private bgm!: Howl
  bgmInit() {
    const {
      url,
      loop,
      preload,
      volume,
      keydownPlay,
      touchPlay,
      visiblePlay,
      onload,
      onplay,
      onpause,
      onend,
      onmute,
      env,
    } = this.options

    // 初始化事件
    const eventList = eventInit({
      events: {
        onload,
        onplay: this.onplay(onplay),
        onpause: this.onpause(onpause),
        onend: this.onend(onend),
        onmute: this.onmute(onmute),
      },
      env,
    })

    this.bgm = bgmInit({
      bgm: url,
      loop,
      preload,
      volume,
      ...eventList,
    })

    // 初始化触摸就播放事件
    touchPlay && touchPlayInit(this.play)

    // 初始化非活跃时关闭事件
    visiblePlay && visiblePlayInit(this.visiblePlay)

    // 初始化键盘播放事件
    keydownPlay && keydownPlayInit(this.play)
  }

  // bgm 状态
  state: BGMState = 'pause'
  // 用户控制 bgm 状态
  userState: BGMState = 'pause'
  // bgm 是否静音
  mute = false

  /**
   * 播放
   */
  play = () => {
    if (this.state === 'play') {
      return
    }

    this.userState = 'play'
    this.bgm.play()
  }

  /**
   * 暂停
   */
  pause = () => {
    if (this.state === 'pause') {
      return
    }

    this.userState = 'pause'
    this.bgm.pause()
  }

  /**
   * 切换播放状态
   */
  toggleState() {
    this.state === 'play' ? this.bgm.pause() : this.bgm.play()
  }

  /**
   * 静音
   */
  setMute() {
    this.mute = true
    this.bgm.mute(this.mute)
  }

  /**
   * 取消静音
   */
  unMute() {
    this.mute = false
    this.bgm.mute(this.mute)
  }

  /**
   * 切换静音状态
   */
  toggleMute() {
    this.bgm.mute(!this.mute)
  }

  onplay = (cb?: Callback) => {
    return (soundId: number) => {
      this.state = 'play'

      cb && cb(soundId)
    }
  }

  onpause = (cb?: Callback) => {
    return (soundId: number) => {
      this.state = 'pause'

      cb && cb(soundId)
    }
  }

  onend = (cb?: Callback) => {
    return (soundId: number) => {
      this.state = 'end'

      cb && cb(soundId)
    }
  }

  onmute = (cb?: Callback) => {
    const { env } = this.options
    return (soundId: number) => {
      this.mute = this.bgm.mute()
      env === 'dev' &&
        console.log(
          `%c[bgm]: ${soundId} ${this.mute ? '静音' : '取消静音'}`,
          'color: #00b894;'
        )

      cb && cb(soundId)
    }
  }

  visiblePlay = (state: boolean) => {
    if (this.userState !== 'play') {
      return
    }

    state ? this.bgm.play() : this.bgm.pause()
  }
}
