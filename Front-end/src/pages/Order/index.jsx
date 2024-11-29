import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Paper,
    styled,
    Typography,
} from '@material-ui/core';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Form, Formik } from 'formik';
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import orderApi from '../../api/ordersApi';
import { formatPrice } from '../../utils/common';
import OrderIframe from './components/OrderIframe';
import UpdateShippingInfo from './components/UpdateShippingInfo';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
        backgroundColor: '#fdfdfd',
    },
    container: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
        paddingBottom: theme.spacing(2),
    },
    address: {},
    item: {},
    paymentMethod: {},
}));

const CustomRadio = styled(Radio)({
    '&.Mui-checked': {
        color: 'black',
    },
});

const OrderPage = () => {
    const classes = useStyles();
    const [isIframeVisible, setIsIframeVisible] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('id');
    const [itemsList, setItemsList] = useState([]);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const totalAmount = itemsList.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
    const [shippingInfo, setShippingInfo] = useState({
        receiver: ' ',
        phone: ' ',
        address: ' ',
        addressDetail: ' ',
    });

    const validationSchema = Yup.object().shape({
        paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
    });

    const handleBuyNow = async (values) => {
        const { paymentMethod } = values;
        if (paymentMethod==='cash') {
            enqueueSnackbar("Đặt hàng thành công ",{variant:"success"})
            navigate('/success-page')
        }
        try {
            const res = await orderApi.payment(orderId, paymentMethod);
            const paymentUrl = res.paymentUrl.paymentInf.order_url;

            setPaymentUrl(paymentUrl);

            // Hiển thị iframe sau khi gọi API
            setIsIframeVisible(true);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleCloseIframe = () => {
        setIsIframeVisible(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderApi.get(orderId);
                const itemsList = res.products;
                const shippingInfo = res.shippingInfo;
                setShippingInfo(shippingInfo);
                setItemsList(itemsList);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);
    return (
        <Box style={{ marginTop: '100px' }}>
            <Container style={{ marginTop: '120px', width: '1072px' }}>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid className={classes.container}>
                        <Box className={classes.address}>
                            <Box style={{display:'flex',justifyContent:"space-between"}}>
                                <Typography
                                    component='h3'
                                    variant='h7'
                                    style={{ fontFamily: 'monospace', marginBottom: '20px' }}
                                >
                                    Địa chỉ nhận hàng
                                </Typography>
                                <Button
                                    variant='outlined'
                                    color='black'
                                    onClick={handleOpenDialog}
                                    style={{border: 'none' ,textDecoration: 'underline',padding: '0px',margin: '0px'}}
                                >
                                    Thay đổi địa chỉ nhận hàng
                                </Button>
                            </Box>
                            <Box style={{ display: 'flex' }}>
                                <Typography
                                    variant='body2'
                                    style={{ marginRight: '15px', fontWeight: 'bold' }}
                                >
                                    {shippingInfo.receiver}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    style={{ marginRight: '15px' }}
                                >
                                    ({shippingInfo.phone})
                                </Typography>
                                <Typography
                                    variant='body2'
                                    style={{ marginRight: '15px' }}
                                >
                                    {shippingInfo.addressDetail}.
                                </Typography>
                                <Typography
                                    variant='body2'
                                    style={{ marginRight: '15px' }}
                                >
                                    {shippingInfo.address}
                                </Typography>
                            </Box>

                        </Box>
                    </Grid>
                </Paper>
            </Container>
            {/* Thông tin sản phẩm  */}
            <Container style={{ width: '1072px' }}>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid className={classes.container}>
                        <Box className={classes.item}>
                            <Typography
                                component='h3'
                                variant='h6'
                                style={{ fontFamily: 'monospace', marginBottom: '20px' }}
                            >
                                Thông tin sản phẩm
                            </Typography>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Header Row */}
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        backgroundColor: '#f5f5f5',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <Box style={{ width: '20%', textAlign: 'center' }}>
                                        {/* <Typography variant='body2'>Ảnh</Typography> */}
                                    </Box>
                                    <Box style={{ width: '20%', textAlign: 'center' }}>
                                        <Typography
                                            component='h3'
                                            variant='h7'
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            Giá
                                        </Typography>
                                    </Box>
                                    <Box style={{ width: '20%', textAlign: 'center' }}>
                                        <Typography
                                            component='h3'
                                            variant='h7'
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            Số lượng
                                        </Typography>
                                    </Box>
                                    <Box style={{ width: '20%', textAlign: 'center' }}>
                                        <Typography
                                            component='h3'
                                            variant='h7'
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            Thành tiền
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* Product Rows */}
                                {itemsList.map((item, index) => (
                                    <Box
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            width: '100%',
                                            marginBottom: '10px',
                                            padding: '10px',
                                            borderBottom: '1px solid #e0e0e0',
                                        }}
                                    >
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '20%',
                                            }}
                                        >
                                            <img
                                                src={
                                                    item.urlImage
                                                        ? `${item.urlImage}`
                                                        : 'https://via.placeholder.com/444'
                                                }
                                                alt={item.name}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '20%',
                                            }}
                                        >
                                            <Typography variant='body2'>
                                                {formatPrice(item.price)}
                                            </Typography>
                                        </Box>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '20%',
                                            }}
                                        >
                                            <Typography variant='body2'>{item.quantity}</Typography>
                                        </Box>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '20%',
                                            }}
                                        >
                                            <Typography
                                                variant='body2'
                                                style={{ fontWeight: '600' }}
                                            >
                                                {formatPrice(item.quantity * item.price)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                        marginTop: '10px',
                                        padding: '10px',
                                    }}
                                >
                                    <Typography
                                        variant='h6'
                                        style={{ fontWeight: '600' }}
                                    >
                                        Tổng tiền: {formatPrice(totalAmount)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            </Container>
            {/* Phương thức thanh toán  */}
            <Container style={{ width: '1072px' }}>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid className={classes.container}>
                        <Box className={classes.paymentMethod}>
                            <Typography
                                component='h3'
                                variant='h7'
                                style={{ fontFamily: 'monospace', marginBottom: '20px' }}
                            >
                                Phương thức thanh toán
                            </Typography>
                            <Box>
                                <Formik
                                    initialValues={{ paymentMethod: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleBuyNow}
                                >
                                    {({ values, handleChange, handleBlur, handleSubmit }) => (
                                        <Form 
                                            onSubmit={handleSubmit}
                                        >
                                            <Box sx={{ padding: 2 }}>
                                                <FormControl component='fieldset'>
                                                    <RadioGroup
                                                        aria-label='payment-method'
                                                        name='paymentMethod'
                                                        value={values.paymentMethod}
                                                        onChange={handleChange}
                                                    >
                                                        <FormControlLabel
                                                            value='payment'
                                                            control={<CustomRadio />}
                                                            label={
                                                                <Box
                                                                    display='flex'
                                                                    alignItems='center'
                                                                >
                                                                    <AccountBalanceIcon
                                                                        sx={{ marginRight: 1 }}
                                                                    />
                                                                    <Box>
                                                                        <Typography variant='body1'>
                                                                            Chuyển khoản ngân hàng
                                                                        </Typography>
                                                                        <Typography variant='body2'>
                                                                            Thực hiện thanh toán vào
                                                                            ngay tài khoản ngân hàng
                                                                            của chúng tôi. Vui lòng
                                                                            sử dụng Mã đơn hàng của
                                                                            bạn trong phần Nội dung
                                                                            thanh toán. Đơn hàng sẽ
                                                                            được giao sau khi tiền
                                                                            đã chuyển.
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            value='cash'
                                                            control={<CustomRadio />}
                                                            label={
                                                                <Box
                                                                    display='flex'
                                                                    alignItems='center'
                                                                >
                                                                    <LocalShippingIcon
                                                                        sx={{ marginRight: 1 }}
                                                                    />
                                                                    <Box>
                                                                        <Typography variant='body1'>
                                                                            Trả tiền mặt khi nhận
                                                                            hàng
                                                                        </Typography>
                                                                        <Typography variant='body2'>
                                                                            Trả tiền mặt khi giao
                                                                            hàng
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            }
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Button
                                                type='submit'
                                                style={{
                                                    right: '0',
                                                    top: '0',
                                                    border: '1px solid black',
                                                    margin: '15px',
                                                    borderRadius: '0px',
                                                    padding:'5px 15px'
                                                }}
                                            >
                                                Đặt hàng
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            </Container>

            <OrderIframe
                isVisible={isIframeVisible}
                handleClose={handleCloseIframe}
                url={paymentUrl}
                orderId={orderId}
            />
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Thay đổi địa chỉ nhận hàng</DialogTitle>
                <DialogContent>
                    <UpdateShippingInfo 
                        shippingInfo={shippingInfo} 
                        setShippingInfo={setShippingInfo} 
                        onClose={handleCloseDialog} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="black">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderPage;
