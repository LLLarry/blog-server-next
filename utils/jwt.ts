import { getValue, removeByKey, setValue } from "./session"

const TOKEN_KEY = '__TOKEN_KEY__'

/**
 * 获取token
 * @returns token
 */
export const getToken = () => {
  return getValue(TOKEN_KEY) || ''
}

/**
 * 设置token
 * @param token 
 */
export const setToken = (token: string) => {
  setValue(TOKEN_KEY, token)
}

/**
 * 移除token
 */
export const removeToken = () => {
  removeByKey(TOKEN_KEY)
}
