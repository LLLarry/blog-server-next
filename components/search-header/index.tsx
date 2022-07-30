import styled from "styled-components"
import { Card, Form, Input, Button, Select } from 'antd'
import { cleanObject } from "../../utils/util";
import router from 'next/router'
import { useEffect } from "react";
type FormItem = React.ComponentProps<typeof Form.Item>
// input
interface InputItem{
  key: 'input',
  formItem: FormItem;
  input: React.ComponentProps<typeof Input>
}
// select
interface SelectItem {
  key: 'select',
  formItem: FormItem;
  select: React.ComponentProps<typeof Select>
}
// DatePicker 

interface ButtonItem {
  key: 'button'
  formItem: FormItem;
  button: React.ComponentProps<typeof Button>
}

interface SearchHeaderProp extends React.ComponentProps<typeof Card>{
  list: (InputItem | SelectItem | ButtonItem)[];
}
const SearchHeader: React.FC<SearchHeaderProp> = ({ list = [], ...config }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(router.query)
  }, [form])
  const onFinish = () => {
    const query = cleanObject(form.getFieldsValue())
    router.push({ pathname: router.route, query })
  }
  return <div>
    <Card {...config}>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{marginBottom: '-15px'}}>
        {
          list.map((item, index) => (
            <Form.Item
              key={index}
              style={{ marginBottom: '15px' }}
              {...item.formItem}
            >
              {
                item.key === 'input' ? <Input {...item.input} /> :
                item.key === 'select' ? <Select {...item.select} /> :
                item.key === 'button' ? <Button {...item.button} /> : <></>
              }
            </Form.Item>
          ))
        }
      </Form>
    </Card>
  </div>
}
export default SearchHeader