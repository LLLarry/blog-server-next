import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Image } from 'antd'
import { Layout } from '@/type'
import { FolderContext } from '../../store/Provider'
import File from '../file'
interface FileProp{
  layout?: Layout;
}
const Files: React.FC<FileProp> = ({ layout = 'horizontal' }) => {
  const { files, dispatch } =useContext(FolderContext)
  return (
    <>
      <Ul className={`files-${layout}`}>
        {
          files.map(file => <File layout={layout} key={file.sha} file={file}></File>)
        }
      </Ul>
    </>
   
  )
}

export default Files

const Ul = styled.ul`
  padding: 0;
  &.files-horizontal {
    display: flex;
    flex-wrap: wrap;
  }
`