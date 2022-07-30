import { Button } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { handleLogin } from "../../request/article"
import { tokenSelector } from "../../store"
import router from 'next/router'


const Login = () => {
  const dispatch = useDispatch()
  const token = useSelector(tokenSelector)

  const handlerLoginFn = () => {
    handleLogin({
      username: 'larry',
      password: '123456'
    }).then((res: any) => {
      if (res.code === 200) {
        dispatch({
          type: 'SET_TOKEN',
          payload: res.token
        })
        dispatch({
          type: 'SET_USER',
          payload: res.user
        })
        router.replace("/article/list")
      }
    })
  }
  return (
    <LoginContent>
      <Button onClick={handlerLoginFn}>登录按钮</Button>
    </LoginContent>
  )
}

export default Login
const LoginContent = styled.div`
  width: 100vw;
  height: 100vh;
  background: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`