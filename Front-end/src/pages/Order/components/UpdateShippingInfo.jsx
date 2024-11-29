import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import orderApi from '../../../api/ordersApi';
import userApi from '../../../api/userApi';

const validationSchema = Yup.object().shape({
    receiver: Yup.string().required('Vui lòng nhập tên người nhận'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    addressDetail: Yup.string().required('Vui lòng nhập chi tiết địa chỉ'),
});

function UpdateShippingInfo({ shippingInfo, setShippingInfo, onClose }) {
    const handleUpdate = async (values) => {
        try {
            const userId = localStorage.getItem('userId');
            const payload = values
            const res = await orderApi.updateShippingInfo(userId,payload)
        } catch (error) {
            
        }
        setShippingInfo(values);
        onClose();
    };

    return (
        <Formik
            initialValues={shippingInfo}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Tên người nhận"
                            name="receiver"
                            value={values.receiver}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                        />
                        <TextField
                            label="Số điện thoại"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                        />
                        <TextField
                            label="Địa chỉ"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                        />
                        <TextField
                            label="Chi tiết địa chỉ"
                            name="addressDetail"
                            value={values.addressDetail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="black" style={{borderRadius:'0px'}}>
                            Cập nhật
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

UpdateShippingInfo.propTypes = {
    shippingInfo: PropTypes.object.isRequired,
    setShippingInfo: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UpdateShippingInfo;
