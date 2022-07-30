import styled from "styled-components"
import { Avatar, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { userSelector } from "@/store";

function Navbar () {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  // 退出登录
  const handleLogout = useCallback(() => {
    dispatch({
      type: 'RESET'
    })
  }, [dispatch])
  return <AppNavBar>
    <Dropdown overlay={menu(handleLogout)}>
      <AppNavBarItemRight>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <UserName>
          { user?.username }
        </UserName>
      </AppNavBarItemRight>
    </Dropdown>
  </AppNavBar>
}
export default Navbar

const AppNavBar = styled.div`
  background-color: #fff;
  height: 60px;
  box-shadow: 0 2px 2px rgba(0,0,0,.1);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`
const AppNavBarItemRight = styled.div`
  float: right;
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const UserName = styled.span`
margin-left: 8px;
`
const menu = (handleLogout: () => void) => (
  <Menu
    items={[
      {
        key: '1',
        label: '找回密码',
      },
      {
        key: '2',
        danger: true,
        label: '退出登录',
        onClick: handleLogout
      },
    ]}
  />
);