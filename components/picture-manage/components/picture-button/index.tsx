import { Button, Drawer } from "antd"
import React, { useCallback, useContext } from "react"
import { useMutation } from "react-query"
import { AnyIfEmpty } from "react-redux"
import { getFolders } from "../../../../request/file"
import { BaseReturnType, Layout, Folder } from "../../../../type"
import useGetFolders from "../../hooks/useGetFolders"
import { CHANGE_FOLDERS_VISIBLE, CHANGE_FOLDERS_LAYOUT, CHANGE_FOLDERS_BOX } from "../../store/constants"
import { FolderContext } from "../../store/Provider"
import DrawerTitle from "../drawer-title"
import Folders from "../folders"

type ReturnType = BaseReturnType & { list: Folder[] }

const PictureManage = () => {

  const { foldersVisible, foldersLayout, dispatch } =useContext(FolderContext)
  const { mutate, isLoading } = useGetFolders()
  
  // 修改布局
  const changeFolderLayout = useCallback((layout: Layout) => {
    dispatch({
      type: CHANGE_FOLDERS_LAYOUT,
      payload: layout
    })
  }, [dispatch])
  const handleLoadFolders = async () => {
    mutate()
  }
  return <>
      <Button type="primary" onClick={handleLoadFolders} loading={isLoading}>图片管理</Button>
      <Drawer
        title={<DrawerTitle title="图片管理" onChange={changeFolderLayout} layout={foldersLayout} createFolder />}
        placement="right"
        closable={false}
        onClose={() => dispatch({ type: CHANGE_FOLDERS_VISIBLE, payload: false })}
        visible={foldersVisible}
        key={'Folders'}
      >
      <Folders layout={foldersLayout} />
    </Drawer>
  </>
}

export default PictureManage