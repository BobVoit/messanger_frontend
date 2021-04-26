import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

const SnackbarElement = ({ open, handleClose, message, duration, severity }) => {
    return (
        <Snackbar 
            open={open}
            autoHideDuration={duration || 3000} 
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={ severity ? severity : "success"}>
                {message}
            </Alert>
        </Snackbar> 
    )
}

SnackbarElement.propTypes = {
    severity: PropTypes.oneOf(["success", "warning", "error", "info"]),
    handleClose: PropTypes.func,
    message: PropTypes.string,
    duration: PropTypes.number,
    open: PropTypes.bool
}

export default SnackbarElement;