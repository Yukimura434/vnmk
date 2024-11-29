import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Product from './Product';

function ProductList({ data = [] }) {
  return (
    <Box style={{ background: "transparent" }}>
      <Grid container spacing={3} style={{ background: "transparent" }}>
        {data.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} style={{boxShadow: 'none',borderRadius:'0px'}}>
            <Box style={{ borderRadius:'0px'}}>
              <Product product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductList;
