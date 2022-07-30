// middleware.ts
import { NextResponse, NextRequest } from 'next/server'
import router from 'next/router'

/**
 * 获取路由表配置
 * @returns 
 */
 export const getRoutes = () => {
  // @ts-ignore
  const svgRequire = require.context('./pages', true, /.tsx$/)
  const routes = svgRequire.keys()
    .filter((key: string) => !/^\.\/\_/.test(key)) // 排除 _app.tsx _document.tsx api/xxx.ts文件
    .map((key: string) => {
      key = key.replace(/(\.tsx$)|((?<!\.)\/index\.tsx$)|(^\.)/g, '')
      const reg = /\[.+\]/g
      if (reg.test(key)) { // 动态路由
        key = key.replace(reg, '.+')
      }
      return key
    }) // 格式化路由、生成 /index /article/list /article/add ...
  return routes as string[]
} 

// 非权限路由
export const getNoAuthRoutes = () => ['/login']
// 获取权限路由
export const getAuthRoutes = () => {
  const noAuthRoutes = getNoAuthRoutes()
  return getRoutes().filter(key => !noAuthRoutes.includes(key))
}
/**
 * 匹配路由
 * @param routes 
 * @param pathname 
 * @returns 
 */
export const matchRoute = (routes: string[], pathname: string) => {
  return routes.some(route => new RegExp(`^${route}$`).test(pathname))
}

// import type { NextRequest } from 'next/server'
// 获取权限路由
const authRoutes = getAuthRoutes()
export function middleware(request: NextRequest, response: NextResponse) {
  
  // const paths = ['/article/list', '/article/add']
  const token = request.cookies.get("token")
  const tokenIsExist = token !== void 0 && token !== 'ETI' // token是否存在
  const {pathname, origin} = request.nextUrl
  if (!tokenIsExist && matchRoute(authRoutes, pathname)) {
    // 重定向到login页面
    return NextResponse.redirect( `${origin}${router.basePath}/login`)
  }
  // if (!tokenIsExist && authRoutes.includes(pathname)) {
  //   // 重定向到login页面
  //   return NextResponse.redirect( `${origin}/login`)
  // }
  
  // return NextResponse.redirect(new URL('/about-2', request.url))
  return NextResponse.next()
}




