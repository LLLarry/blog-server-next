import { getFiles } from "@/request/file"
import { BaseReturnType, Folder } from "@/type"
import { useContext } from "react"
import { useMutation } from "react-query"
import { CHANGE_FILES_BOX, CHANGE_FILE_VISIBLE } from "../store/constants"
import { FolderContext } from "../store/Provider"
type ReturnType = BaseReturnType & { list: File[] }
const useGetFiles = () => {
  const { dispatch } =useContext(FolderContext)
  return useMutation<ReturnType, Error, Pick<Folder, 'sha' | 'path'>>(getFiles, {
    onSuccess (data) {
      dispatch({
        type: CHANGE_FILES_BOX,
        payload: data.list
      })
      dispatch({
        type: CHANGE_FILE_VISIBLE,
        payload: true
      })
    }
  })
}
export default useGetFiles