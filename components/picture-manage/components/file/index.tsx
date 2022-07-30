import React, { useContext } from 'react'
import { Dropdown, Image, Menu, message } from 'antd'
import styled from 'styled-components'
import { confirm } from '../../../../utils/antd-util'
import { BaseReturnType, File as FileType } from '@/type'
import { useMutation } from 'react-query'
import { deleteFile } from '@/request/file'
import { useDispatch } from 'react-redux'
import { CHANGE_FILES_BOX } from '../../store/constants'
import { FolderContext } from '../../store/Provider'
import { copyText } from '@/utils/util'
interface FileProp{
  layout?: 'horizontal' | 'vertical';
  file: FileType;
}

const File: React.FC<FileProp> = ({ layout = 'horizontal', file }) => {
  const { files, browseFolder ,dispatch } = useContext(FolderContext)
  const { mutate: deleteFileMutate } = useMutation<BaseReturnType, Error, { path: string }>(deleteFile, {
    onSuccess (data) {
      message.success('删除成功')
      dispatch({
        type: CHANGE_FILES_BOX,
        payload: files.filter(item => item.path !== file.path)
      })
    }
  })
  
  const handleDelete = async (file: FileType) => {
    await confirm('确认删除当前文件吗？')
    deleteFileMutate({ path: `${browseFolder?.path}/${file.path}` })
  }

  const menu = (file: FileType) => (
    <Menu items={
      [
        {
          key: '1',
          label: '复制路径',
          onClick: () => copyText(file?.fullPath || '')
        },
        {
          key: '2',
          danger: true,
          label: '删除图片',
          onClick: () => handleDelete(file)
        },
      ]
    } />
  )

  return (<Li className={`file-${layout}`}>
    <Image
      className="file-image __LAZY_CLASS_NAME__"
      alt={file.path}
      loading="lazy"
      src={file.fullPath}
    />
    <Dropdown overlay={menu(file)}>
      <Title className="file-title">{file.path}</Title>
    </Dropdown>
  </Li>)
}

export default File

const Li = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 5px 15px;
  cursor: pointer;
  transition: all .4s ease-in-out;
  &:nth-child(odd) {
    background-color: rgba(0,0,0, .03);
  }
  &:hover {
    background-color: #F4FBFF;
    .file-title {
      color:#008dff;
    }
  }
  .ant-image {
    margin-right: 8px;
    width: 27px;
    aspect-ratio: 1/1;
  }
  &.file-horizontal {
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    width: 45%;
    margin-bottom: 20px;
    border-radius: 4px;
    &:nth-child(odd) {
      background-color: initial;
    }
    &:nth-child(2n-1) {
      margin-right: 10%;
    }
    &:hover {
      background-color: #F4FBFF;
      .file-title {
        color:#008dff;
      }
    }
    .ant-image {
      width: 80%;
      margin-right: 0;
    }
    .file-title {
      line-height: 2em;
    }
  }
`

const Title = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  max-width: 100%;
  
`