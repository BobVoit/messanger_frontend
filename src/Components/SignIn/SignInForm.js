import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Input } from '../common/FormControl';

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
        width: 500,
    },
    error: {
        color: theme.palette.error.light
    },
    goToSignIn: {
        cursor: 'pointer'
    }
}))


const SignInForm = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography 
                align="center"
                variant="h3"
                className={classes.title}
            >Авторизация</Typography>
            <Formik
                className={classes.form}
                initialValues={{ 
                    login: '' ,
                    password: '',
                }}
                validate={values => {
                    const errors = {};
                    if (!values.login) {
                        errors.login = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, {resetForm}) => {
                    resetForm({ 
                        login: '',
                        password: '',
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
                        value={values.login} 
                        as={Input} 
                        name="email" 
                        type="email"
                        placeholder="Введите e-mail"
                        onChange={handleChange}
                    />
                    <Field 
                        className={classes.input}
                        value={values.password} 
                        as={Input} 
                        name="password" 
                        type="password"
                        placeholder="Введите пароль"
                        onChange={handleChange}
                    />
                    <ErrorMessage className={classes.error} name="message" component="div" />
                    <Box className={classes.submitBlock}>
                        <Button 
                            size="large"
                            type="submit" 
                            variant="contained"
                            color="primary"
                        >Войти</Button>
                    </Box>
                </Form>

            )}
            </Formik>
        </div>
    )
}

export default SignInForm;