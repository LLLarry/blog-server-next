import React, { useContext } from 'react'
import styled from 'styled-components'
import { Folder as FolderType, Layout } from '@/type'
import SvgIcon from '../../../svg-icon'
import useGetFiles from '../../hooks/useGetFiles'
import { CHANGE_BROWSEFOLDER, CHANGE_FILES_BOX, CHANGE_FILE_VISIBLE } from '../../store/constants'
import { FolderContext } from '../../store/Provider'
interface FolderProp{
  layout?: Layout;
  folder: FolderType;
}
const Folder: React.FC<FolderProp> = ({ layout = 'horizontal', folder }) => {
  const { dispatch } =useContext(FolderContext)
  const { mutate } = useGetFiles()
  // const { mutate } = useMutation<ReturnType, Error, Pick<FolderType, 'sha' | 'path'>>(getFiles, {
  //   onSuccess (data) {
  //     dispatch({
  //       type: CHANGE_FILES_BOX,
  //       payload: data.list
  //     })
  //     dispatch({
  //       type: CHANGE_FILE_VISIBLE,
  //       payload: true
  //     })
  //   }
  // })
  const doubleClick = () => {
    dispatch({
      type: CHANGE_BROWSEFOLDER,
      payload: folder
    })
    mutate({ sha: folder.sha, path: folder.path })
  }
  return (
    <Li className={`folder-${layout}`} onDoubleClick={doubleClick}>
      <SvgIcon icon="folder" className="folder" />
      <Title>{folder.path}</Title>
    </Li>
  )
}

export default Folder

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
    color:#008dff;
  }
  .folder {
    margin-right: 8px;
    font-size: 2em;
    color: #efba32;
  }
  &.folder-horizontal {
    flex-direction: column;
    justify-content: space-between;
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
    .folder {
      font-size: 3em;
      margin-right: 0;
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