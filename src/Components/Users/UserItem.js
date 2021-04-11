import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography, Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
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
    }
}))

const UserItem = ({ user }) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.root}
        >
            <div className={classes.avatarWrapper}>
                <Avatar 
                    className={classes.avatar}
                    src={user.avatar || null}
                />
            </div>
            <div className={classes.infoWrapper}>
                <Typography>{user.nickname}</Typography>
            </div>
            <div className={classes.actionWrapper}>
                <Tooltip title="Добавить в друзья">
                    <IconButton
                        color="primary"
                    >
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </div>

        </Paper>

    )
}

export default UserItem;