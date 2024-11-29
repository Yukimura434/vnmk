import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

function SuccessPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {}; // Lấy orderId từ state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ marginTop: '150px' }}>
      <Result
        status="success"
        title="Mua hàng thành công !"
        subTitle={`Order number: ${orderId || 'N/A'}`} 
        extra={[
          <Button
            onClick={() => { navigate('/order-history'); }}
            type="primary"
            key="console"
            style={{
              borderRadius: '0px',
              background: 'white',
              color: 'black',
              width: '132px',
              marginRight: '20px',
              border: '1px solid black',
            }}
          >
            Đơn hàng
          </Button>,
          <Button
            onClick={() => { navigate('/products'); }}
            key="buy"
            style={{ borderRadius: '0px', background: 'black', color: 'white' }}
          >
            Tiếp tục mua
          </Button>,
        ]}
      />
    </div>
  );
}

SuccessPage.propTypes = {};

export default SuccessPage;
