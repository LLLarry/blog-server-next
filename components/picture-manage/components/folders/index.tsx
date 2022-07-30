import React, { useCallback, useContext } from "react"
import styled from "styled-components"
import Folder from "../folder"
import { Drawer } from 'antd'
import { FolderContext } from "@@/picture-manage/store/Provider"
import { CHANGE_FILE_LAYOUT, CHANGE_FILE_VISIBLE } from '@@/picture-manage/store/constants'
import Files from "../files"
import DrawerTitle from "../drawer-title"
import { Layout } from "@/type"

interface FoldersProp{
  layout?: Layout;
}
const Folders: React.FC<FoldersProp> = ({ layout = 'horizontal' }) => {
  const { fileVisible, fileLayout, browseFolder, folders, dispatch } =useContext(FolderContext)
  // 修改布局
  const changeFileLayout = useCallback((layout: Layout) => {
    dispatch({
      type: CHANGE_FILE_LAYOUT,
      payload: layout
    })
  }, [dispatch])
  return (
    <>
      <Ul className={`folders-${layout}`}>
        {
          folders.map(folder => <Folder layout={layout} key={folder.sha} folder={folder}></Folder>)
        }
      </Ul>
      <Drawer
          title={<DrawerTitle title={browseFolder?.path} onChange={changeFileLayout} layout={fileLayout} upload />}
          closable={false}
          onClose={() => dispatch({ type: CHANGE_FILE_VISIBLE, payload: false })}
          visible={fileVisible}
          className="files-box"
        >
          <Files layout={fileLayout} />
        </Drawer>
    </>
  )
}

export default Folders

const Ul = styled.ul`
  padding: 0;
  &.folders-horizontal {
    display: flex;
    flex-wrap: wrap;
  }
`