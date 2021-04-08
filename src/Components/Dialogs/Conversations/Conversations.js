import React from 'react';
import PropTypes from 'prop-types';

import { List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ConversationsItem from './ConversationsItem';
import { userPT } from '../../../propTypes';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',  
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        height: 665,
        position: 'relative'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light,
        height: 50,
        boxShadow: theme.shadows[4],
    },
    title: {
        color: theme.palette.text.white
    },
    list: {
        height: 615,
        overflow: 'auto',
    }
}))

const conversations = [
    { id: 1, avatar: null, nickname: "Ilya", status: "online" },
    { id: 2, avatar: null, nickname: "Misha", status: "offline" },
    { id: 3, avatar: null, nickname: "Anton", status: "offline" },
    { id: 4, avatar: null, nickname: "Roma", status: "online" },
    { id: 5, avatar: null, nickname: "Sergey", status: "online" },
    { id: 6, avatar: null, nickname: "Andrey", status: "online" },
    { id: 7, avatar: null, nickname: "Nikita", status: "online" },
    { id: 8, avatar: null, nickname: "Roma", status: "offline" },
    { id: 9, avatar: null, nickname: "Sergey", status: "online" },
    { id: 10, avatar: null, nickname: "Andrey", status: "offline" },
    { id: 11, avatar: null, nickname: "Nikita", status: "offline" },
    { id: 12, avatar: null, nickname: "Roma", status: "online" },
    { id: 13, avatar: null, nickname: "Sergey", status: "offline" },
    { id: 14, avatar: null, nickname: "Andrey", status: "online" },
    { id: 15, avatar: null, nickname: "Nikita", status: "offline" },
];

const Conversations = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography
                    className={classes.title}
                    display="block"
                    variant="h5"
                >Пользователи</Typography>
            </div>
            <List 
                component="ul"
                dense
                className={classes.list}
            >
                {conversations.map(user => <ConversationsItem key={user.id} user={user} />)}
            </List>
        </div>
    )
}

Conversations.propTypes = {
    users: PropTypes.arrayOf(userPT)
}


export default Conversations;
