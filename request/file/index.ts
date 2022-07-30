import { ParamData } from '../../type'
import ajax from '../ajax'

/**
 * 获取文件夹列表
 * @returns 
 */
export const getFolders = <T>() => {
  return ajax.get<any,T>('/mvvmadmin/store/getFolders')
}

/**
 * 获取文件列表
 * @param params 
 * @returns 
 */
export const getFiles = <T>(params?: ParamData) => {
  return ajax.get<any, T>('/mvvmadmin/store/getFiles', {
    params
  })
}

/**
 * 删除文件列表
 * @param params { path: string }
 * @returns 
 */
 export const deleteFile = <T>(data?: ParamData) => {
   return ajax.post<any, T>('/mvvmadmin/store/deleteFile', data)
}

/**
 * 创建文件夹
 * @param params { folderName: string }
 * @returns 
 */
 export const createFolder = <T>(data?: ParamData) => {
  return ajax.post<any, T>('/mvvmadmin/store/createFolder', data)
}