import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import { Button, Form, Input } from 'antd';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartsApi from '../../../api/cartApi';
import orderApi from '../../../api/ordersApi';
import userApi from '../../../api/userApi';
import { discountPercentage, formatPrice } from '../../../utils/common';
import { addToCart } from '../../Cart/cartSlice';


ProductInfo.propTypes = {
    product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    name: {
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    descriptionBox:{
        fontFamily: 'monospace',


    },
    descriptionTitle:{
        fontWeight: "800",
        fontFamily: 'monospace',
        fontSize: '20px',
        // borderBottom: `1px solid ${theme.palette.grey[300]}`,
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        marginTop:'10px'
    },
    description: {
        fontFamily: 'monospace',
        fontSize: '20px',
    },
    priceBox: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        margin: ' 15px 0px',
    },
    salePrice: {
        marginRight: theme.spacing(1),
        fontSize: '18px',
        fontFamily: 'monospace',
        fontWeight: '600',
    },
    originalPrice: {
        marginRight: theme.spacing(1),
        fontSize: '18px',
        fontFamily: 'monospace',
        textDecoration: 'line-through',
        color: '#807D7C',
    },
    promotionPercent: {
        color: '#dc4136',
        fontSize: '18px',
        fontFamily: 'monospace',
        fontWeight: '500',
    },
    keyCount: {
        display: 'flex',
        marginTop: '10px',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        margin: ' 15px 0px',
    },
    sizeName: {
        justifyContent: 'conter',
        fontFamily: 'monospace',
        fontSize: '24px',
    },
    payment: {
        margin: ' 15px 0px',
    },
    policy: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '.5rem',
        gap: '.8rem',
        // borderTop: `1px solid ${theme.palette.grey[300]}`,

        '& > span': {
            color: '#807D7C',
            fontFamily: 'monospace',
            fontSize: '20px',
        },
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

function ProductInfo({ product = {} }) {
    const classes = useStyles();
    const { name, description, salePrice, originalPrice, keyCount, _id , images } = product;
    const userId = localStorage.getItem('userId');
    const promotionPercent = discountPercentage(originalPrice, salePrice);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState([]);
    const shippingInfo = {
        receiver:userInfo.displayName,
        phone:userInfo.contactPhone,
        address:userInfo.address,
        addressDetail:userInfo.addressDetail,
        isInCart: false
    };
    const [error, setError] = useState('');


    // Fake data for test pay now

    useEffect(()=>{
        if (!userId) {
            setError('No user ID found in local storage');
            return;
        }
        (async () => {
            try {
                const userInfo = await userApi.getInfo(userId);
                setUserInfo(userInfo);
            } catch (error) {
                setError('Failed to fetch account info');
            }
        })();
    }, [userId]);


    // Payload add to cart 
    // ============================================================================================================================
    const productId = _id ? _id.toString() : '';
    const quantity = 1;
    const payload = { userId, productId, quantity };
    // ============================================================================================================================
    const handleAddToCart = async () => {
        if (!userId) {
            setOpenModal(true);
            return;
        }
        try {
            const req = await cartsApi.add(payload);
            const action = addToCart({
                id: product._id,
                product,
                quantity: 1,
              });
              dispatch(action);
            enqueueSnackbar('Đã thêm vào giỏ hàng  ', { variant: 'success' });
        } catch (error) {
            console.error('Add to cart failed:', error);
            enqueueSnackbar('Đã xảy ra lỗi ! Vui lòng thử lại sau ', { variant: 'error' });
        }
    };
    

    // Payload pay now
    // ============================================================================================================================
    const price = salePrice
    const urlImage = images[0]
    const products  = [{ productId , price , quantity ,urlImage}]
    const payloadPay = {userId , products , shippingInfo}
    // ============================================================================================================================
    const handleBuyNow = async () => {
        if (!userId) {
            setOpenModal(true);
            return;
        }
        try {
            const req = await orderApi.add(payloadPay);
            navigate(`/orders?id=${req.orderExist._id}`);
    
        } catch (error) {
            enqueueSnackbar('Đã xảy ra lỗi! Vui lòng thử lại sau.', { variant: 'error' });
        }
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleNavigate = () => {
        navigate('/login')
    }


    return (
        <Box className={classes.root}>
            {/* Tên sản phẩm  */}
            <Typography
                component='h1'
                variant='h3'
                className={classes.name}
            >
                {name}
            </Typography>
            {/* Box giá sản phẩm */}
            <Box className={classes.priceBox}>
                <Box
                    component='span'
                    className={classes.salePrice}
                >
                    {formatPrice(salePrice)}
                </Box>
                {promotionPercent > 0 && (
                    <>
                        <Box
                            component='span'
                            className={classes.originalPrice}
                        >
                            {formatPrice(originalPrice)}
                        </Box>
                        <Box
                            component='span'
                            className={classes.promotionPercent}
                        >
                            {` ${promotionPercent}%`}
                        </Box>
                    </>
                )}
            </Box>
            {/* Box chọn size */}
            <Box className={classes.keyCount}>
                <Typography className={classes.sizeName}>Số lượng phím</Typography>
                <Box className={classes.size}>
                    <Form style={{ maxWidth: 50, marginLeft: '10px' }}>
                        <Form.Item>
                            <Input
                                value={keyCount}
                                readOnly
                                placeholder='Enter dial size'
                            />
                        </Form.Item>
                    </Form>
                </Box>
            </Box>
            {/* Box chọn Mua ngay hoặc add to cart */}
            <Box className={classes.payment}>
                <Button
                    type='primary'
                    onClick={handleBuyNow}
                    style={{ 
                        marginRight: '10px', 
                        background: 'black' ,
                        borderRadius: '0px' ,
                        fontFamily: 'monospace',
                    }}
                >
                    Mua ngay
                </Button>
                <Button
                    type='primary'
                    onClick={handleAddToCart}
                    style={{
                        marginRight: '10px',
                        background: 'white',
                        color: 'black',
                        border: '1px solid black',
                        fontWeight: 'bold',
                        borderRadius: '0px' ,
                        fontFamily: 'monospace',
                    }}
                >
                    Thêm vào giỏ hàng
                </Button>
            </Box>
            {/* Box chính sách mua hàng  */}
            <Box>
                <Box className={classes.policy}>
                    <box-icon name='refresh' ></box-icon>
                    <Box component='span'>
                        ĐỔI TRẢ MIỄN PHÍ trong 3 ngày (Với lỗi từ Nhà sản xuất)
                    </Box>
                </Box>
                <Box className={classes.policy}>
                    <box-icon name='package' ></box-icon>
                    <Box component='span'>FREE SHIPPING đơn hàng &gt; 500K</Box>
                </Box>
                <Box className={classes.policy}>
                    <box-icon name='check-shield' ></box-icon>
                    <Box component='span'>
                        BẢO HÀNH trong 1 năm với sản phẩm(do kĩ thuật viên kiểm định)
                    </Box>
                </Box>
            </Box>
            {/* Box thông tin sản phẩm  */}
            <Box className={classes.descriptionBox}>
                <Typography
                    className={classes.descriptionTitle}
                >
                    THÔNG TIN
                </Typography>
                <Typography
                    variant='body2'
                    className={classes.description}
                >
                    {description}
                </Typography>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='modal-title'
                aria-describedby='modal-description'
            >
                <div className={classes.modal}>
                    <Typography variant='h5' id='modal-title' style={{fontFamily: 'monospace',}}>
                        Vui lòng đăng nhập để tiếp tục 
                    </Typography>
                    <Box style={{display: "flex",justifyContent: "space-between" , marginTop:'10px'}}>
                        <Button style={{ borderRadius: '0px' ,height:'32px',width:'100px',fontFamily: 'monospace',}} onClick={handleCloseModal}>Đóng</Button>
                        <Button style={{ borderRadius: '0px' ,height:'32px',width:'100px' , background:'black',color:'#fff',fontFamily: 'monospace',}} onClick={handleNavigate}>Đăng nhập</Button>
                    </Box>
                </div>
            </Modal>
        </Box>
    );
}

export default ProductInfo;
