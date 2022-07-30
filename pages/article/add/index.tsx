import EditorForm from "@/components/editor-form"
import Editor from "@/components/editor"
import { Card, message } from "antd"
import Head from "next/head"
import Script from "next/script"
import React, { useCallback, useRef } from "react"
import styled from "styled-components"
import { addArticle, getAddArticle } from "@/request/article"
import { State, wrapper } from "@/store";
import { Tag, User } from "@/type"
import router from "next/router"
import { useMutation } from "react-query"

interface ArticleAddProp {
  data: {
    code: number;
    message: string;
    tags: Tag[];
    type: 'add' | 'edit';
  };
  user: State['user']
}
const ArticleAdd: React.FC<ArticleAddProp> = ({ data, user }) => {
  const editorRef = useRef<any>(null)
  const { mutateAsync, isLoading } = useMutation<any, Error, any>('addArticle', addArticle)
  const reciveData = useCallback(async (v: any) => {
    try {
      const forData = new FormData()
      for (let key in v) {
        if (v.hasOwnProperty(key)) {
          const va = key === 'tag' ? JSON.stringify(v[key]) : v[key]
          forData.append(key, va)
        }
      }
      forData.append('content', editorRef?.current.getContent?.() || '')
      forData.append('userId', String(user?.id))
      forData.append('file', new Blob())
      const { code, message: msg, id } = await mutateAsync(forData)
      if (code !== 200) return
      message.success(msg)
      setTimeout(() => {
        router.replace({ pathname: `/article/edit/${id}` })
      }, 2000)
    } catch (error) {
      message.error((error as Error).message)
    }
  }, [user, mutateAsync])
  return <>
    <Head>
      <link rel="stylesheet" href="http://121.5.230.70/library/editormd/css/editormd.css" />
    </Head>
    
    <Script src="http://121.5.230.70/library/editormd/editormd.min.js"/>
    <CardBox>
      <Content className="card-left">
        <ContentCard>
            <EditorForm isLoading={isLoading} tags={data.tags} reciveData={reciveData} />
        </ContentCard>
      </Content>
      <Content className="card-right">
        <ContentCard>
           <Editor ref={editorRef}  />
        </ContentCard>
      </Content>
    </CardBox>
  </>
}
export default ArticleAdd
//@ts-ignore
export const getServerSideProps =  wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  const user = store.getState().user
  const data = await getAddArticle()
  
  return { props: { data, user, ...etc.query } }
});

const Content = styled.div`
  padding: 20px 20px 0 20px;
  height: 100%;
  &.card-left {
    width: 300px;
    padding-right: 0;
  }
  &.card-right {
    flex: 1;
  }
`
const ContentCard = styled(Card)`
  height: 100%;
  .ant-card-body {
    height: 100%;
  }
`
const Editormd = styled.div`
  margin-bottom: 0 !important;
  &.editormd-fullscreen {
    z-index: 2;
  }
`

const CardBox = styled.div`
  display: flex;
  height: 100%;
`