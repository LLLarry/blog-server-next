import { Button, Form, Input, Select, Switch, Tag } from "antd"
import React, { useCallback, useEffect, useMemo } from "react"
import styled from "styled-components"
import { Article, Tag as TagType, TagColor } from '@/type'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
interface EditorFormProps {
  initialValues?: Article,
  tags: TagType[];
  reciveData: (v: any) => void;
  isLoading: boolean;
}
const EditorForm: React.FC<EditorFormProps> = ({ initialValues = {}, tags, reciveData, isLoading }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    const { title = '', desc = '', comment: c = 1, tags = []  } = initialValues
    const tag = tags.map(one => one.id)
    
    // 設置初始化值
    form.setFieldsValue({
      title,
      desc,
      comment: c === 1,
      tag
    })
  }, [initialValues, form])

  const selectOptions = useMemo(() => {
    return tags.reduce((acc, item) => {
      const one = {
        label: item.name,
        value: item.id
      }
      acc.push(one)
      return acc
    }, [] as { value: number, label: string }[])
  }, [tags])

  const onFinish = useCallback(() => {
    const value = form.getFieldsValue()
    reciveData({
      ...value,
      comment: value.comment ? 1 : 2,
      tag: tags.filter(one => value.tag.includes(one.id)),
    })
  }, [form, reciveData, tags])

  useEffect(() => {
    const handle = (e: any) => {
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        e.stopPropagation();
        onFinish()
      }
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [onFinish])

  

  return (
    <Form form={form} onFinish={onFinish}>
      <Title>文章标题</Title>
      <Form.Item name="title">
        <Input placeholder="请输入文章标题" />
      </Form.Item>

      <Title>文章描述</Title>
      <Form.Item name="desc">
        <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} placeholder="请输入文章描述" />
      </Form.Item>

      <Title>文章类型</Title>
      <Form.Item name="tag">
        <Select
          mode="multiple"
          placeholder="请选择文文章类型"
          showArrow
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={selectOptions}
        />
      </Form.Item>

      <Title>是否开启评论</Title>
      <Form.Item name="comment" valuePropName="checked">
        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" loading={isLoading}>立即保存</Button>
      </Form.Item>
    </Form>
  )
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={TagColor[value]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const Title = styled.div`
  text-align: center;
  color: #999;
  padding: 9px 15px;
  line-height: 20px;
  font-size: 14px;
`

export default EditorForm