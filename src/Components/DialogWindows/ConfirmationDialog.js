import React from 'react';


import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';


const ConfirmationDialog = ({ open, handleClose, title, textContent, actionFunc }) => {

    return (
        <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">{textContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleClose}
                >Нет</Button>
                <Button
                    color="primary"
                    onClick={actionFunc}
                >Да</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;