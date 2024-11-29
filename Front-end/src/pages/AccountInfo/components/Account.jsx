import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
    useTheme,
} from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import userApi from '../../../api/userApi';
import { logout, update } from '../../Auth/userSlice';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    name: {
        width: '250px',
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
    input: {
        flex: 1,
    },
    button: {
        // marginTop: theme.spacing(3),
        justifyContent: 'center',
        textAlign: 'center',
        width: '200px',
    },
    wrapperButton:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        backgroundColor: '#fdfdfd',
    },
}));

const validationSchema = Yup.object().shape({
    //
});

function Account() {
    const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        displayName: '',
        address:'',
        addressDetail:'',
        contactPhone: '',
    });
    const theme = useTheme();

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const currentUser = useSelector((state) => state.user);

    useEffect(() => {
        if (!userId) {
            setError('No user ID found in local storage');
            return;
        }
        (async () => {
            try {
                const userData = await userApi.getInfo(userId);
                setFormData(userData);
            } catch (error) {
                setError('Failed to fetch account info');
            }
        })();
    }, [userId]);

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
        navigate('/');
    };

    const handleUpdateUser = async (values, { setSubmitting }) => {
        try {
            const action = update ({ id: userId, ...values });
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            enqueueSnackbar('Update successfully !!!', { variant: 'success' });
            navigate('/products');
        } catch (error) {
            enqueueSnackbar('Update successfully !!!', { variant: 'success' });
        }
        setSubmitting(false);
    };

    return (
        <Box className={classes.root}>
            <Container style={{ }}>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid className={classes.container}>
                        {error && <Typography color='error'>{error}</Typography>}
                        {formData.profileImage && (
                            <img
                                src={formData.profileImage}
                                alt='Profile'
                                className={classes.profileImage}
                            />
                        )}
                        <Formik
                            initialValues={formData}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleUpdateUser}
                        >
                            {({ handleChange, handleBlur }) => (
                                <Form className={classes.wrapper}>
                                    <Form className={classes.wrapper}>
                                        <Box className={classes.item}>
                                            <Typography className={classes.name}>
                                                Tên hiển thị
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='displayName'
                                                className={classes.input}
                                                variant='outlined'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>
                                        <Box className={classes.item}>
                                            <Typography className={classes.name}>Địa chỉ (Phường/Quận/Thành Phố) </Typography>
                                            <Field
                                                as={TextField}
                                                name='address'
                                                className={classes.input}
                                                variant='outlined'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>
                                        <Box className={classes.item}>
                                            <Typography className={classes.name}>
                                                Số nhà , tên đường
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='addressDetail'
                                                className={classes.input}
                                                variant='outlined'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>
                                        <Box className={classes.item}>
                                            <Typography className={classes.name}>
                                                Số điện thoại
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='contactPhone'
                                                className={classes.input}
                                                variant='outlined'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>
                                    </Form>
                                    <Box className={classes.wrapperButton}>
                                    <Button
                                        className={classes.button}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        style={{ 
                                          marginRight: '10px', 
                                          background: 'black' ,
                                          borderRadius: '0px' ,
                                          fontFamily: 'monospace',
                                      }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant='contained'
                                        color='secondary'
                                        onClick={handleLogout}
                                        style={{
                                          marginRight: '10px',
                                          background: 'white',
                                          color: 'black',
                                          border: '1px solid black',
                                          fontWeight: 'bold',
                                          borderRadius: '0px' ,
                                          fontFamily: 'monospace',
                                      }}
                                    >
                                        Logout
                                    </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default Account;