import React from 'react'

import { Button, Tooltip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';  

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2)
    },
}))

const UpdateAvatar = ({ onAvatarSelected, avatar }) => {
    const classes = useStyles();
    return (
        <>
            <Tooltip title="Текущий аватар" placement="right">
                <Avatar
                    className={classes.avatar}
                    src={avatar ? avatar : null}
                />
            </Tooltip>
            <Button
                component="label"
            >
                Изменить аватар
                <input 
                  type="file" 
                  hidden 
                  onChange={onAvatarSelected}
                />
            </Button>
        </>
    )
}


export default UpdateAvatar;