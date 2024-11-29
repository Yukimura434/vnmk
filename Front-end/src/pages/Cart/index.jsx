import { Box, Button, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { formatPrice } from '../../../src/utils/common';
import cartsApi from '../../api/cartApi';
import orderApi from '../../api/ordersApi';
import userApi from '../../api/userApi';
import SearchAddressField from '../../components/form-controls/SearchAddressField';
import { removeFromCart } from './cartSlice';
import CartClear from './components/CartClear';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';

const CustomRadio = styled(Radio)({
    '&.Mui-checked': {
        color: 'black',
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    name: {
        fontWeight: '700',
        fontFamily: 'monospace',
        marginBottom: '5px',
    },
    descriptionBox: {
        // fontFamily: 'Montserrat !important',
        fontFamily: 'monospace',
    },
    descriptionTitle: {
        fontWeight: '800',
        fontFamily: 'monospace',
        fontSize: '20px',
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        marginTop: '10px',
    },
    description: {
        fontFamily: 'monospace',
        fontSize: '20px',
    },
    priceBox: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        margin: '15px 0px',
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
        margin: '15px 0px',
    },
    sizeName: {
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: '24px',
    },
    payment: {
        margin: '15px 0px',
    },
    policy: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '.5rem',
        gap: '.8rem',
        '& > span': {
            color: '#807D7C',
            fontFamily: 'monospace',
            fontSize: '20px',
        },
    },
    cartContainer: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(2),
    },
    cartImage: {
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        marginRight: theme.spacing(2),
    },
    cartDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItem: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(2),
        justifyContent: ' space-between',
        marginLeft: '20px',
    },
    leftPanel: {
        width: '50%',
        borderRight: '1px solid black',
        padding: '20px',
    },
    rightPanel: {
        width: '50%',
        marginTop: '20px',
    },
    input: {
        fontFamily: 'monospace',
        height: '60px',
    },
    img: {
        height: '120px',
        width: '120px',
        marginRight: '15px',
    },
    item: {
        marginBottom: '10px',
    },
}));

