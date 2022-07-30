import { Axios, AxiosRequestConfig } from 'axios'
import { ParamData } from '../../type'
import ajax from '../ajax'

export const getArticleLis = (data?: ParamData) => {
  return ajax.get<any, any>('/mvvmadmin/article/getArticleList', {
    params: data
  })
}

export const article = (data?: ParamData) => {
  return ajax.post<any, any>('/search/article', data)
}

export const handleLogin = (data?: ParamData) => {
  return ajax.post<any, any>('/mvvmadmin/login/handlelogin', data)
}

/**
 * 获取新增文章初始化信息
 * @returns 
 */
export const getAddArticle = () => {
  return ajax.post<any, any>('/mvvmadmin/article/add')
}

/**
 * 获取编辑文章初始化信息
 * @returns 
 */
 export const getEditArticle = (data?: ParamData) => {
  return ajax.post<any, any>(`/mvvmadmin/article/edit/${data?.id}`)
}

/**
 * 编辑文章
 * @returns 
 */
 export const editArticle = (data?: ParamData, config?: AxiosRequestConfig) => {
  return ajax.post<any, any>(`/mvvmadmin/article/editArticle`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

/**
 * 新增文章
 * @returns 
 */
 export const addArticle = (data?: ParamData, config?: AxiosRequestConfig) => {
  return ajax.post<any, any>(`/mvvmadmin/article/addArticle`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

/**
 * 删除文章
 * @returns 
 */
 export const deleteArticle = (data?: ParamData) => {
  return ajax.post<any, any>(`/mvvmadmin/article/deleteArticle`, data)
}
