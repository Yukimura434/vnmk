import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumnail from '../components/ProductThumnail';
import useProductDetail from '../hooks/useProductDetail';
import SuggestedProducts from '../components/SuggestedProducts ';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 0),
        backgroundColor: '#f9f9f9',
        marginTop: '100px',
    },
    productContainer: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(3),
    },
    thumbnail: {
        flexBasis: '40%',
        borderRadius: theme.spacing(1),
        overflow: 'hidden',
    },
    info: {
        flexBasis: '55%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
    productTitle: {
        marginBottom: theme.spacing(2),
        fontWeight: 700,
        fontSize: '24px',
    },
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        backgroundColor: '#fdfdfd',
    },
    addToCartBtn: {
        marginTop: theme.spacing(2),
        display: 'block',
        width: '100%',
    },
    productMenu: {
        marginTop: theme.spacing(3),
    },
}));

function DetailPage() {
    const classes = useStyles();
    const { productId } = useParams();
    const [reviews, setReviews] = useState([]);
    const userId = localStorage.getItem('userId');

    const { product, loading } = useProductDetail(productId);

    // Hiển thị loading khi đang tải
    if (loading) {
        return (
            <Box className={classes.loading}>
                <LinearProgress />
            </Box>
        );
    }

    const handleAddReview = async (newReview) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/reviews', {
                ...newReview,
                userId,
                productId,
            });
            setReviews([...reviews, data]);
        } catch (error) {
            console.error('Error adding review:', error);
            enqueueSnackbar('Bạn chưa từng mua sản phẩm này trước đây', { variant: 'error' });
        }
    };

    return (
        <Box className={classes.root}>
            <Container>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid
                        container
                        spacing={3}
                        className={classes.productContainer}
                    >
                        <Grid
                            item
                            className={classes.thumbnail}
                        >
                            <ProductThumnail product={product} />
                        </Grid>
                        <Grid
                            item
                            className={classes.info}
                        >
                            <ProductInfo product={product} />
                        </Grid>
                    </Grid>
                </Paper>

                <div className='suggested-section'>
                    <h2 className='suggested-title'>Gợi ý sản phẩm</h2>
                    {product?.typeId && <SuggestedProducts typeId={product.typeId} />}
                </div>

                <Box className={classes.productMenu}>
                    <ProductMenu />
                </Box>

                <Routes>
                    <Route
                        path=''
                        element={<ProductDescription product={product} />}
                    />
                    <Route
                        path='additional'
                        element={<ProductAdditional product={product} />}
                    />
                    <Route
                        path='reviews'
                        element={<ProductReviews onSubmitReview={handleAddReview} />}
                    />
                </Routes>
            </Container>
        </Box>
    );
}

export default DetailPage;
