import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

function Product(props) {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path=":productId" element={<DetailPage />} />
    </Routes>
  );
}

export default Product;
