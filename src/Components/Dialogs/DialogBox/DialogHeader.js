import React from 'react';

import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: theme.palette.primary.light,
        boxShadow: theme.shadows[4],
    },
    avatar: {
        marginRight: theme.spacing(0.5),
    },
    nickname: {
        marginLeft: theme.spacing(0.5),
        color: theme.palette.text.white
    },
}))

const DialogHeader = ({ currentCompanion }) => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <Avatar 
                src={currentCompanion.avatar}
                className={classes.avatar}
            />
            <Typography 
                variant="body1"
                display="block"
                className={classes.nickname}
            >{currentCompanion.nickname}</Typography>
        </div>
    )
}

export default DialogHeader;