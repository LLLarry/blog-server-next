import { ColumnHeightOutlined } from "@ant-design/icons"
import { Dropdown, Menu, Popover, Tooltip } from "antd"
import React from "react"
interface SelectDensityProp {
  selectedKey: 'large' | 'middle' | 'small';
  setSelectKey: (v: SelectDensityProp['selectedKey']) => void;
}
const SelectDensity: React.FC<SelectDensityProp> = ({ selectedKey, setSelectKey }) => {
  const items =  [
    {
      label: '默认',
      key: 'middle',
    },
    {
      label: '紧凑',
      key: 'small',
    },
    {
      label: '稀疏',
      key: 'large',
    },
  ]
  return (
    <Dropdown overlay={<Menu selectable items={items} selectedKeys={[selectedKey]} onClick={({ key }) => setSelectKey(key as SelectDensityProp['selectedKey'])} />} trigger={['click']}>
      <Tooltip placement="top" title="密度">
        <ColumnHeightOutlined style={{fontSize: '20px', marginRight: '15px'}} />
      </Tooltip>
    </Dropdown>
  )
}

export default SelectDensity