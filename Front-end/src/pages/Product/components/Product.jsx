import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { discountPercentage, formatPrice } from '../../../utils/common';

function Product({ product }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    const thumbnailUrl = product.images[0] 
        ? `${product.images[0]}`
        : 'https://via.placeholder.com/444';

    const thumbnailUrl2 = product.images[1] 
        ? `${product.images[1]}`
        : 'https://via.placeholder.com/444';

    const promotionPercent = discountPercentage(product.originalPrice, product.salePrice);

    return (
        <Card
            style={{
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none',
                border: 'none',
                width: '100%',
                height: '450px',
                borderRadius: '0px',
                position: 'relative',
                cursor: "pointer"
            }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box style={{ position: 'relative', width: '100%', height: '422px' }}>
                {promotionPercent > 0 && (
                    <Box
                        style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            backgroundColor: '#EB2F3A',
                            color: 'white',
                            padding: '5px 5px',
                            borderRadius: '0px',
                            fontWeight: '600',
                            zIndex: 1,
                            // width:'56px',
                            display:'flex',
                            justifyContent: 'center',
                        }}
                    >
                        - {promotionPercent}%
                    </Box>
                )}
                <CardMedia
                    component='img'
                    alt={product.name}
                    image={isHovered ? thumbnailUrl2 : thumbnailUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1 }} style={{ margin: '0', padding: '0', paddingTop: "10px" }}>
                <Typography
                    variant='h6'
                    component='div'
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: 'bold',
                        color: '#333',
                        fontFamily: 'monospace',
                    }}
                >
                    {product.name}
                </Typography>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        background: 'transparent',
                        margin: '0',
                        padding: '0'
                    }}
                >
                    <Box>
                        <Typography
                            variant='h6'
                            component='div'
                            style={{
                                marginRight: '12px',
                                fontWeight: 'bold',
                                color: '#333',
                                fontFamily: 'monospace',
                                fontSize: '1rem',
                            }}
                        >
                            {formatPrice(product.salePrice)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant='body2'
                            component='div'
                            style={{
                                color: '#808089',
                                textDecoration: 'line-through',
                                fontSize: '0.875rem',
                                fontFamily: 'monospace',
                            }}
                        >
                            {formatPrice(product.originalPrice)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        salePrice: PropTypes.number.isRequired,
        originalPrice: PropTypes.number.isRequired,
        images: PropTypes.array.isRequired,
    }).isRequired,
};

export default Product;
