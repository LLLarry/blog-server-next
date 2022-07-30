import { createFolder } from "@/request/file"
import { FolderAddOutlined } from "@ant-design/icons"
import { Input, message, Modal } from "antd"
import React, { useContext, useState } from "react"
import { useMutation } from "react-query"
import useGetFolders from "../../hooks/useGetFolders"
import { FolderContext } from "../../store/Provider"

const CreateFolder = () => {
  const [visible, setVisible] = useState(false)
  const [folderName, setFolderName] = useState('')
  const { dispatch } = useContext(FolderContext)
  const { mutateAsync, isLoading } = useMutation<any, Error, {folderName: string}>(createFolder)
  const { mutateAsync: getFoldersAsync, isLoading: getFoldersIsLoading } = useGetFolders()
  const handleClose = () => {
    setVisible(false)
    setFolderName('')
  }
  const handleSubmit = async () => {
    const data = await mutateAsync({ folderName })
    message.success(`${folderName} 文件夹添加成功`)
    // 更新完成之后获取最新的文件夹列表
    await getFoldersAsync()
    handleClose()
  }
  return (
    <>
      <FolderAddOutlined style={{ color: '#eb2f96' }} onClick={() => setVisible(true)} />
      <Modal
        visible={visible}
        title="请输入文件夹名称"
        width="450px"
        okText="确定"
        cancelText="取消"
        confirmLoading={isLoading || getFoldersIsLoading}
        onOk={handleSubmit}
        onCancel={handleClose}
      >
        <Input placeholder="请输入文件夹名称" value={folderName} onChange={e => setFolderName(e.target.value.trim())} />
      </Modal>
    </>
  )
}

export default CreateFolder