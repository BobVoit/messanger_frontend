import React from 'react';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: theme.palette.primary.light,
        boxShadow: theme.shadows[4],
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(0.5),
    },
    title: {
        marginLeft: theme.spacing(0.5),
        color: theme.palette.text.white
    },
    iconBack: {
        color: '#fff'
    }
}))

const DialogHeader = ({ currentCompanion, removeSelectedCompanion }) => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <IconButton
                onClick={removeSelectedCompanion}
            >
                <ArrowBackIcon 
                    className={classes.iconBack}
                />
            </IconButton>
            <div className={classes.info}>
                <Avatar 
                    src={currentCompanion.avatar}
                    className={classes.avatar}
                />
                <Typography 
                    variant="body1"
                    display="block"
                    className={classes.title}
                >{currentCompanion.title}</Typography>
            </div>
            <div />
        </div>
    )
}

export default DialogHeader;