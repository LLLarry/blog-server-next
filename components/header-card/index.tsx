import { Card, Breadcrumb } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
interface BreadItem{
  title: string;
  href?: string;
  path?: string;
}
interface HeaderCardProp extends React.PropsWithChildren {
  breadList: BreadItem[]
}
const HeaderCard: React.FC<HeaderCardProp> = ({ breadList, children }) => {
  console.log(breadList)
  return (
    <Card bordered={false}>
      <Breadcrumb>
        {
          breadList.map(bread => (
            <Breadcrumb.Item key={bread.title}>
              {
                bread.href ? <a href={bread.href} >{bread.title}</a> : 
                bread.path ? <Link href={bread.path}>{bread.title}</Link> :
                <>{ bread.title }</>
              }
            </Breadcrumb.Item>
          ))
        }
        
      </Breadcrumb>
      <HeaderTitleContent>
        <HeaderTitle>{breadList[breadList.length - 1]?.title || ''}</HeaderTitle>
        {children}
      </HeaderTitleContent>
    </Card>
  )
}

export default HeaderCard

const HeaderTitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderTitle = styled.h1`
  font-size: 20px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0;
`