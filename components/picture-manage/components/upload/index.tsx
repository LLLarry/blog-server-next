import { tokenSelector, wrapper } from "@/store"
import { File, Folder } from "@/type"
import { copyText } from "@/utils/util"
import { InboxOutlined } from "@ant-design/icons"
import { message, Modal, Image, Tooltip } from "antd"
import Dragger, { DraggerProps } from "antd/lib/upload/Dragger"
import React, { useContext, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import useGetFiles from "../../hooks/useGetFiles"
import { FolderContext } from "../../store/Provider"
interface UploadImageProp extends React.PropsWithChildren{}

const UploadImage: React.FC<UploadImageProp> = ({ children }) => {
  // 上传组件是否显示
  const [isModalVisible, setIsModalVisible] = useState(false)
  const token = useSelector(tokenSelector)
  // 已经上传成功的图片数组
  const [updateds, setUpdates] = useState<File[]>([])
  const { browseFolder } = useContext(FolderContext)
  const { mutate } = useGetFiles()
  
  const handleOk = () => {
    setIsModalVisible(false)
    setUpdates([])
    if (browseFolder) {
      // 重新请求获取最新的files数据
      mutate({ sha: browseFolder.sha, path: browseFolder.path })
    }
  }
  const onChange: DraggerProps['onChange'] = (info ) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log('info.file', info.file);
      // console.log('info.fileList', info.fileList)
    }
    if (status === 'done') {
      const res = info.file.response
      if (res.code === 200) {
        message.success(`${info.file.name} 文件上传成功`);
        setUpdates(prevState => ([...prevState, ...res.resultList]))
      } else {
        message.error(res.message);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  const onDrop: DraggerProps['onDrop'] = (e) => {
    // console.log('Dropped files', e.dataTransfer.files);
  }
  return (
    <>
      <div onClick={() => setIsModalVisible(true)}>
        {children}
      </div>
      <Modal title="上传图片" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
        <Dragger
          multiple
          name="files"
          accept=".jgp,.png,.gif,.jpeg,.bmp,.raw"
          headers={
            {
              Authorization: `Bearer ${token}`
            }
          }
          data={{
            path: browseFolder?.path
          }}
          action={`${process.env.BASE_URL}/mvvmadmin/store/uploadFile`}
          onChange={onChange}
          onDrop={onDrop}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽上传</p>
        </Dragger>
        {/* 已上传的文件 */}
        <Images files={updateds} />
      </Modal>
    </>
  )
}

export default wrapper.withRedux(UploadImage)

const Images = ({ files }: { files: File[] }) => {
  return (
    <Image.PreviewGroup>
      <ImageBox>
        {
          files.map(file => (
            <ImageItem key={file.sha}>
              <Image alt={file.sha} width="80%" src={file.download_url} className="image-com" />
              <Tooltip placement="bottom" title="点击复制">
                <ImageItemTitle className="image-text" onClick={() => copyText(file.download_url || '')}>{ file.sha }</ImageItemTitle>
              </Tooltip>
            </ImageItem>
          ))
        }
      </ImageBox>
    </Image.PreviewGroup>
  )
}

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
const ImageItem = styled.div`
  width: 25%;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 5px;
  &:hover {
    .image-text {
      color: #008dff;
    }
  }
  .image-com {
    aspect-ratio: 1/1;
  }
`
const ImageItemTitle = styled.div`
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  line-height: 1.8;
  transition: all .5s ease-in-out;
  cursor: pointer;
  user-select: none;
`