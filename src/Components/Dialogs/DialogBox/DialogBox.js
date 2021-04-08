import React from 'react'

import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ListMessages from './ListMessages';
import MessageForm from './MessageForm';


const useStyles = makeStyles((theme) => ({
    root: {
        height: 665,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
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


const messages = [
    { user: "Egor", text: "Как твое дела?" },
    { user: "Egor", text: "Как твое дела?" },
    { user: "Egor", text: "Как твое дела?" },
    { user: "Egor", text: "Как твое дела?" },
    { user: "Egor", text: "Как твое дела?" },
    { user: "Egor", text: "Как твое дела?" },
    { user: "Egor", text: "Как твое дела?" },
];

const DialogBox = ({ companionAvatar, companionUser }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Avatar 
                    className={classes.avatar}
                />
                <Typography 
                    variant="body1"
                    display="block"
                    className={classes.nickname}
                >Nickname</Typography>
            </div>
            <ListMessages 
                messages={messages}
            />
            <MessageForm 
                blockHeight={2}
            />
        </div>
    )
}

export default DialogBox;
