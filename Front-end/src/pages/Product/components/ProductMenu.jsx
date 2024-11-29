import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NavLink, useMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    flexFlow: 'nowrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    '& > li': {
      padding: theme.spacing(2, 4),
      borderBottom: `1px solid ${theme.palette.divider}`,
      '& > a': {
        color: theme.palette.text.secondary,
        textDecoration: 'none',
        '&.active': {
          color: 'black',
          textDecoration: 'underline',
          fontWeight: 'bold',
        },
      },
    },
  },
}));

function ProductMenu() {
  const classes = useStyles();
  const match = useMatch("/products/:productId/*");

  const basePath = match ? match.pathnameBase : '';

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <NavLink to={basePath} end>
          Giới thiệu về sản phẩm
        </NavLink>
      </li>
      <li>
        <NavLink to={`${basePath}/additional`} end>
          Thông số sản phẩm 
        </NavLink>
      </li>
      <li>
        <NavLink to={`${basePath}/reviews`} end>
          Reviews
        </NavLink>
      </li>
    </Box>
  );
}

export default ProductMenu;
