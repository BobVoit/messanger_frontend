import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

import { TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

import { WebSocketContext } from '../../WebSocket/WebSocket';


const useStyles = makeStyles((theme) => ({
    form: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),   
        display: 'flex', 
    },
    field: {
        marginRight: theme.spacing(2),
        flexGrow: 1
    },
    submit: {
        flexGrow: 0
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
    message: yup 
        .string("Введите ваше сообщение")
        .required("Поле пустое"),

})


const MessageForm = ({  }) => {
    const classes = useStyles();
    const ws = useContext(WebSocketContext);

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { message } = values;
            ws.sendMessage("Илья", message);
            formik.resetForm({
                values: {
                    message: ''
                }
            })
        }
    });

    return (
        <form 
            onSubmit={formik.handleSubmit}
            className={classes.form}
        >
            <TextField
                fullWidth
                variant="outlined"
                multiline
                id="message"
                name="message"
                label="Введите ваше сообщение..."
                className={classes.field}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
            />
            <IconButton 
                color="primary"
                type="submit"
                className={classes.submit}
            >
                <SendIcon />
            </IconButton>
        </form>
    )
}

export default MessageForm;