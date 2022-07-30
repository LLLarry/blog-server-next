import { createContext } from "react"
import { Action } from "../../../type"

import useFolderReducer, { FolderState } from "./reducer"


interface ProviderProp extends React.PropsWithChildren {}

const Provider: React.FC<ProviderProp> = ({ children }) => {
  const [state, dispatch] = useFolderReducer()
  return <FolderContext.Provider value={{
    ...state,
    dispatch
  }}>
    {children}
  </FolderContext.Provider>
}


interface ContextProp extends FolderState {
  dispatch: (a: Action) => void;
}
export const FolderContext = createContext<ContextProp>({
  dispatch: () => {},
  fileVisible: false,
  foldersVisible: false,
  foldersLayout: 'vertical', // 文件夹布局
  fileLayout: 'horizontal', // 文件布局
  folders: [], // 文件夹列表
  files: [], // 文件夹列表
  browseFolder: null // 正在浏览的文件
})

export default Provider