import React, { useState } from 'react'

import { Button, Tooltip, Avatar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';  
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    actions: {
        display: 'flex',

    }
}))

const UpdateAvatar = ({ updateAvatar, avatar, deleteAvatar, saveUserAvatar }) => {

    const onAvatarSelectedForUpdate = (e) => {
        if (e.target.files.length) {
            updateAvatar(e.target.files[0]);
        }
    }

    const onAvatarSelectedForSave = (e) => {
        if (e.target.files.length) {
            saveUserAvatar(e.target.files[0]);
        }
    }

    const classes = useStyles();
    return (
        <>
            <Typography variant="body2">Текущий аватар:</Typography>
            <Tooltip title="Текущий аватар" placement="right">
                <Avatar
                    className={classes.avatar}
                    src={avatar ? avatar : null}
                />
            </Tooltip>
            { !avatar ? <Tooltip title="Установить аватар">
                <IconButton
                    component="label"
                >
                    <CreateIcon />
                    <input 
                    type="file" 
                    hidden 
                    onChange={onAvatarSelectedForSave}
                    />
                </IconButton>
            </Tooltip> : <div className={classes.actions}>
                <Tooltip title="Изменить аватар">
                    <IconButton
                        component="label"
                    >
                        <CreateIcon />
                        <input 
                        type="file" 
                        hidden 
                        onChange={onAvatarSelectedForUpdate}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Удалить аватар"> 
                    <IconButton
                        onClick={deleteAvatar}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Tooltip>
                </div>
            }
        </>
    )
}


export default UpdateAvatar;