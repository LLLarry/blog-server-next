import { breadcrumbSelector } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import HeaderCard from '../header-card'
import PictureManage from '../picture-manage'
import Footer from './footer'
import Navbar from './navbar'
import Slidebar from './slidebar'
interface LayoutProps extends React.PropsWithChildren {

}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const breadcrumb = useSelector(breadcrumbSelector)
  return <AppLayout>
   
    {/* 侧边菜单部分 */}
    <Slidebar />
    <AppSection>
       {/* 顶部导航部分 */}
      <Navbar />
      <AppContent>
        <HeaderCard breadList={breadcrumb} >
          <PictureManage />  
        </HeaderCard>
        {/* 内容核心区域 */}
        <main className="app-main" style={{ flex: 1 }}>{ children }</main>
        {/* 底部部分 */}
        <Footer />
      </AppContent>
    </AppSection>
  </AppLayout>
}
export default Layout

const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  min-height: 768px;
  display: flex;
  /* flex-direction: column; */
`

const AppSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`