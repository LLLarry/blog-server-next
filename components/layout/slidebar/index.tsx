import styled from "styled-components"
import { Menu, MenuProps } from 'antd'
import {Avatar} from 'antd'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deepCopy } from "@/utils/util"
type MenuItem = Required<MenuProps>['items'][number];
function Slidebar () {
  // 当前展开数组
  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 当前选中项
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const router = useRouter()
  const dispatch  = useDispatch()
  const handlerSelect: MenuProps['onClick'] = (menuInfo) => {
    router.push(menuInfo.key)
    // setSelectedKeys([menuInfo.key])
    const basePath = '/' + menuInfo.key.split('/')[1]
    // setOpenKeys([basePath])
  }
  const handleOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    if (openKeys.length <= 0) {
      setOpenKeys([])
    } else {
      setOpenKeys([openKeys[openKeys.length - 1]])
    }
  }

  useEffect(() => {
    let { route } = router
    if (/^\/article\/edit\/.+$/.test(route)) {
      route = '/article/add'
    }
    setSelectedKeys([route])
    const basePath = '/' + route.split('/')[1]
    setOpenKeys([basePath])
  }, [router])

  // 向redux中存入面包屑信息
  useEffect(() => {
    const openKey = openKeys[0]
    const selectedKey = selectedKeys[0]
    const openItem: any = deepCopy(items).find(item => item?.key === openKey)
    const list = []
    if (openItem) {
      list.push(openItem)
      if (Array.isArray(openItem.children) && openItem.children.length > 0) {
        let selectItem = openItem.children.find((item: any) => item?.key === selectedKey)
        if (selectItem) {
          if (/^\/article\/edit\/.+$/.test(router.asPath)) {
            selectItem.key = router.route
            selectItem.label = '编辑文章'
          } else if (/^\/article\/add$/.test(router.asPath)) {
            selectItem.key = router.route
            selectItem.label = '新增文章'
          }
          list.push(selectItem)
        }
      }
    }
    const payload = list.map(item => ({ title: item.label, path: item.key }))
    dispatch({
      type: 'SET_BREADCRUMB',
      payload
    })
  }, [openKeys, selectedKeys, router, dispatch])
  
  return <AppSlideBar>
    <LogoContent>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <LogoTitle>blog admin</LogoTitle>
    </LogoContent>
    <Menu
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      theme="dark"
      inlineCollapsed={false}
      items={items}
      onClick={handlerSelect}
      onOpenChange={handleOpenChange}
    />
  </AppSlideBar>
}
export default Slidebar

const AppSlideBar = styled.div`
  height: 100%;
  width: 235px;
  background-color: #001529;
`
const LogoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 5px;
  cursor: pointer;
  user-select: none;
`
const LogoTitle = styled.h1`
  color: #fff;
  text-transform: uppercase;
  font-size: 20px;
  margin: 0 0 0 12px;
  font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
  font-weight: 600;
  vertical-align: middle;
`
const items: MenuItem[] = [
  {
    label: '文章管理',
    key: '/article',
    children: [
      {
        label: '文章列表',
        key: '/article/list',
      },
      {
        label: '新增/编辑',
        key: '/article/add',
      },
    ]
  },
  {
    label: '用户信息',
    key: '/user',
    children: [
      {
        label: '用户列表',
        key: '/user/list',
      }
    ]
  },
  {
    label: '文件管理',
    key: '/file',
  }
]