import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, List, Spin, message, Modal, Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';

const { Option } = Select;

const MenuManagement = () => {
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null); // To track editing menu state
    const [editingCategory, setEditingCategory] = useState(null); // To track editing category state
    const [editingType, setEditingType] = useState(null); // To track editing type state
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
    const [menuForm] = Form.useForm();
    const [categoryForm] = Form.useForm();
    const [typeForm] = Form.useForm();

    const accessToken = localStorage.getItem('access_token');

    // Fetch menus
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menus');
                setMenus(response.data);
            } catch (error) {
                message.error('Failed to fetch menus');
            }
        };
        fetchMenus();
    }, []);

    // Fetch categories based on selected menu
    useEffect(() => {
        if (selectedMenu) {
            const fetchCategories = async () => {
                setLoading(true);
                try {
                    const response = await axios.get('http://localhost:5000/api/categories');
                    const filteredCategories = response.data.filter(
                        (category) => category.menuId === selectedMenu,
                    );
                    setCategories(filteredCategories);
                    setLoading(false);
                } catch (error) {
                    message.error('Failed to fetch categories');
                    setLoading(false);
                }
            };
            fetchCategories();
        }
    }, [selectedMenu]);

    // Fetch types based on selected category
    useEffect(() => {
        if (selectedCategory) {
            const fetchTypes = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/types');
                    const filteredTypes = response.data.filter(
                        (type) => type.categoryId === selectedCategory,
                    );
                    setTypes(filteredTypes);
                } catch (error) {
                    message.error('Failed to fetch types');
                }
            };
            fetchTypes();
        }
    }, [selectedCategory]);

    // Handle form submission for add/edit menu
    const handleMenuFormSubmit = async (values) => {
        const payload = {
            ...values,
            order: Number(values.order)
        };
        try {
            if (editingMenu) {
                // Edit
                await axios.put(`http://localhost:5000/api/menus/${editingMenu._id}`, payload, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                message.success('Menu updated successfully');
            } else {
                // Add
                await axios.post('http://localhost:5000/api/menus', payload, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                message.success('Menu added successfully');
            }
            setIsMenuModalVisible(false);
            menuForm.resetFields();
            setEditingMenu(null);
            // Refresh menus list
            const response = await axios.get('http://localhost:5000/api/menus');
            setMenus(response.data);
        } catch (error) {
            message.error('Failed to save menu');
        }
    };

    // Handle form submission for add/edit category
    const handleCategoryFormSubmit = async (values) => {
        try {
            const payload = {
                ...values,
                menuId: selectedMenu ? selectedMenu.toString() : '', 
                order: values.order.toString(),
            };
    
            if (editingCategory) {
                // Edit
                await axios.put(`http://localhost:5000/api/categories/${editingCategory._id}`, payload, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                message.success('Category updated successfully');
            } else {
                // Add
                if (!payload.menuId) {
                    throw new Error('Menu ID is required');
                }
                await axios.post('http://localhost:5000/api/categories', payload, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                message.success('Category added successfully');
            }
    
            setIsCategoryModalVisible(false);
            categoryForm.resetFields();
            setEditingCategory(null);
            // Refresh categories list
            if (selectedMenu) {
                const response = await axios.get('http://localhost:5000/api/categories');
                const filteredCategories = response.data.filter(
                    (category) => category.menuId === selectedMenu,
                );
                setCategories(filteredCategories);
            }
        } catch (error) {
            message.error('Failed to save category');
            console.error(error);
        }
    };
    

    // Handle form submission for add/edit type
    const handleTypeFormSubmit = async (values) => {
        try {
            // Ensure categoryId is a non-empty string
            const payload = {
                ...values,
                categoryId: selectedCategory ? selectedCategory.toString() : '', // Convert to string and handle empty case
            };
    
            if (editingType) {
                // Edit
                await axios.put(`http://localhost:5000/api/types/${editingType._id}`, payload, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                message.success('Type updated successfully');
            } else {
                // Add
                if (!payload.categoryId) {
                    throw new Error('Category ID is required');
                }
                await axios.post('http://localhost:5000/api/types', payload, {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                message.success('Type added successfully');
            }
    
            setIsTypeModalVisible(false);
            typeForm.resetFields();
            setEditingType(null);
            // Refresh types list
            if (selectedCategory) {
                const response = await axios.get('http://localhost:5000/api/types');
                setTypes(response.data.filter((type) => type.categoryId === selectedCategory));
            }
        } catch (error) {
            message.error('Failed to save type');
            console.error(error); // Log error for debugging
        }
    };

    // Show modal for add/edit menu
    const showMenuModal = (menu) => {
        if (menu) {
            setEditingMenu(menu);
            menuForm.setFieldsValue(menu);
        } else {
            setEditingMenu(null);
            menuForm.resetFields();
        }
        setIsMenuModalVisible(true);
    };

    // Show modal for add/edit category
    const showCategoryModal = (category) => {
        if (category) {
            setEditingCategory(category);
            categoryForm.setFieldsValue(category);
        } else {
            setEditingCategory(null);
            categoryForm.resetFields();
        }
        setIsCategoryModalVisible(true);
    };

    // Show modal for add/edit type
    const showTypeModal = (type) => {
        if (type) {
            setEditingType(type);
            typeForm.setFieldsValue(type);
        } else {
            setEditingType(null);
            typeForm.resetFields();
        }
        setIsTypeModalVisible(true);
    };

    // Handle delete menu
    const handleMenuDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/menus/${id}`, {
                headers: { 
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            message.success('Menu deleted successfully');
            // Refresh menus list
            const response = await axios.get('http://localhost:5000/api/menus');
            setMenus(response.data);
            setSelectedMenu(null);
            setCategories([]);
            setSelectedCategory(null);
            setTypes([]);
        } catch (error) {
            message.error('Failed to delete menu');
        }
    };

    // Handle delete category
    const handleCategoryDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                headers: { 
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            message.success('Category deleted successfully');
            // Refresh categories list
            if (selectedMenu) {
                const response = await axios.get('http://localhost:5000/api/categories');
                const filteredCategories = response.data.filter(
                    (category) => category.menuId === selectedMenu,
                );
                setCategories(filteredCategories);
                setSelectedCategory(null);
                setTypes([]);
            }
        } catch (error) {
            message.error('Failed to delete category');
        }
    };

    // Handle delete type
    const handleTypeDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/types/${id}`, {
                headers: { 
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            message.success('Type deleted successfully');
            // Refresh types list
            if (selectedCategory) {
                const response = await axios.get('http://localhost:5000/api/types');
                setTypes(response.data.filter((type) => type.categoryId === selectedCategory));
            }
        } catch (error) {
            message.error('Failed to delete type');
        }
    };

     return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontFamily: 'monospace', fontWeight: '600' }}>Quản lý Menu</h1>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button
                    style={{
                        color: 'white',
                        background: 'black',
                        borderRadius: '0px',
                        marginBottom: '10px',
                        right: '20px',
                    }}
                    onClick={() => showMenuModal(null)}
                >
                    Thêm Menu
                </Button>
            </div>

            <Select
                style={{ width: '100%', marginBottom: '20px' }}
                placeholder='Select a menu'
                onChange={(value) => {
                    setSelectedMenu(value);
                    setSelectedCategory(null);
                    setTypes([]);
                }}
                value={selectedMenu}
            >
                {menus.map((menu) => (
                    <Option
                        key={menu._id}
                        value={menu._id}
                    >
                        {menu.name}
                    </Option>
                ))}
            </Select>

            {/* <Spin spinning={loading}>
                <List
                    header={
                        <div style={{ fontFamily: 'monospace', fontWeight: '600' }}>Categories</div> 
                    }
                    bordered
                    dataSource={categories}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    type='link'
                                    onClick={() => showCategoryModal(item)}
                                    style={{
                                        color: 'white',
                                        background: 'black',
                                        borderRadius: '0px',
                                    }}
                                >
                                    Sửa
                                </Button>,
                                <Button
                                    type='link'
                                    onClick={() => handleCategoryDelete(item._id)}
                                    style={{
                                        color: 'black',
                                        background: 'white',
                                        borderRadius: '0px',
                                    }}
                                >
                                    Xóa
                                </Button>,
                            ]}
                            onClick={() => setSelectedCategory(item._id)}
                        >
                            {item.name}
                        </List.Item>
                    )}
                />
            </Spin> */}
            {selectedMenu && (
    <div
        style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '10px',
        }}
    >
        <Button
            type='primary'
            onClick={() => showCategoryModal(null)}
            style={{
                margin: '20px 0',
                color: 'white',
                background: 'black',
                borderRadius: '0px',
                marginBottom: '10px',
                right: '20px',
            }}
        >
            Thêm category
        </Button>
    </div>
)}

<Spin spinning={loading}>
    <List
        header={
            <div style={{ fontFamily: 'monospace', fontWeight: '600' }}>Categories</div>
        }
        bordered
        dataSource={categories}
        renderItem={(item) => (
            <List.Item
                actions={[
                    <Button
                        type='link'
                        onClick={() => showCategoryModal(item)}
                        style={{
                            color: 'white',
                            background: 'black',
                            borderRadius: '0px',
                        }}
                    >
                        Sửa
                    </Button>,
                    <Button
                        type='link'
                        onClick={() => handleCategoryDelete(item._id)}
                        style={{
                            color: 'black',
                            background: 'white',
                            borderRadius: '0px',
                        }}
                    >
                        Xóa
                    </Button>,
                ]}
                onClick={() => setSelectedCategory(item._id)}
            >
                {item.name}
            </List.Item>
        )}
    />
</Spin>

            {selectedCategory && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: '10px',
                        }}
                    >
                        <Button
                            type='primary'
                            onClick={() => showTypeModal(null)}
                            style={{
                                margin: '20px 0',
                                color: 'white',
                                background: 'black',
                                borderRadius: '0px',
                                marginBottom: '10px',
                                right: '20px',
                            }}
                        >
                            Thêm Type
                        </Button>
                    </div>

                    <List
                        header={
                            <div style={{ fontFamily: 'monospace', fontWeight: '600' }}>Types</div>
                        }
                        bordered
                        dataSource={types}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type='link'
                                        onClick={() => showTypeModal(item)}
                                        style={{
                                            color: 'white',
                                            background: 'black',
                                            borderRadius: '0px',
                                        }}
                                    >
                                        Sửa
                                    </Button>,
                                    <Button
                                        type='link'
                                        onClick={() => handleTypeDelete(item._id)}
                                        style={{
                                            color: 'black',
                                            background: 'white',
                                            borderRadius: '0px',
                                        }}
                                    >
                                        Xóa
                                    </Button>,
                                ]}
                            >
                                {item.name}
                            </List.Item>
                        )}
                    />
                </>
            )}

            <Modal
                title={editingMenu ? 'Edit Menu' : 'Add Menu'}
                visible={isMenuModalVisible}
                onCancel={() => setIsMenuModalVisible(false)}
                footer={null}
            >
                <Form
                    form={menuForm}
                    onFinish={handleMenuFormSubmit}
                >
                    <Form.Item
                        name='name'
                        label='Name'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='order'
                        label='Order'
                        rules={[{ required: true }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '10px',
                            }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ borderRadius: '0px', background: 'black', color: 'white' }}
                            >
                                {editingMenu ? 'Cập nhật' : 'Thêm Menu'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={editingCategory ? 'Sửa Category' : 'Thêm Category'}
                visible={isCategoryModalVisible}
                onCancel={() => setIsCategoryModalVisible(false)}
                footer={null}
            >
                <Form
                    form={categoryForm}
                    onFinish={handleCategoryFormSubmit}
                >
                    <Form.Item
                        name='name'
                        label='Name'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='order'
                        label='Order'
                        rules={[{ required: true }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        name='availabilityStatus'
                        label='Trạng thái'
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value='Product'>Sản phẩm</Option>
                            <Option value='Pre-order'>Pre-Order</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '10px',
                            }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ borderRadius: '0px', background: 'black', color: 'white' }}
                            >
                                {editingCategory ? 'Cập nhật' : 'Thêm category'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={editingType ? 'Sửa Type' : 'Thêm Type'}
                visible={isTypeModalVisible}
                onCancel={() => setIsTypeModalVisible(false)}
                footer={null}
            >
                <Form
                    form={typeForm}
                    onFinish={handleTypeFormSubmit}
                >
                    <Form.Item
                        name='name'
                        label='Name'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '10px',
                            }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ borderRadius: '0px', background: 'black', color: 'white' }}
                            >
                                {editingType ? 'Cập nhật' : 'Thêm Type'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MenuManagement;