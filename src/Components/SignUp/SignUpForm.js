import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Box, Button, Divider, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Input } from '../common/FormControl';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    submitBlock: {
        marginTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        marginTop: theme.spacing(2),
        width: 500
    },
    error: {
        color: theme.palette.error.light
    },
}))


const SignUpForm = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography 
                align="center"
                variant="h3"
                className={classes.title}
            >Регистрация</Typography>
            <Formik
                className={classes.form}
                initialValues={{ 
                    email: '' ,
                    password: '',
                    repeatPassword: '',
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    if (!values.repeatPassword) {
                        errors.repeatPassword = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, {resetForm}) => {
                    resetForm({ 
                        email: '',
                        password: '',
                        repeatPassword: ''
                    });
                }}
            >{({
                values,      
                handleChange,
            }) => (

                <Form className={classes.form}>
                    <ErrorMessage className={classes.error} name="user" component="div" />
                    <Field 
                        className={classes.input}
                        value={values.email} 
                        as={Input} 
                        name="email" 
                        type="email"
                        placeholder="Введите e-mail"
                        onChange={handleChange}
                    />
                    <ErrorMessage className={classes.error} name="email" component="div" />
                    <Field 
                        className={classes.input}
                        value={values.password} 
                        as={Input} 
                        name="password" 
                        type="password"
                        placeholder="Введите пароль"
                        onChange={handleChange}
                    />
                    <ErrorMessage className={classes.error} name="password" component="div" />
                    <Field 
                        className={classes.input}
                        value={values.repeatPassword} 
                        as={Input} 
                        name="repeatPassword" 
                        type="password"
                        placeholder="Введите пароль ещё раз"
                        onChange={handleChange}
                    />
                    <ErrorMessage className={classes.error} name="repeatPassword" component="div" />
                    <Box className={classes.submitBlock}>
                        <Button 
                            size="large"
                            type="submit" 
                            variant="contained"
                            color="primary"
                        >Зарегистрироваться</Button>
                    </Box>
                </Form>

            )}
            </Formik>
            <Link
                className={classes.goToSignIn}
                component={NavLink}
                to="/signin"
                variant="body1"
                color="secondary"
            >Перейти к авторизации</Link>
        </div>
    )
}

export default SignUpForm;