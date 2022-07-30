import { useReducer } from "react";
import { Action, Layout, Folder, File } from "../../../type";
import { CHANGE_BROWSEFOLDER, CHANGE_FILES_BOX, CHANGE_FILE_LAYOUT, CHANGE_FILE_VISIBLE, CHANGE_FOLDERS_BOX, CHANGE_FOLDERS_LAYOUT, CHANGE_FOLDERS_VISIBLE } from "./constants";
export interface FolderState {
  foldersVisible: boolean; // 文件夾抽屜是否展示
  fileVisible: boolean; // 图片抽屉是否展示
  foldersLayout: Layout; // 文件夹布局
  fileLayout: Layout; // 文件布局
  folders: Folder[]; // 文件夹列表
  files: File[]; // 文件夹列表
  browseFolder: Folder | null; // 正在浏览的文件
}

const initState: FolderState = {
  foldersVisible: false,
  fileVisible: false,
  foldersLayout: 'vertical',
  fileLayout: 'horizontal',
  folders: [],
  files: [],
  browseFolder: null
}
const reducer = (prevState: FolderState, action: Action) => {
  switch (action.type) {
    // 修改文件夹演示和隐藏
    case CHANGE_FOLDERS_VISIBLE :
      return { ...prevState, foldersVisible: action.payload }
    // 修改文件显示和隐藏
    case CHANGE_FILE_VISIBLE :
      return { ...prevState, fileVisible: action.payload }
    // 修改文件夹布局
    case CHANGE_FOLDERS_LAYOUT :
      return { ...prevState, foldersLayout: action.payload }  
    // 修改文件布局
    case CHANGE_FILE_LAYOUT :
      return { ...prevState, fileLayout: action.payload }  
    // 修改文件夹list
    case CHANGE_FOLDERS_BOX :
        return { ...prevState, folders: action.payload }
    // 修改文件list
    case CHANGE_FILES_BOX :
      return { ...prevState, files: action.payload }
    // 修改正在浏览的文件夹
    case CHANGE_BROWSEFOLDER :
      return { ...prevState, browseFolder: action.payload }
      
    default: return prevState
  }
}
const useFolderReducer = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  return [state, dispatch] as const
}

export default useFolderReducer

