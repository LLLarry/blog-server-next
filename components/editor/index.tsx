import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"
import styled from "styled-components"
declare global {
  interface Window {
    $: any;
    jQuery: any;
    editormd: any;
  }
}

interface EditorProp {
  initialValue?: string;
}
const Editor: React.FC<EditorProp> = ({ initialValue = '' }, ref) => {
  const [$, setJQuery] = useState<any>(null)
  const [editor, setEditor] = useState<any>(null)
  const textarea = useRef<null | HTMLTextAreaElement>(null)
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.jQuery && window.editormd) {
        setJQuery(() => window.jQuery)
        setEditor(() => window.editormd)
        clearInterval(timer)
      }
    }, 10)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if ($ && editor) {
      const editorMd = editor("editorbox", {
          width  : "100%",
          height : ($('#editorbox').parent().height()) +'px',
          // autoHeight: true,
          path : "http://121.5.230.70/library/editormd/lib/",
          onload () {
            $('.fa-eye-slash').click().click()
          }
      });
      // console.log(editorMd, editorMd.toolbarHandlers.preview(),editorMd.toolbarHandlers.preview())
      
    }
  }, [$, editor])

  useImperativeHandle(ref, () => ({
    getContent () {
      return textarea.current?.value
    }
  }))
  
  return (
    <Editormd id="editorbox">
        <textarea ref={textarea} name="markdown-area" placeholder="请输入内容" style={{display: 'none'}} defaultValue={initialValue} />
    </Editormd>
  )
}

const Editormd = styled.div`
  margin-bottom: 0 !important;
  &.editormd-fullscreen {
    z-index: 2;
  }
`

// @ts-ignore
export default forwardRef<any, EditorProp>(Editor)