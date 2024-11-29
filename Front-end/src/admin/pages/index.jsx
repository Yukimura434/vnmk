import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.svg';
import { IconButton, Menu as MaterialMenu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { logout } from '../../pages/Auth/userSlice';
import { useDispatch } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;

const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        dispatch(logout());
        handleCloseMenu();
        navigate('/');
    };

    const handleUserInfo = () => {
        handleCloseMenu();
        navigate('/account');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={256} theme='dark' style={{ background: 'white' }}>
                <Menu
                    style={{ background: '' }}
                    mode='inline'
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => setSelectedKey(key)}
                >
                    <Menu.Item
                        key='/admin/dashboard'
                        style={
                            selectedKey === '/admin/dashboard'
                                ? { background: 'black', color: 'white' }
                                : {}
                        }
                    >
                        <Link to='/admin/dashboard'>Doanh thu bán hàng</Link>
                    </Menu.Item>
                    <Menu.Item
                        key='/admin/products'
                        style={
                            selectedKey === '/admin/products'
                                ? { background: 'black', color: 'white' }
                                : {}
                        }
                    >
                        <Link to='/admin/products'>Quản lý sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item
                        key='/admin/menu'
                        style={
                            selectedKey === '/admin/menu'
                                ? { background: 'black', color: 'white' }
                                : {}
                        }
                    >
                        <Link to='/admin/menu'>Quản lý menu</Link>
                    </Menu.Item>
                    <Menu.Item
                        key='/admin/orders'
                        style={
                            selectedKey === '/admin/orders'
                                ? { background: 'black', color: 'white' }
                                : {}
                        }
                    >
                        <Link to='/admin/orders'>Quản lý đơn hàng</Link>
                    </Menu.Item>
                    {/* Thêm các item khác nếu cần */}
                </Menu>
            </Sider>
            <Layout style={{width:''}}>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div
                        style={{
                            padding: '0 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <a
                            href='/'
                            className='wrapper__header__logo'
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <img
                                src={logo}
                                alt='logo'
                                style={{ height: '40px' }} // điều chỉnh kích thước logo nếu cần
                            />
                        </a>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h1 style={{ fontFamily: 'monospace', margin: 0 }}>Admin VNMK</h1>
                        </div>
                        <IconButton
                            color='inherit'
                            onClick={handleUserClick}
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Header>

                <Content style={{ margin: '0 16px', padding: 24, minHeight: 280}}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Admin VNMK ©2024</Footer>
            </Layout>
            <MaterialMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleUserInfo}>Thông tin cá nhân</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
            </MaterialMenu>
        </Layout>
    );
};

export default AdminPage;
