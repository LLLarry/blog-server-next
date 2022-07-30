import EditorForm from "@/components/editor-form"
import Editor from "@/components/editor"
import { Card, message } from "antd"
import Head from "next/head"
import Script from "next/script"
import React, { useCallback, useRef } from "react"
import styled from "styled-components"
import { editArticle, getEditArticle } from "@/request/article"
import { wrapper } from "@/store";
import { Article, Tag } from "@/type"
import { useMutation } from "react-query"

interface ArticleEditProp {
  data: {
    code: number;
    message: string;
    tags: Tag[];
    article: Article;
    type: 'add' | 'edit';
  };
}
const ArticleAdd: React.FC<ArticleEditProp> = ({ data }) => {
  const editorRef = useRef<any>(null)
  const { mutateAsync, isLoading } = useMutation<any, Error, any>('addArticle', editArticle)
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
      forData.append('userId', String(data.article.userId))
      forData.append('id', String(data.article.id))
      forData.append('file', new Blob())
      const { code, message: msg, id } = await mutateAsync(forData)
      if (code !== 200) return
      message.success(msg)
    } catch (error) {
      message.error((error as Error).message)
    }
  }, [data, mutateAsync])
  return <>
    <Head>
      <link rel="stylesheet" href="http://121.5.230.70/library/editormd/css/editormd.css" />
    </Head>
    
    <Script src="http://121.5.230.70/library/editormd/editormd.min.js"/>
    <CardBox>
      <Content className="card-left">
        <ContentCard>
            <EditorForm isLoading={isLoading} initialValues={data.article} tags={data.tags} reciveData={reciveData} />
        </ContentCard>
      </Content>
      <Content className="card-right">
        <ContentCard>
           <Editor ref={editorRef} initialValue={data.article.content || ''}  />
        </ContentCard>
      </Content>
    </CardBox>
  </>
}
export default ArticleAdd
//@ts-ignore
export const getServerSideProps =  wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  const data = await getEditArticle(etc.params)
  return { props: { data, ...etc.query } }
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