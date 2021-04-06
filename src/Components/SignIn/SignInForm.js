import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import TitleTemplate from '../common/TitleTemplate/TitleTemplate';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15)
    },
    form: {
        maxWidth: 500,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: theme.spacing(5)
    },
    field: {
        marginBottom: theme.spacing(3)
    },
    submit: {
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    error: {
        color: theme.palette.error.main,
        textAlign: 'center',
        marginTop: theme.spacing(3)
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    }
}))


const validationSchema = yup.object({
    login: yup 
        .string("Введите логин")
        .min(6, "Длина логина должна составлять не менее 6 символов")
        .max(20, "Длина логина должна составлять не более 20 символов")
        .required("Поле пустое"),
    password: yup
        .string("Введите пароль")
        .min(6, "Длина пароля должна составлять не менее 6 символов")
        .max(20, "Длина пароля должна составлять не более 20 символов")
        .required("Поле пустое"),
})


const SignInForm = ({ loginUser }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { login, password } = values;
            loginUser(login, password);
            formik.resetForm({
                values: {
                    login: '',
                    password: '',
                }
            })
        }
    });

    return (
        <div className={classes.root}>
            <TitleTemplate 
                title="Авторизация"
                icon={<LockOutlinedIcon 
                    color="secondary"
                    className={classes.titleIcon}
                />}
            />
            <form 
                onSubmit={formik.handleSubmit}
                className={classes.form}
            >
            <TextField
                fullWidth
                variant="outlined"
                id="login"
                name="login"
                label="Логин"
                className={classes.field}
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
                fullWidth
                variant="outlined"
                id="password"
                name="password"
                label="Password"
                type="password"
                className={classes.field}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button 
                color="primary" 
                variant="contained" 
                type="submit"
                className={classes.submit}
                size="large"
            >
                Войти
            </Button>
            </form>
        </div>
    )
}

export default SignInForm;