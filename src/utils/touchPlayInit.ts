/**
 * 初始化 触摸播放事件
 * @param play
 */
export default function touchPlayInit(play: (...params: any[]) => void) {
  // 初始化鼠标移动事件
  window.addEventListener('mousemove', function remove() {
    window.removeEventListener('mousemove', remove)
    play()
  })

  // 初始化触摸事件
  window.addEventListener('touchstart', function remove() {
    window.removeEventListener('touchstart', remove)
    play()
  })
}
