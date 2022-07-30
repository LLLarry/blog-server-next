import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { tokenSelector } from '../../store'
import Layout from '../layout'
interface AuthProp {
  Component: React.FunctionComponent | React.ComponentClass;
  pageProps: {[key: string]: any};
}
const Auth: React.FC<AuthProp> = ({ Component, pageProps }) => {
  const router = useRouter()
  return <>
    {
      router.route === '/login' ? <Component {...pageProps} /> 
      : <Layout>
        <Component {...pageProps} />
      </Layout>
    }
  </> 
}

export default Auth