import { CardMedia, Dialog, DialogContent, makeStyles, Typography, IconButton} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}))

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });


const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})


const DisplayImageWindow = ({ handleClose, nickname, avatar, open}) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            aria-labelledby="avatar-dialog"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id="avatar-dialog" onClose={handleClose}>Аватар {nickname}</DialogTitle>
            <DialogContent>
                <CardMedia image={avatar} title="avatar" className={classes.media} />
            </DialogContent>
        </Dialog>
    )
}


export default DisplayImageWindow;