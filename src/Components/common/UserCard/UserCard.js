import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography, Tooltip, IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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

const UserCard = ({ user, isAction, actionText }) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.root}
        >
            <div className={classes.avatarWrapper}>
                {/* <NavLink> */}
                    <Avatar 
                        className={classes.avatar}
                        src={user.avatar || null}
                        component={NavLink}
                        to={`/profile/${user.id}`}
                    />
                {/* </NavLink> */}
            </div>
            <div className={classes.infoWrapper}>
                <Typography>{user.nickname}</Typography>
            </div>
            {isAction && <div className={classes.actionWrapper}>
                {actionText ? (
                    <Tooltip title={actionText}>
                        <IconButton
                            color="primary"
                        >
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <IconButton
                        color="primary"
                    >
                        <AddIcon fontSize="large" />
                    </IconButton>
                )
                }
            </div>}

        </Paper>

    )
}

export default UserCard;