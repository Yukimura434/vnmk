import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../pages/Auth/userSlice';
import './PrivateRoute.css';

const PrivateRoute = ({ user, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      Modal.confirm({
        title: 'Bạn không có quyền truy cập trang này',
        content: (
          <div>
            <p>Bạn không có quyền truy cập trang này.</p>
          </div>
        ),
        okText: 'Tiếp tục',
        okButtonProps: { className: 'custom-ok-button' },
        cancelButtonProps: { style: { display: 'none' } },
        onOk: () => {
          navigate('/Not-found');
        },
      });
    }
  }, [user, navigate, dispatch]);

  return user && user.role === 'admin' ? children : null;
};

export default PrivateRoute;
