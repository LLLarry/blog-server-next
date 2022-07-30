import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { tokenSelector, wrapper } from '../store'
import Layout from '../components/layout'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import router from 'next/router'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import Auth from '../components/auth'
import '../assets/svgs'
import { QueryClient, QueryClientProvider } from 'react-query'
import Script from 'next/script'
// import 'antd/dist/antd.css';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: rgb(240, 242, 245);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  const token = useSelector(tokenSelector)
  const queryClient = new QueryClient()

  useEffect(() => {
    if (!token && router.route !== '/login') {
      router.replace('/login')
    }
  }, [token])

  // useEffect(() => {
  //   const handleRouteChange = (path: string) => {
  //   }
  //   router.events.on('routeChangeStart', handleRouteChange)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [token])
  return  <>
    <Head>
      <link rel="stylesheet" href="https://unpkg.com/antd@4.21.5/dist/antd.min.css" />
    </Head>
    <Script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js" />
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Auth Component={Component} pageProps={pageProps} />
        {/* {
          router.route === '/login' ? <Component {...pageProps} /> : 
          <Layout>
            <Component {...pageProps} />
          </Layout>
        } */}
      </ThemeProvider>
    </QueryClientProvider>
  </>
}

export default wrapper.withRedux(MyApp)