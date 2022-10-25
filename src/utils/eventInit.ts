import { Env } from '../types'
import onload from './events/onload'
import onend from './events/onend'
import onplay from './events/onplay'
import onpause from './events/onpause'
import onmute from './events/onmute'

export interface Options {
  events: Record<string, any>
  env: Env
}

const apiMap: Record<string, any> = {
  onload,
  onend,
  onplay,
  onpause,
  onmute,
}

/**
 * 将事件与内部事件结合
 * @param options
 */
export default function eventInit(options: Options): Record<string, any> {
  const { env, events } = options

  let list = {}
  for (const key in events) {
    list = {
      ...list,
      [key]: apiMap[key]({
        cb: events[key],
        env,
      }),
    }
  }

  return list
}
