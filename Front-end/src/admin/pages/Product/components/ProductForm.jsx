
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import UploadImage from './UploadImage';

const { Option } = Select;

const ProductForm = ({ product, onClose, accessToken }) => {
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = React.useState([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
      setImageUrls(product.images || []);
    } else {
      form.resetFields();
    }
  }, [product]);

  const handleUploadSuccess = (urls) => {
    setImageUrls(urls);
  };

  const onFinish = async (values) => {
    try {
      const productData = {
        ...values,
        images: imageUrls,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (product) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, productData, config);
      } else {
        await axios.post('http://localhost:5000/api/products', productData, config);
      }
      onClose();
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item name='images' label='Ảnh sản phẩm'>
        <UploadImage onUploadSuccess={handleUploadSuccess} product={product} accessToken={accessToken} />
      </Form.Item>
      <Form.Item name='name' label='Tên sản phẩm' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='description' label='Giới thiệu ngắn gọn sản phẩm' rules={[{ required: true }]}>
        <Input.TextArea style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='descriptionFull' label='Giới thiệu đầy đủ sản phẩm' rules={[{ required: true }]}>
        <Input.TextArea style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='originalPrice' label='Giá gốc' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='salePrice' label='Giá sau khi được giảm' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='keyCount' label='Size phím' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='modes' label='Modes kết nối' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='color' label='Màu sắc' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='movementType' label='Loại phím (cơ/giả cơ)' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='batteryCapacity' label='Dung lượng pin' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='switchType' label='Loại switch' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='caseMatetial' label='Chất liệu case' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='multiLayout' label='Đa layout(có/không)' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='typeId' label='Loại sản phẩm' rules={[{ required: true }]}>
        <Select style={{ width: '100%' }}>
          <Option value='6749e68c24417ea8e0551c3e'>Full phím</Option>
          <Option value='6749e69724417ea8e0551c44'>Kit phím</Option>
          <Option value='6749e72424417ea8e0551c50'>Stabilizer</Option>
          <Option value='6749e6c424417ea8e0551c48'>Switchs</Option>
          <Option value='6749e6cd24417ea8e0551c4c'>Keycaps</Option>
          <Option value='6749e78524417ea8e0551c58'>Phụ kiện</Option>
          <Option value='6749e77f24417ea8e0551c54'>Numpad</Option>

          <Option value='6749f1cb24417ea8e0551d0c'>Pre - Full phím</Option>
          <Option value='6749f1d824417ea8e0551d10'>Pre - Kit phím</Option>
          <Option value='6749f1ed24417ea8e0551d14'>Pre - Stabilizer</Option>
          <Option value='6749f1fc24417ea8e0551d18'>Pre - Switchs</Option>
          <Option value='6749f20724417ea8e0551d1c'>Pre - Keycaps</Option>
          <Option value='6749f21124417ea8e0551d20'>Pre - Phụ kiện</Option>
          <Option value='6749f21a24417ea8e0551d24'>Pre - Numpad</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
