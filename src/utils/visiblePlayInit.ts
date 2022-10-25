/**
 * 非活跃状态不播放
 * @param visiblePlay
 */
export default function visiblePlayInit(
  visiblePlay: (...params: any[]) => any
) {
  window.addEventListener('visibilitychange', () => {
    visiblePlay(document.visibilityState === 'visible')
  })
}
