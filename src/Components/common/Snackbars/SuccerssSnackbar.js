import React from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

const SuccerssSnackbar = ({ open, handleClose, message, duration }) => {
    return (
        <Snackbar 
            open={open}
            autoHideDuration={duration || 3000} 
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar> 
    )
}


export default SuccerssSnackbar;