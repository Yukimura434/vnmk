import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import { formatPrice } from '../../../utils/common';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products/get-all');
        setProducts(response.data);
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setVisible(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setVisible(true);
    };

    const handleDelete = async (productId) => {
        try {
          const response = await axios.delete(`http://localhost:5000/api/products/${productId}`, {
            headers: { 
              Authorization: `Bearer ${accessToken}`,
            },
          });
          fetchProducts();
        } catch (error) {
          console.error('There was an error deleting the product!', error.message);
          console.error('Error details:', error.config);
        }
      };
      

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <img src={images[0] ? images[0] : 'https://via.placeholder.com/444'} alt="product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />

            ),
        },
        { 
            title: 'Tên sản phẩm', 
            dataIndex: 'name', 
            key: 'name', 
            render: text => <span style={{ fontWeight: '600', color: '#333' }}>{text}</span> 
        },
        { 
            title: 'Giá nguyên bản (VND)', 
            dataIndex: 'originalPrice', 
            key: 'originalPrice', 
            render: text => <span style={{ color: '#ff0000', textDecoration: 'line-through' }}>{formatPrice(text)}</span> 
        },
        { 
            title: 'Giá bán (VND)', 
            dataIndex: 'salePrice', 
            key: 'salePrice', 
            render: text => <span style={{ color: 'black',fontWeight: '600' }}>{formatPrice(text)}</span> 
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type='link'style={{ color:'white' ,background:'black' , borderRadius:'0px', marginBottom:"10px"  ,right :"20px" }} onClick={() => handleEdit(record)}>Sửa</Button>
                    <Button type='link' style={{ color:'black' ,background:'white' , borderRadius:'0px', marginBottom:"10px"  ,right :"20px",border:'1px solid black' }} danger onClick={() => handleDelete(record._id)}>Xóa</Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{  }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button  onClick={handleAdd} style={{ color:'white' ,background:'black' , borderRadius:'0px', marginBottom:"10px"  ,right :"20px" }} >Thêm sản phẩm mới </Button>
            </div>
            <Table columns={columns} dataSource={products} rowKey='_id' />
            <Modal
                title={selectedProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm '}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <ProductForm
                    product={selectedProduct}
                    onClose={() => {
                        setVisible(false);
                        fetchProducts();
                    }}
                    accessToken={accessToken}
                />
            </Modal>
        </div>
    );
};

export default ProductManagement;
