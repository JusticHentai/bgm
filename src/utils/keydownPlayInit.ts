/**
 * 初始化 键盘播放事件
 * @param play
 */
export default function keydownPlayInit(play: (...params: any[]) => void) {
  // 初始化触摸事件
  window.addEventListener('keydown', function remove() {
    window.removeEventListener('keydown', remove)
    play()
  })
}
