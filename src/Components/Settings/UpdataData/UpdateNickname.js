import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';  


const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        marginTop: theme.spacing(2)
    }
}))

const validationSchema = yup.object({
    nickname: yup 
        .string("Введите никнейм")
        .min(2, "Длина логина должна составлять не менее 6 символов")
        .max(20, "Длина логина должна составлять не более 20 символов")
        .required("Поле пустое"),
})

const UpdateNickname = ({ updateNickname, nickname }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            nickname: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { nickname } = values;
            updateNickname(nickname);
            formik.resetForm({
                values: {
                    nickname: ''
                }
            })
        }
    });

    return (
        <>
            <Typography variant="body2">Текущее имя:</Typography>
            <Typography variant="h6">{nickname}</Typography>
            <form 
                className={classes.form}
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    id="nickname"
                    name="nickname"
                    label="Изменить имя"
                    value={formik.values.nickname}
                    onChange={formik.handleChange}
                    error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                    helperText={formik.touched.nickname && formik.errors.nickname}
                />
                <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit"
                    className={classes.submit}
                    size="large"
                >
                    Изменить
                </Button>
            </form>
        </>
    )
}


export default UpdateNickname;