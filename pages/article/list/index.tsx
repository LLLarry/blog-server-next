import styled from "styled-components"
import { Card, Table, Tag, Badge, Button, Modal, message } from 'antd'
import SearchHeader from "@/components/search-header"
import { SearchOutlined } from '@ant-design/icons';
import { Article, BaseReturnType, TagColor } from "../../../type";
// import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import SelectColumn from "@/components/select-column";
import { ColumnType } from "antd/lib/table";
import SelectDensity from "@/components/select-density";
import Pagination from "@/components/pagination";
import { deleteArticle, getArticleLis } from "@/request/article";
import { wrapper } from "@/store";
import router from 'next/router'
import Link from "next/link";
import { reload } from "@/utils/util";

interface ArticleListProp {
  data: BaseReturnType & { data: Article[], count: number };
  page?: string;
}
const list: React.ComponentProps<typeof SearchHeader>['list'] = [
  {
    key: 'input',
    formItem: {
      label: '文章ID',
      name: 'id',
    },
    input: {
      style: {width: '160px'},
      placeholder: '请输入文章ID'
    }
  },
  {
    key: 'input',
    formItem: {
      label: '标题',
      name: 'title',
    },
    input: {
      style: {width: '160px'},
      placeholder: '请输入文章标题'
    }
  },
  {
    key: 'input',
    formItem: {
      label: '作者',
      name: 'username',
    },
    input: {
      style: {width: '160px'},
      placeholder: '请输入文章作者'
    }
  },
  {
    key: 'select',
    formItem: {
      label: '标签',
      name: 'tag',
    },
    select: {
      placeholder: '请选择文章标签',
      style: {width: '160px'},
      options: [
        { label: '无', value: '' },
        { label: 'javascript', value: '1' },
        { label: 'css', value: '2' },
        { label: 'html', value: '3' },
        { label: 'webpack', value: '4' },
      ]
    }
  },
  {
    key: 'select',
    formItem: {
      label: '更新时间',
      name: 'updateTime',
    },
    select: {
      placeholder: '请选择更新时间',
      style: {width: '160px'},
      options: [
        { label: '无', value: '' },
        { label: '从近到远', value: '1' },
        { label: '从远到进', value: '2' }
      ]
    }
  },
  {
    key: 'select',
    formItem: {
      label: '创建时间',
      name: 'createTime',
    },
    select: {
      placeholder: '请选择创建时间',
      style: {width: '160px'},
      options: [
        { label: '无', value: '' },
        { label: '从近到远', value: '1' },
        { label: '从远到进', value: '2' }
      ]
    }
  },
  {
    key: 'button',
    formItem: {},
    button: {
      children: '搜索',
      type: 'primary',
      htmlType: 'submit',
      icon: <SearchOutlined />
    }
  }
]
export interface ColumnTypeWithProp<T> extends Omit<ColumnType<T>, 'title'> {
  checked?: boolean;
  title: string;
}
export type ColumnsTypeWithProp<T> =  ColumnTypeWithProp<T>[]

export const initColumns: ColumnsTypeWithProp<Article> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 70,
    fixed: 'left'
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    width: 140,
    fixed: 'left'
  },
  {
    title: '文章作者',
    dataIndex: 'username',
    key: 'username',
    width: 100
  },
  {
    title: '文章标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 130,
    render(_, { tags }) {
      return tags.map(tag => <Tag key={tag.id} color={TagColor[tag.id]}>{tag.name}</Tag>)
    }
  },
  {
    title: '是否开启评论',
    dataIndex: 'comment',
    key: 'comment',
    width: 110,
    render (_, { comment }) {
      return (comment === 1 ? <Badge color="green" text="开启" /> : <Badge color="red" text="关闭" />)
    }
  },
  {
    title: '浏览次数',
    dataIndex: 'viewCount',
    key: 'viewCount',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 140
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 140
  },
  {
    title: '操作',
    key: 'handler',
    width: 140,
    fixed: 'right',
    render (_, { id, title }) {
      return <>
          <Link href={`/article/edit/${id}`}>
            <Button size="small" type="primary" style={{marginRight: 10}}>编辑</Button>
          </Link>
          <Button size="small" type="primary" danger onClick={ () => hanleDelete({ title, id })}>删除</Button>
      </>
    }
  },
]

