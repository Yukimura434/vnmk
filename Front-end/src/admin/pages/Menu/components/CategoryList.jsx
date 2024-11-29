// src/admin/pages/Menu/components/CategoryList.js
import React, { useState } from 'react';
import { List, Button, Modal } from 'antd';
import TypeList from './TypeList';
import CategoryForm from './CategoryForm';
import axios from 'axios';

const CategoryList = ({ categories, menuId }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsCategoryModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalVisible(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
    // Fetch categories again or update the state to reflect the deletion
  };

  const handleCategorySubmit = async (values) => {
    const newCategory = { ...values, menuId };
    if (selectedCategory) {
      await axios.put(`http://localhost:5000/api/categories/${selectedCategory._id}`, values);
    } else {
      await axios.post('http://localhost:5000/api/categories', newCategory);
    }
    setIsCategoryModalVisible(false);
    // Fetch categories again or update the state to reflect the changes
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory?._id === category._id ? null : category);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddCategory}>Thêm Category</Button>
      <List
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={category => (
          <List.Item
            actions={[
              <Button onClick={() => handleEditCategory(category)}>Sửa</Button>,
              <Button onClick={() => handleDeleteCategory(category._id)}>Xóa</Button>
            ]}
            onClick={() => handleCategoryClick(category)}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              title={category.name}
              description={selectedCategory?._id === category._id && (
                <TypeList types={category.types} categoryId={category._id} />
              )}
            />
          </List.Item>
        )}
      />
      <Modal
        title={selectedCategory ? "Sửa Category" : "Thêm Category"}
        visible={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={null}
      >
        <CategoryForm
          initialValues={selectedCategory}
          onSubmit={handleCategorySubmit}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;
