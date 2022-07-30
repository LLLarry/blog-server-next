import { SettingOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import { Button, Checkbox, List, Popover, Tooltip } from "antd"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { ColumnsTypeWithProp, ColumnTypeWithProp, initColumns } from "../../pages/article/list"
import { Article } from "../../type"
import { deepCopy } from "../../utils/util"
interface SelectColumnProp {
  data: ColumnsTypeWithProp<Article>[];
  setColumns: (v: ColumnsTypeWithProp<Article>) => void;
}
function SelectColumn <T>({ data, setColumns }: SelectColumnProp){
  const [allChecked, setAllChecked] = useState(false)

  // 监听data数据修改全选按钮
  useEffect(() => {
    const arr = data.flat(Infinity) as ColumnsTypeWithProp<Article>
    const flag = !arr.every(one => one.checked === false)
    setAllChecked(flag)
  }, [data])
  // 是否展示当前列
  const handleChange = (title: string, checked: boolean) => {
    const arr = data.flat(Infinity) as ColumnsTypeWithProp<Article>
    const index = arr.findIndex(one => one.title === title)
    if (index <= -1) return
    arr.splice(index, 1, { ...arr[index], checked })
    setColumns(arr)
  }

  const handleAllChange = (checked: boolean) => {
    const arr = data.flat(Infinity) as ColumnsTypeWithProp<Article>
    const list = arr.map(one => {
      return {
        ...one,
        checked
      }
    })
    setColumns(list)
  }
  const content = <div>
    {/* 固定在左侧 */}
    {
      data.map((one, index) => (
        <List size="small" style={{padding: 0, width: '200px'}} key={index}>
          <>
            {
              index === 0 && data[0].length > 0 ? (
                <List.Item style={{padding: '0 0 5px 0'}}>
                  <span style={{ color: '#999' }}>固定在左侧</span>
                </List.Item>
              ) : 
              index === 1 && data[1].length > 0 ? (
                <List.Item style={{padding: '0 0 5px 0'}}>
                  <span style={{ color: '#999' }}>不固定</span>
                </List.Item>
              ) :
              index === 2 && data[2].length > 0 ? (
                <List.Item style={{padding: '0 0 5px 0'}}>
                  <span style={{ color: '#999' }}>固定在右侧</span>
                </List.Item>
              ) : ''
            }
            
            {
              one.map((item: ColumnTypeWithProp<Article>) => (
                <ListItemCom key={item.title}>
                  <Checkbox checked={item.checked} onChange={({ target }) => handleChange(item.title, target.checked)}>
                    <>{item.title}</>
                  </Checkbox>
                  <PositionIcon index={index} data={data} row={item} setColumns={setColumns} />
                </ListItemCom>
              ))
            }
          </>
        </List>
      ))
    }
  </div>
  const Title = <TitleTop>
    <Checkbox checked={allChecked} onChange={({ target }) => handleAllChange(target.checked)}>
      列菜单
    </Checkbox>
    <Button type="link" style={{padding: 0}} onClick={() => setColumns(initColumns)}>重置</Button>
  </TitleTop>
  return (
    <Popover
      content={content}
      title={Title}
      trigger="click"
      placement="bottomLeft"
    >
      <SettingOutlined style={{ fontSize: '20px' }} />
    </Popover>
  )
}

export default SelectColumn

const TitleTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListItemCom = styled(List.Item)`
  padding: '3px 16px' !important;
  transition: all .3s;
  &:hover {
    background-color: #e6f7ff;
    .icon-box {
      visibility: visible;
    }
  }
`
const IconContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const IconBox = styled.div`
  visibility: hidden;
  padding: 0 2px;
`
const PositionIcon = (
  { index, row, data, setColumns }: { index: number, row: ColumnTypeWithProp<Article>, setColumns: SelectColumnProp['setColumns'], data: SelectColumnProp['data'] }
) => {
  const copyData = useMemo(() => deepCopy(data), [data])
  const handleSort = (position: string) => {
    copyData[index] = copyData[index].filter(one => one.title !== row.title)
    switch (position) {
      case 'top': 
        copyData[0].push({ ...row, fixed: 'left' })
        break
      case 'center': 
        delete row.fixed
        copyData[1].push({ ...row })
        break
      case 'bottom': 
        delete row.fixed
        copyData[2].push({ ...row, fixed: 'right' })
        break
    }
    setColumns(copyData.flat(Infinity) as ColumnsTypeWithProp<Article>)
  }
  return (
    <IconContent>
      {
        index === 0 ? <>
          <Tooltip placement="top" title="不固定">
            <IconBox className="icon-box" onClick={() => handleSort('center')}>
              <VerticalAlignMiddleOutlined style={{ padding: '2px', color: "#1890ff" }} />
            </IconBox>
          </Tooltip>
          
          <Tooltip placement="top" title="固定在底部">
            <IconBox className="icon-box" onClick={() => handleSort('bottom')}>
              <VerticalAlignBottomOutlined style={{ padding: '2px', color: "#1890ff" }} />
            </IconBox>
          </Tooltip>
        </> :
        index === 1 ? <>
          <Tooltip placement="top" title="固定在顶部">
            <IconBox className="icon-box" onClick={() => handleSort('top')}>
              <VerticalAlignTopOutlined style={{ padding: '2px', color: "#1890ff" }} />
            </IconBox>
          </Tooltip>
          <Tooltip placement="top" title="固定在底部">
            <IconBox className="icon-box" onClick={() => handleSort('bottom')}>
              <VerticalAlignBottomOutlined style={{ padding: '2px', color: "#1890ff" }} />
            </IconBox>
          </Tooltip>
        </> :
        index === 2 ? <>
          <Tooltip placement="top" title="不固定">
            <IconBox className="icon-box" onClick={() => handleSort('center')}>
              <VerticalAlignMiddleOutlined style={{ padding: '2px', color: "#1890ff" }} />
            </IconBox>
          </Tooltip>
          <Tooltip placement="top" title="固定在顶部">
            <IconBox className="icon-box" onClick={() => handleSort('top')}>
              <VerticalAlignTopOutlined style={{ padding: '2px', color: "#1890ff" }} />
            </IconBox>
          </Tooltip>
        </> : <></>
      }
    </IconContent>
  )
}