// 1、导入所有的svg
// 2、完成SvgIcon的全局注册
// 利用webpack的 require.context 依赖管理来导入所有的svg图标

// 获取svg目录下以.svg结尾的文件，此时返回了一个Require函数，可以接收一个 request的参数，用于require 的导//该函数提供了三个属性，可以通过 svgRequire.keys(）获得所有的 svg图标
// @ts-ignore
const svgRequire = require.context('./', true, /\.svg$/)
// Require.keys函数获取所有的路径，遍历并依次加载它
svgRequire.keys().forEach((r: string) => svgRequire(r))