const hanleDelete = ({ title, id }: Pick<Article, 'title'| 'id'>) => {
  Modal.confirm({
    title: '提示',
    content: <div>确认删除<DeleteSpan>{title}</DeleteSpan>吗？</div>,
    okText: '确认',
    cancelText: '取消',
    async onOk () {
      await deleteArticle({ id })
      message.success('删除成功')
      reload()
    }
  })
}
// const data: Article[] = [{"id":35,"title":"关于css3的3D动画","desc":"关于css3的3D动画","content":null,"viewCount":7,"comment":1,"picture":null,"userId":1,"createTime":"2022-06-17 11:31:48","updateTime":null,"tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":34,"title":"SpringBoot集成Swagger","desc":"SpringBoot集成Swagger","content":null,"viewCount":9,"comment":1,"picture":null,"userId":1,"createTime":"2022-06-17 09:05:26","updateTime":null,"tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":33,"title":"typescript中高级用法","desc":"typescript中高级用法","content":null,"viewCount":14,"comment":1,"picture":null,"userId":1,"createTime":"2022-05-29 08:52:56","updateTime":"2022-05-29 10:24:03","tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":32,"title":"Navicat15安装激活教程","desc":"Navicat15安装激活教程","content":null,"viewCount":20,"comment":1,"picture":null,"userId":1,"createTime":"2022-05-25 08:36:00","updateTime":"2022-05-25 08:41:36","tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":31,"title":"linux定时备份数据库","desc":"linux定时备份数据库","content":null,"viewCount":27,"comment":1,"picture":null,"userId":1,"createTime":"2022-04-29 16:40:27","updateTime":null,"tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":30,"title":"npx和nvm详解","desc":"npx和nvm详解","content":null,"viewCount":16,"comment":1,"picture":null,"userId":1,"createTime":"2022-04-28 18:44:01","updateTime":null,"tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":29,"title":"实用工具","desc":"有了这些工具能让你的开发效率翻倍","content":null,"viewCount":0,"comment":1,"picture":null,"userId":1,"createTime":"2022-04-26 15:47:01","updateTime":"2022-05-05 16:25:12","tags":[],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":28,"title":"SPA单页面应用调用微信JSSDK","desc":"## 1、为什么要写这篇文章？\\r\\n\\r\\n本文记录了我是如何在调用`微信JSSDK`时踩到的坑，以及爬出来的过程；\\r\\n\\r\\n如果你也遇到了相同的问题，希望这篇文章能够帮助你","content":null,"viewCount":15,"comment":1,"picture":null,"userId":1,"createTime":"2022-04-23 15:10:25","updateTime":null,"tags":[{"id":1,"name":"javascript"}],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":27,"title":"React和Vue中使用SVG","desc":"","content":null,"viewCount":14,"comment":1,"picture":null,"userId":1,"createTime":"2022-04-21 10:43:06","updateTime":"2022-04-22 15:56:40","tags":[{"id":1,"name":"javascript"}],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}},{"id":26,"title":"跨域请求如何携带cookie?","desc":"跨域请求如何携带cookie?","content":null,"viewCount":3,"comment":1,"picture":null,"userId":1,"createTime":"2022-04-20 11:48:07","updateTime":"2022-06-16 14:06:09","tags":[{"id":1,"name":"javascript"}],"user":{"id":0,"username":"larry","password":null,"avatar":"/upload/feng1.png","email":null,"createTime":null}}]
const ArticleList: React.FC<ArticleListProp> = ({ data, page }) => {
  const { code, data: items, count } = data
  console.log(router)
  const [columns, setColumns] = useState(initColumns)
  // 设置表格列的距离
  const [selectedKey, setSelectKey] = useState<'large' | 'middle' | 'small'>('small')
  // 设置分页数据
  // const [pageInfo, setPageInfo] = useState({
  //   page: 1,
  //   total: count
  // })

  // useEffect(() => {
  //   //@ts-ignore
  //   const pageNum = Number(router?.router?.state.query.page)
  //   const page = Number.isNaN(pageNum) ? 1 : pageNum
  //   setPageInfo(oldPageInfo => ({ ...oldPageInfo, total: count, page }))
  // }, [count, setPageInfo])


  // 需要设置的列
  const configColumns = useMemo(() => {
    return columns.reduce((acc, column) => {
      if (typeof column.checked !== 'boolean') {
        column.checked = true
      }
      if (column.fixed === 'left') {
        acc[0].push(column)
      } else if (column.fixed === 'right') {
        acc[2].push(column)
      } else {
        acc[1].push(column)
      }
      return acc
    }, [[], [], []] as ColumnsTypeWithProp<Article>[])
  }, [columns])

   // 需要设置的列
   const tableColumns = useMemo(() => {
    return columns.filter(column => column.checked !== false)
  }, [columns])

  const handleSetPage = (page: number) => {
    const query = {...router.query, page: String(page) }
    router.push({ pathname: router.route, query })
  }
  return <div>
    <SearchHeader list={list} style={{ margin: '20px' }} />
    <Card style={{ margin: '20px' }}>
      <TableSet>
        <SelectDensity selectedKey={selectedKey} setSelectKey={setSelectKey} />
        <SelectColumn data={configColumns} setColumns={setColumns}/>
      </TableSet>
      <Table
        bordered
        size={selectedKey}
        columns={tableColumns}
        dataSource={items}
        rowKey={record => record.id}
        scroll={{ x: 1000 }}
        pagination={false}
      />
      {/* 分页组件 */}
      <PaginationBox>
        <Pagination pageInfo={{ total: count, page: Number(page || 1) }} setPageInfo={handleSetPage}  />
      </PaginationBox>
    </Card>
  </div>
}
export default ArticleList 

const TableSet = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`
const PaginationBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`

const DeleteSpan = styled.span`
  font-weight: bold;
  color: #1890ff;
`
//@ts-ignore
export const getServerSideProps =  wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  // const cookies = new Cookies(req.headers.cookie)
  // console.log(`cookies.get("token")`, cookies.get("token"))
  // console.log(`store.getState()`, store.getState())
  // store.dispatch({ type: 'SET_USER', payload: { name: 'zs' } })
  // store.dispatch({ type: 'SET_TOKEN', payload: '' })
  const data = await getArticleLis(etc.query)
  return { props: { data, ...etc.query } }
});
