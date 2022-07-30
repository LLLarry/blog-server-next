// import { message } from "antd"
import ClipboardJS from "clipboard"
import router from "next/router"

export const deepCopy = <T>(target: T): T => {
  // @ts-ignore
  if (target instanceof Date) return new Date(target)
  // @ts-ignore
  if (target instanceof RegExp) return new RegExp(target)
  if (typeof target === 'object' && target !== null) {
    const newTarget = new (target as any).constructor()
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        newTarget[key] = deepCopy(target[key])
      }
    }
    return newTarget
  } else {
    return target
  }
}

/**
 * 是否是服务端
 * @returns 
 */
export const isSsr = () => !process.browser

/**
 * 是否是客户端
 * @returns 
 */
 export const isBrowser = () => process.browser


 export const cleanObject = <T extends {[key: string]: any}>(target: T) => {
  const t = deepCopy(target)
  const list = Object.keys(t)
  // @ts-ignore
    for (let key of list) {
      if (t[key] === null || typeof t[key] === 'undefined' || t[key] === '') {
        delete t[key]
      } 
    }
    return t as Partial<T>
 }



/**
 * 复制文本
 * @param text string 文本
 */
export const copyText = (text: string) => {
  let btn = document.querySelector('#copy-text-btn') as HTMLButtonElement | null
  // 不存在就创建button
  if (!btn) {
    btn = document.createElement('button')
    btn.id = 'copy-text-btn'
    btn.style.display = 'none'
    document.body.appendChild(btn)
  }
  btn.setAttribute('data-clipboard-text', text)
  const clipboard = new ClipboardJS('#copy-text-btn');
  clipboard.on('success', () => {
    handle('success')
  })
  clipboard.on('error', () => {
    handle('error')
  })

  // 触发按钮
  btn.click()

  // 删除btn按钮
  function handle (type: 'success' | 'error') {
    if (type === 'success') {
      // message.success('复制成功')
    } else {
      // message.error('复制失败')
    }
    clipboard.destroy()
    btn?.parentNode?.removeChild(btn)
  }
}

/**
 * 重新刷新
 * @returns 
 */
export const reload = () => router.replace({ pathname: router.route, query: router.query })