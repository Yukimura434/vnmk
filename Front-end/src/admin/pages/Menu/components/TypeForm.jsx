// src/admin/pages/Menu/components/TypeForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const TypeForm = ({ initialValues, onSubmit }) => {
  return (
    <Form
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Tên Type"
        rules={[{ required: true, message: 'Vui lòng nhập tên type!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? "Sửa" : "Thêm"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TypeForm;