const validationSchema = Yup.object().shape({

});
function CartPages(props) {
    //=================================================================================================================================
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleCheckboxChange = (product) => {
        if (selectedProducts.some((item) => item._id === product._id)) {
            setSelectedProducts(selectedProducts.filter((item) => item._id !== product._id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };
    //=================================================================================================================================

    const [paymentMethod, setPaymentMethod] = React.useState('');
    const navigate = useNavigate();

    const handleChangePay = (event) => {
        setPaymentMethod(event.target.value);
    };
    const classes = useStyles();
    // Lấy danh sách sản phẩm từ Redux
    const cartItems = useSelector((state) => state.cart.cartItems);
    
    // Tính tổngg sản phẩm , giá trong giỏ hàng từ Redux
    const cartItemsCount = useSelector(cartItemsCountSelector);
    const cartItemsTotal = useSelector(cartTotalSelector);
    const [cartList, setCartList] = useState([]);

    const userId = localStorage.getItem('userId');

    const [formData, setFormData] = useState({
        receiver: '',
        phone: '',
        address: '',
        addressDetail: '',
        isInCart: true,
    });

    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleRemoveItem = async (id) => {
        try {
            const userId = localStorage.getItem('userId');
            const productIds = [id];
            const req = await cartsApi.delete(userId, productIds);
            dispatch(removeFromCart(id));
            enqueueSnackbar('Đã xóa khỏi giỏ hàng!', { variant: 'error' });
        } catch (error) {
            enqueueSnackbar('Xóa sản phẩm khỏi giỏ hàng thất bại!', { variant: 'error' });
        }
    };

    useEffect(() => {
        if (!userId) {
            setError('No user ID found in local storage');
            return;
        }

        (async () => {
            try {
                const [cartList, userData] = await Promise.all([
                    cartsApi.getAll(userId),
                    userApi.getInfo(userId),
                ]);

                setCartList(cartList);
                setFormData(userData);
            } catch (error) {
                console.log('Failed to fetch data', error);
                setError('Failed to fetch data');
            }
        })();
    }, [cartItems]);

    // Button Buy Now
    // =========================================================
    const products = [];
    cartList.forEach((cartItem) => {
        cartItem.product.forEach((productItem) => {
            if (selectedProducts.some((item) => item._id === productItem._id)) {
                products.push({
                    productId: productItem._id,
                    price: productItem.salePrice,
                    quantity: cartItem.quantity,
                    urlImage: productItem.images[0],
                });
            }
        });
    });

    const handleBuyNow = async (values) => {
        const shippingInfo = {
            receiver: values.displayName,
            phone: values.contactPhone,
            address: values.address,
            addressDetail: values.addressDetail,
            isInCart: true,
        };

        const updatedProducts = selectedProducts.map((selectedProduct) => {
            const cartItem = cartList.find((item) =>
                item.product.some((product) => product._id === selectedProduct._id),
            );
            return {
                productId: selectedProduct._id,
                price: selectedProduct.salePrice,
                quantity: cartItem.quantity, // Cập nhật số lượng từ cartList
                urlImage: selectedProduct.images[0],
            };
        });

        const payloadPay = { userId, products: updatedProducts, shippingInfo };

        if (!userId) {
            return;
        }
        if (selectedProducts.length === 0) {
            enqueueSnackbar('Vui lòng chọn ít nhất một sản phẩm để mua hàng!', {
                variant: 'warning',
            });
            return;
        }
        try {
            const req = await orderApi.add(payloadPay);
            navigate(`/orders?id=${req.orderExist._id}`);
        } catch (error) {
            enqueueSnackbar('Đã xảy ra lỗi! Vui lòng thử lại sau.', { variant: 'error' });
        }
    };

    const handleIncreaseQuantity = (id) => {
        setCartList(
            cartList.map((item) =>
                item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
        );
    };

    const handleDecreaseQuantity = (id) => {
        setCartList(
            cartList.map((item) =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            ),
        );
    };

    const totalAmount = selectedProducts.reduce((total, selectedProduct) => {
        const cartItem = cartList.find(item =>
            item.product.some(product => product._id === selectedProduct._id)
        );
        return total + cartItem.quantity * selectedProduct.salePrice;
    }, 0);

    return (
        <Box>
            {cartItems.length === 0 ? (
                <CartClear />
            ) : (
                <Box className={classes.cartContainer}>
                    <Box className={classes.leftPanel}>
                        <Box className={classes.leftPanelUp}>
                            <Box className={classes.address}>
                                <Typography
                                    component='h1'
                                    variant='h5'
                                    style={{ fontFamily: 'monospace', marginBottom: '20px' }}
                                >
                                    Thông tin vận chuyển
                                </Typography>
                                <Formik
                                    initialValues={formData}
                                    enableReinitialize
                                    validationSchema={validationSchema}
                                    onSubmit={handleBuyNow}
                                >
                                    {({ handleChange, handleBlur }) => (
                                        <Form className={classes.wrapper}>
                                            <Form className={classes.wrapper}>
                                                <Box className={classes.item}>
                                                    <Typography className={classes.name}>
                                                        Tên người đặt
                                                    </Typography>
                                                    <Field
                                                        as={TextField}
                                                        name='displayName'
                                                        className={classes.input}
                                                        variant='outlined'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth={true}
                                                        fontFamily='monospace'
                                                    />
                                                </Box>
                                                <Box className={classes.item}>
                                                    <Typography className={classes.name}>
                                                        Địa chỉ ( quận , thành phố )
                                                    </Typography>
                                                    <Field
                                                        as={SearchAddressField}
                                                        name='address'
                                                        className={classes.input}
                                                        variant='outlined'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth={true}
                                                    />
                                                </Box>
                                                <Box className={classes.item}>
                                                    <Typography className={classes.name}>
                                                        Số nhà{' '}
                                                    </Typography>
                                                    <Field
                                                        as={TextField}
                                                        name='addressDetail'
                                                        className={classes.input}
                                                        variant='outlined'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth={true}
                                                    />
                                                </Box>

                                                <Box className={classes.item}>
                                                    <Typography className={classes.name}>
                                                        Số điện thoại
                                                    </Typography>
                                                    <Field
                                                        as={TextField}
                                                        name='contactPhone'
                                                        className={classes.input}
                                                        variant='outlined'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth={true}
                                                    />
                                                </Box>
                                            </Form>
                                            <Box
                                                style={{
                                                    justifyContent: 'center',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    className={classes.button}
                                                    variant='contained'
                                                    color='primary'
                                                    type='submit'
                                                    style={{
                                                        marginTop: '20px',
                                                        background: 'black',
                                                        borderRadius: '0px',
                                                        fontFamily: 'monospace',
                                                        color: 'white',
                                                    }}
                                                    // disabled={selectedProducts.length === 0}
                                                >
                                                    Đặt hàng
                                                </Button>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.rightPanel}>
                        <div>
                            <Typography
                                component='h1'
                                variant='h5'
                                style={{ fontFamily: 'monospace', marginBottom: '20px' }}
                            >
                                Giỏ hàng({cartItemsCount})
                            </Typography>
                            {cartList.map((cartItem) => (
                                <Box key={cartItem._id}>
                                    {cartItem.product.map((productItem, index) => (
                                        <Box style={{ display: 'flex' }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <input
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        backgroundColor: 'black',
                                                        alignSelf: 'center',
                                                    }}
                                                    type='checkbox'
                                                    checked={selectedProducts.some(
                                                        (item) => item._id === productItem._id,
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChange(productItem)
                                                    }
                                                />
                                            </Box>
                                            <Box
                                                key={index}
                                                className={classes.cartItem}
                                            >
                                                <Box className={classes.img}>
                                                    <img
                                                        src={
                                                            productItem.images[0]
                                                                ? `${productItem.images[0]}`
                                                                : 'https://via.placeholder.com/444'
                                                        }
                                                        alt={productItem.name}
                                                        className={classes.cartImage}
                                                    />
                                                </Box>
                                                <Box className={classes.cartDetails}>
                                                    <Typography
                                                        component='h1'
                                                        variant='h5'
                                                        className={classes.name}
                                                    >
                                                        {productItem.name}
                                                    </Typography>
                                                    <Box style={{ display: '' }}>
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                border: '1px solid  black',
                                                                alignItems:'center'
                                                            }}
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    handleDecreaseQuantity(
                                                                        cartItem._id,
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                            <Typography
                                                                component='p'
                                                                className={classes.description}
                                                            >
                                                                {cartItem.quantity}
                                                            </Typography>
                                                            <Button
                                                                onClick={() =>
                                                                    handleIncreaseQuantity(
                                                                        cartItem._id,
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </Box>
                                                    </Box>

                                                    <Typography
                                                        component='p'
                                                        className={classes.salePrice}
                                                    >
                                                        {formatPrice(productItem.salePrice)}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() =>
                                                            handleRemoveItem(productItem._id)
                                                        }
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                            <Box style={{ display: 'flex' }}>
                                <Typography
                                    component='h1'
                                    variant='h5'
                                    style={{
                                        fontFamily: 'monospace',
                                        marginBottom: '20px',
                                        marginRight: '300px',
                                    }}
                                >
                                    Tổng tiền
                                </Typography>
                                <Typography
                                    component='h1'
                                    variant='h5'
                                    style={{
                                        fontFamily: 'monospace',
                                        marginBottom: '20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {formatPrice(totalAmount)}
                                </Typography>
                            </Box>
                        </div>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

CartPages.propTypes = {
    // Define prop types if any
};

export default CartPages;
