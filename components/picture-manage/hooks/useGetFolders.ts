import { getFolders } from "@/request/file"
import { BaseReturnType, Folder } from "@/type"
import { useContext } from "react"
import { useMutation } from "react-query"
import { CHANGE_FOLDERS_BOX, CHANGE_FOLDERS_VISIBLE } from "../store/constants"
import { FolderContext } from "../store/Provider"
type ReturnType = BaseReturnType & { list: Folder[] }
const useGetFolders = () => {
  const {  dispatch } =useContext(FolderContext)
  const { isLoading, mutate, mutateAsync } =  useMutation<ReturnType>(getFolders, {
    onSuccess (data) {
      dispatch({
        type: CHANGE_FOLDERS_BOX,
        payload: data.list
      })
      dispatch({ type: CHANGE_FOLDERS_VISIBLE, payload: true })
    }
  })
  return {
    isLoading, mutate, mutateAsync
  }
}

export default useGetFolders