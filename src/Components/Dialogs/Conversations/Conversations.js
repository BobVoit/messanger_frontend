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
        minHeight: 665,
        position: 'relative',
        paddingBottom: theme.spacing(0.5),
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

const Conversations = ({ activeUsers, selectCompanion, selectedCompanionId }) => {
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
                {activeUsers.map(user => <ConversationsItem 
                    isSelect={selectedCompanionId === user.id}
                    key={user.id} 
                    user={user} 
                    selectCompanion={selectCompanion}
                />)}
            </List>
        </div>
    )
}

Conversations.propTypes = {
    users: PropTypes.arrayOf(userPT)
}


export default Conversations;
