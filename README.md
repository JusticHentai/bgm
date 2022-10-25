# Bgm

基于 howler 添加兼容性封装的音效控制库，howler 解决大部分兼容问题 和 支持流媒体等音频，bgm 解决使用的各种场景一键化

## 安装

```bash
npm i @justichentai/bgm
```

## 使用

```ts
import Bgm from '@justichentai/bgm'

const bgm = new Bgm('url')

bgm.play()
```

## Api

```ts
import { Merge } from '@justichentai/types-utils';  
  
/**  
 * 初始化选项  
 */  
interface Options {  
    url: string | string[];  
    loop?: boolean;  
    volume?: number;  
    preload?: boolean | 'metadata';  
    keydownPlay?: boolean;  
    touchPlay?: boolean;  
    visiblePlay?: boolean;  
    onload?: Callback;  
    onplay?: Callback;  
    onpause?: Callback;  
    onend?: Callback;  
    onmute?: Callback;  
    env?: Env;  
}  
/**  
 * 默认选项  
 */  
interface DefaultOptions {  
    loop: boolean;  
    volume: number;  
    preload: boolean | 'metadata';  
    keydownPlay: boolean;  
    touchPlay: boolean;  
    visiblePlay: boolean;  
    env: Env;  
}  
declare type BGMState = 'play' | 'pause' | 'end';  
/**  
 * 环境变量回调  
 */  
declare type Env = 'prod' | 'dev';  
/**  
 * 回调  
 */  
declare type Callback = (soundId: number) => void;  
/**  
 * 内部选项  
 */  
declare type InnerOptions = Merge<Options, DefaultOptions> & Record<string, any>;  
  
/**  
 * bgm 
 */
 declare class Bgm {  
    options: InnerOptions;  
    private defaults;  
    constructor(options: Options);  
    private bgm;  
    bgmInit(): void;  
    state: BGMState;  
    userState: BGMState;  
    mute: boolean;  
    /**  
     * 播放  
     */  
    play: () => void;  
    /**  
     * 暂停  
     */  
    pause: () => void;  
    /**  
     * 切换播放状态  
     */  
    toggleState(): void;  
    /**  
     * 静音  
     */  
    setMute(): void;  
    /**  
     * 取消静音  
     */  
    unMute(): void;  
    /**  
     * 切换静音状态  
     */  
    toggleMute(): void;  
    onplay: (cb?: Callback) => (soundId: number) => void;  
    onpause: (cb?: Callback) => (soundId: number) => void;  
    onend: (cb?: Callback) => (soundId: number) => void;  
    onmute: (cb?: Callback) => (soundId: number) => void;  
    visiblePlay: (state: boolean) => void;  
}  
  
export { Bgm as default };
```
