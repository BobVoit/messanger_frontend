import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Message from './Message';


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
        height: 545,
        display: 'flex',
        flexDirection: 'column-reverse',
        paddingBottom: theme.spacing(1)
    },
    messages: {
        display: 'flex',
        flexDirection: 'column',
    }
}))

const ListMessages = ({ messages, selfId, currentCompanion }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                {messages.map( message => <Message 
                    key={message.id}
                    isSelf={selfId === message.fromId}
                    text={message.text}
                    whoSend={selfId === message.fromId ? "Вы" : currentCompanion.nickname}
                />)}
            </div>
        </div>
    )
}


export default ListMessages;