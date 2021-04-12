import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography, Tooltip, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        cursor: 'pointer'
    },
    avatarWrapper: {
        padding: theme.spacing(2) 
    },
    avatar: {
        height: theme.spacing(8),
        width: theme.spacing(8),
    },
    infoWrapper: {
        flexBasis: '70%'
    },
    actionWrapper: {
        flexBasis: '10%'
    },
    nickname: {
    }
}))

const FriendItem = ({ friend }) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.root}
        >
            <div className={classes.avatarWrapper}>
                <Avatar 
                    className={classes.avatar}
                    src={friend.avatar || null}
                />
            </div>
            <div className={classes.infoWrapper}>
                <Typography className={classes.nickname} >{friend.nickname}</Typography>
            </div>
        </Paper>

    )
}

export default FriendItem;