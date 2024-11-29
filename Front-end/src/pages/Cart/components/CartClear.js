// import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartClear = () => {
    return (
        <Container>
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="80vh"
                style={{ marginTop: "10px" }}
            >
                {/* <ShoppingCartIcon style={{ fontSize: 100, color: '#ccc' }} /> */}
                <img
                src="https://curnonwatch.com/template/assets/images/empty-cart-curnon.png"
                alt="empty"
                className="empty__img"
                width="160"
                height="160"
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    Giỏ hàng của bạn trống
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Thêm sản phẩm vào giỏ hàng để xem chúng ở đây.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    href="/products"
                    style={{ background : 'black', color : 'white' , borderRadius : '0px' , marginTop:'10px',fontFamily: 'monospace',}}
                >
                    Tiếp tục mua sắm
                </Button>
            </Box>
        </Container>
    );
};

export default CartClear;
