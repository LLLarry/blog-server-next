/**
 * 设置值
 * @param key 
 * @param value 
 */
export const setValue = (key: string, value: unknown) => {
  value = (typeof value  === 'object' && value !== null) ? JSON.stringify(value) : String(value) 
  localStorage.setItem(key, value as string)
}

/**
 * 获取值
 * @param key 
 * @returns 
 */
export const getValue = (key: string) => {
  return localStorage.getItem(key)
}

/**
 * 获取值作为对象
 * @param key 
 * @returns 
 */
export const getValueAsObject = (key: string) => {
  try {
  const value = getValue(key)
    return value ? JSON.parse(value) : {}
  } catch (e) {
    return {}
  }
}

/**
 * 通过key进行移除
 * @param key 
 */
export const removeByKey = (key: string) => {
  localStorage.removeItem(key)
}

/**
 * 清理所有
 */
export const clear = () => {
  localStorage.clear()
}