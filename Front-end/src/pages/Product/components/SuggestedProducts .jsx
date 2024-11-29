import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { formatPrice } from '../../../utils/common';
import './SuggestedProducts.scss';

const { Meta } = Card;

const SuggestedProducts = ({ typeId }) => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (typeId) {
      const fetchSuggestedProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/products?_sort=asc&_page=1&typeId=${typeId}`
          );          
          const productsData = response.data.rows;
          
          if (Array.isArray(productsData)) {
            setProducts(productsData);
          } else {
            console.error('Products data is not an array:', productsData);
            setProducts([]);
          }
        } catch (error) {
          console.error('Failed to fetch suggested products', error);
        }
      };
      
      fetchSuggestedProducts();
    }
  }, [typeId]);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -(containerRef.current.clientWidth / 2),
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`); 
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <div
        ref={containerRef}
        className="suggested-products-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          overflowX: 'auto',
          paddingRight: '50px',
          scrollBehavior: 'smooth',
        }}
      >
        {products.length > 0 ? (
          products.map((product) => {
            const thumbnailUrl = product?.images?.[0]
              ? product.images[0]
              : 'https://via.placeholder.com/444';

            return (
              <Card
                hoverable
                key={product._id}
                onClick={() => handleCardClick(product._id)}
                style={{ width: 265, height: '300px', flex: '0 0 auto' }}
                cover={
                  <img
                    alt={product.name}
                    src={thumbnailUrl}
                    style={{ height: 200, objectFit: 'cover', width: '100%' }}
                  />
                }
              >
                <Meta
                  title={product.name}
                  description={`Giá: ${formatPrice(product.salePrice)}`}
                  style={{ textAlign: 'center', fontFamily: 'monospace' }}
                />
              </Card>
            );
          })
        ) : (
          <p>No suggested products available.</p>
        )}
      </div>

      <Button
        icon={<LeftOutlined />}
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: '#fff',
          borderColor: '#d9d9d9',
        }}
      />

      <Button
        icon={<RightOutlined />}
        onClick={scrollRight}
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: '#fff',
          borderColor: '#d9d9d9',
        }}
      />
    </div>
  );
};

export default SuggestedProducts;
