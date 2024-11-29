import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'


ProductThumnail.propTypes = {
    product : PropTypes.object
}


function ProductThumnail({product}) {
    const thumbnailUrl = product.images[0] 
    // Chờ Api image từ BE
    ? `${product?.images[0]}`
    : 'https://via.placeholder.com/444'
  return (
    <Box>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  )
}

export default ProductThumnail
