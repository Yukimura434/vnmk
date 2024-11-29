
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import TypeItem from './components/TypeItem';
import menuApi from '../../../../api/menuApi';

function ProductType({ onChange }) {
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await menuApi.getType();                

                const filteredTypeList = data.filter(
                    (item) => item.categoryId === '6749e62a24417ea8e0551c31',
                );
                setTypeList(filteredTypeList);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        })();
    }, []);

    return (
        <Box style={{ marginBottom: '30px' }}>
            <Typography
                variant='h4'
                style={{ fontFamily: 'monospace', fontWeight: '400' }}
            >
                Kiểu dáng 
            </Typography>
            <Box style={{ display: 'flex', flexWrap: 'no-wrap', width: '80%', height: '150px' }}>
                {typeList.map((type) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={type._id}
                        style={{ boxShadow: 'none', borderRadius: '0px', margin: '10px' }} // Apply inline styles here
                    >
                        <Box style={{ borderRadius: '0px', padding: '10px', backgroundColor: '' }}>
                            <TypeItem data={type} onChange={onChange} />
                        </Box>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
}

ProductType.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ProductType;
