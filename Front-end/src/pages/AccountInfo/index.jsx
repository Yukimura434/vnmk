import {
    Box,
    Container,
    Grid,
    makeStyles,
    Paper,
    useTheme
} from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import { logout, update } from '../Auth/userSlice';
import Account from './components/Account';
import AccountAdditional from './components/AccountAdditional';
import AccountMenu from './components/AccountMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(3, 0),
        // backgroundColor: '#f9f9f9',
        // marginTop: '00px',
    },
    container: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    title: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: theme.spacing(3),
        // fontFamily: 'Alumni Sans',
        fontFamily: 'monospace',
    },
    profileImage: {
        display: 'block',
        margin: '0 auto',
        borderRadius: '50%',
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        marginBottom: theme.spacing(3),
    },
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
        fontFamily: 'monospace',
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
    wrapperButton: {
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

function AccountInfo() {
    const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        birthday: '',
        Gender: '',
        password: '',
        profileImage: '',
        contactPhone: '',
    });
    const theme = useTheme();

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const currentUser = useSelector((state) => state.user);

    const location = useLocation();
    const url = location.pathname;

    // Lấy thông tin user
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
            const action = update({ id: userId, ...values });
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            enqueueSnackbar('Update successfully !!!', { variant: 'success' });
            navigate('/products');
        } catch (error) {
            // const errMessage = error.response?.data?.message || error.message || 'Update failed';
            // enqueueSnackbar("Update user không thành công", { variant: 'error' });
            enqueueSnackbar('Update successfully !!!', { variant: 'success' });
        }
        setSubmitting(false);
    };

    return (
        <Box className={classes.root}>
            <Container style={{ marginTop: '120px', width: '1072px' }}>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid className={classes.container}>
                        <Box className={classes.productMenu}>
                            <AccountMenu />
                        </Box>
                        <Routes>
                            <Route
                                path={url}
                                element={<Account />}
                            />
                            <Route
                                path={`${url}/additional`}
                                element={<AccountAdditional />}
                            />
                        </Routes>
                        <Outlet />
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default AccountInfo;
