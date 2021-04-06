import React, { useState } from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

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
    nickname: yup 
        .string("Введите логин")
        .min(2, "Длина логина должна составлять не менее 2 символов")
        .max(20, "Длина логина должна составлять не более 20 символов")
        .required("Поле пустое"),
    password: yup
        .string("Введите пароль")
        .min(8, "Длина пароля должна составлять не менее 8 символов")
        .max(20, "Длина пароля должна составлять не более 20 символов")
        .required("Поле пустое"),
    confirmPassword: yup
        .string("Повторите пароль")
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
        .required("Поле пустое"),
})


const SignUpForm = ({ registration }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            login: '',
            nickname: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values.login, values.nickname, values.password, values.confirmPassword);
            registration(values.login, values.nickname, values.password)
            formik.resetForm({
                values: {
                    login: '',
                    nickname: '',
                    password: '',
                    confirmPassword: '',
                }
            })
        }
    });

    return (
        <div className={classes.root}>
            <TitleTemplate 
                title="Авторизация"
                icon={<AccessibilityIcon 
                    color="secondary"
                    className={classes.titleIcon}
                />}
            />
            <div className={classes.titleWrapper}>
                <Typography
                    align="center"
                    gutterBottom
                    noWrap
                    variant="h3"
                    component="h2"
                >Регистрация</Typography>
            </div>
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
                    id="nickname"
                    name="nickname"
                    label="Имя"
                    className={classes.field}
                    value={formik.values.nickname}
                    onChange={formik.handleChange}
                    error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                    helperText={formik.touched.nickname && formik.errors.nickname}
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
                <TextField
                    fullWidth
                    variant="outlined"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Повторите пароль"
                    type="password"
                    className={classes.field}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit"
                    className={classes.submit}
                    size="large"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;