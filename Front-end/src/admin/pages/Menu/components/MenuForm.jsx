// src/admin/pages/Menu/components/MenuForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const MenuForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // Chuyển đổi order thành số
    const formattedValues = {
      ...values,
      order: Number(values.order),
    };
    onSubmit(formattedValues);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Tên Menu"
        rules={[{ required: true, message: 'Vui lòng nhập tên menu!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="order"
        label="Thứ tự"
        rules={[{ required: true, message: 'Vui lòng nhập thứ tự!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Cập Nhật' : 'Thêm'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MenuForm;
