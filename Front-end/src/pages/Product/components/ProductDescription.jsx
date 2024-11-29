import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import productsApi from '../../../api/productApi';

ProductDescription.propTypes = {
    product: PropTypes.object,
}

function ProductDescription({product}) {
  const [data,setData] = useState({})
  const params = useParams();
  const id = params.productId;
  useEffect(()=>{
    ( async () => {
      try {
        const data = await productsApi.get(id)
        setData(data)
      } catch (error) {
        
      }
  })()
  },[id])
    const safeDescription = DOMPurify.sanitize(data?.descriptionFull)
  return (
    <Paper elevation={0} style={{
        padding: '15px',
    }}>
        {data.descriptionFull ? (
        <div dangerouslySetInnerHTML={{ __html: data.descriptionFull }} />
      ) : (
        <div>Mô tả chi tiết đang cập nhật....</div>
      )}
    </Paper>  
  )
}


export default ProductDescription
