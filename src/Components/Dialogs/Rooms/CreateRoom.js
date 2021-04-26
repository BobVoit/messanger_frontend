import React, { useState, useContext } from 'react';
import { 
    Dialog, 
    Button, 
    DialogContent, 
    DialogTitle, 
    DialogContentText, 
    DialogActions,
    TextField 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WebSocketContext } from '../../WebSocket/WebSocket';
import Snackbar from '../../common/Snackbars/Snackbar'; 

const CreateRoom = ({ open, handleClose }) => {
    const [roomName, setRoomName] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const ws = useContext(WebSocketContext);

    const onChangeRoomName = (e) => setRoomName(e.target.value);
    const handleOpenSnackbar = () => setOpenSnackbar(true);
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const createNewRoom = () => {
        if (roomName) {
            ws.createRoom(roomName);
            handleClose();
        } else {
            handleOpenSnackbar();
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Создание новой комнаты</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    В поле ниже введите название комнтаты
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="room"
                    label="Введите название комнаты"
                    fullWidth
                    onChange={onChangeRoomName}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={createNewRoom} 
                    color="primary"
                    variant="outlined"
                >
                    Создать комнату
                </Button>
            </DialogActions>
            <Snackbar 
                open={openSnackbar}
                handleClose={handleCloseSnackbar}
                message="Название комнаты не может быть пустой строкой"
                severity="warning"
            />
        </Dialog>
    )
}

export default CreateRoom;