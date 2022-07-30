import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd'
import React from 'react';
export const confirm = (content: Parameters<typeof Modal.confirm>[0]['content']) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content,
      cancelText: '取消',
      okText: '确认',
      onOk() {
        resolve(true);
      },
      onCancel() {
        reject(false);
      },
    });
  })
}