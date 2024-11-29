// src/admin/pages/Menu/components/TypeList.js
import React, { useState } from 'react';
import { List, Button, Modal } from 'antd';
import TypeForm from './TypeForm';
import axios from 'axios';

const TypeList = ({ types, categoryId }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);

  const handleAddType = () => {
    setSelectedType(null);
    setIsTypeModalVisible(true);
  };

  const handleEditType = (type) => {
    setSelectedType(type);
    setIsTypeModalVisible(true);
  };

  const handleDeleteType = async (typeId) => {
    await axios.delete(`http://localhost:5000/api/types/${typeId}`);
    // Fetch types again or update the state to reflect the deletion
  };

  const handleTypeSubmit = async (values) => {
    const newType = { ...values, categoryId };
    if (selectedType) {
      await axios.put(`http://localhost:5000/api/types/${selectedType._id}`, values);
    } else {
      await axios.post('http://localhost:5000/api/types', newType);
    }
    setIsTypeModalVisible(false);
    // Fetch types again or update the state to reflect the changes
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddType}>Thêm Type</Button>
      <List
        itemLayout="horizontal"
        dataSource={types}
        renderItem={type => (
          <List.Item
            actions={[
              <Button onClick={() => handleEditType(type)}>Sửa</Button>,
              <Button onClick={() => handleDeleteType(type._id)}>Xóa</Button>
            ]}
          >
            <List.Item.Meta
              title={type.name}
              description={<img src={type.image} alt={type.name} style={{ width: 50 }} />}
            />
          </List.Item>
        )}
      />
      <Modal
        title={selectedType ? "Sửa Type" : "Thêm Type"}
        visible={isTypeModalVisible}
        onCancel={() => setIsTypeModalVisible(false)}
        footer={null}
      >
        <TypeForm
          initialValues={selectedType}
          onSubmit={handleTypeSubmit}
        />
      </Modal>
    </div>
  );
};

export default TypeList;
