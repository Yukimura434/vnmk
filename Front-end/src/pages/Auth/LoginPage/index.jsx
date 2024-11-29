import React, { useState } from "react";
import "./style.css";
import { login, register } from "../userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema, registerSchema } from '../validationSchema'
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isSwitch, setIsSwitch] = useState(false);
    const [formData, setFormData] = useState({ username: '', displayName: '', password: '' });
    const isAdmin = localStorage.getItem('role') || ''

    const changeForm = (e) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
        setIsSwitch(!isSwitch);
    };

    const navigate = useNavigate();


    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
      
    const handleLoginSubmit = async (values, { setSubmitting }) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            
            enqueueSnackbar('Login successfully !!!', { variant: 'success' });
    
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
        } catch (error) {
            const errMessage = error.response?.data?.message || error.message || 'Login failed';
            console.log('Failed to login : ', errMessage);
            enqueueSnackbar(errMessage, { variant: 'error' });
            navigate('/login');
        } finally {
            setSubmitting(false);
        }
    };
    
    const handleRegisterSubmit = async (values, { setSubmitting }) => {
        try {
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            enqueueSnackbar('Registration successfully !!!', { variant: 'success' });
        } catch (error) {
            const errMessage = error.response?.data?.message || error.message || 'Registration failed';
            console.log('Failed to register : ', errMessage);
            enqueueSnackbar(errMessage, { variant: 'error' });
        }
        setSubmitting(false);
    };

    const HandleLoginWithFacebook = () => {
        window.location.href = "http://localhost:5000/api/auth/facebook/login";
    };
    const HandleLoginWithGoogle = () => {
        window.location.href = "http://localhost:5000/api/auth/google/login";
    };

    return (
        <div className="login-page">
            <div className="main-login-page">
                <div className={`a-container ${isSwitch && "is-txl is-z200"}`}>
                    <Formik
                        initialValues={formData}
                        validationSchema={registerSchema}
                        onSubmit={handleRegisterSubmit}
                    >
                        {({ isSubmitting, handleChange, handleBlur }) => (
                            <Form className="form" id="a-form">
                                <h2 className="form_title title">Create Account</h2>
                                <span className="form__span">or use displayName for registration</span>
                                <Field className="form__input" name="username" type="text" placeholder="Name" onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                                <Field className="form__input displayName" name="displayName" type="text" placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="displayName" component="div" className="text-danger" />
                                <Field className="form__input password" name="password" type="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                                <button className="form__button button submit" type="submit" disabled={isSubmitting}>SIGN UP</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className={`b-container ${isSwitch && "is-txl"}`}>
                    <Formik
                        initialValues={formData}
                        validationSchema={loginSchema}
                        onSubmit={handleLoginSubmit}
                    >
                        {({ isSubmitting, handleChange, handleBlur }) => (
                            <Form className="form">
                                <h2 className="form_title title">Sign in to Website</h2>
                                <div className="form__icons">
                                    <div className="form__icon">
                                        <box-icon name='facebook-square' type='logo' onClick={HandleLoginWithFacebook} ></box-icon>
                                        <box-icon ></box-icon>
                                    </div>
                                    <div className="form__icon">
                                        <box-icon name='google' type='logo' onClick={HandleLoginWithGoogle}></box-icon>
                                    </div>
                                </div>
                                <span className="form__span">or use your displayName account</span>
                                <Field className="form__input" name="username" type="text" placeholder="Display Name" onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                                <Field className="form__input" name="password" type="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                                <a href="/forgotPassword" className="form__link">Forgot your password?</a>
                                <button className="form__button button submit" type="submit" disabled={isSubmitting}>SIGN IN</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className={isSwitch ? "switch is-gx is-txr" : "switch"} id="switch-cnt">
                    <div className={`switch__circle ${isSwitch && "is-txr"}`}></div>
                    <div className={`switch__circle switch__circle--t ${isSwitch && "is-txr"}`}></div>
                    <div className={`switch__container ${isSwitch && "is-hidden"}`} id="switch-c1">
                        <h2 className="switch__title title">Welcome Back !</h2>
                        <p className="switch__description description">To keep connected with us please login with your personal info</p>
                        <button onClick={changeForm} className="switch__button button switch-btn">SIGN UP</button>
                    </div>
                    <div className={`switch__container ${!isSwitch && "is-hidden"}`} id="switch-c2">
                        <h2 className="switch__title title">Hello Friend !</h2>
                        <p className="switch__description description">Enter your personal details and start journey with us</p>
                        <button onClick={changeForm} className="switch__button button switch-btn">SIGN IN</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
