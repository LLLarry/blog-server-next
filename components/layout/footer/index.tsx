import styled from "styled-components"

function Footer () {
  return <AppFooter>
    <div>
      小恐龙博客后台<Line>|</Line>@nextjs
    </div>
  </AppFooter>
}
export default Footer

const AppFooter = styled.footer`
  height: 60px;
  margin-top: auto;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`
const Line = styled.span`
  margin: 0 7px;
`