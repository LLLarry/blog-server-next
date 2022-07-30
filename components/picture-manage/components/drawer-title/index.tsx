import { AppstoreOutlined, CloudUploadOutlined, FolderAddOutlined, MenuOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import React from "react"
import styled from "styled-components"
import { Layout } from "../../../../type"
import CreateFolder from "../create-folder"
import UploadImage from "../upload"
interface DrawerTitleProp{
  title?: React.ReactNode;
  layout?: Layout;
  onChange?: (layout: Layout) => void;
  upload?: boolean;
  createFolder?: boolean;
}
const DrawerTitle: React.FC<DrawerTitleProp> = ({ title, layout, onChange, upload = false, createFolder= false }) => {
  const handleToggleLayout = () => {
    const v = layout === 'horizontal' ? 'vertical' : 'horizontal'
    onChange && onChange(v)
  }
  return <DrawerTitleContent>
    <DrawerTitleH3>
      {title}
    </DrawerTitleH3>
    
    <Icons>

      {
        createFolder && (
          <Tooltip placement="top" title="新建文件夹">
            <IconBox>
              <CreateFolder />
            </IconBox>
          </Tooltip>
        )
      }

      {/* 上传图片 */}
      {
        upload && (
          <Tooltip placement="top" title="上传图片">
            <IconBox>
              <UploadImage>
                <CloudUploadOutlined style={{ color: '#eb2f96' }} />
              </UploadImage>
            </IconBox>
          </Tooltip>
        )
      }

      {/* 切换布局 */}
      <Tooltip placement="left" title={layout === 'horizontal' ? '垂直布局' : '水平布局'}>
        <IconBox onClick={handleToggleLayout}>
          {
            layout === 'horizontal' ? <MenuOutlined /> : layout === 'vertical' ? <AppstoreOutlined /> : null
          }
        </IconBox>
      </Tooltip>
    </Icons>
    
  </DrawerTitleContent>
}

const DrawerTitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DrawerTitleH3 = styled.h3`
  flex: 1;
  margin: 0;
  color: rgba(0,0,0,.85);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`

const IconBox = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 18px;
  margin-left: 10px;
`
const Icons = styled.div`
  display: flex;
  align-items: center;
`

export default DrawerTitle