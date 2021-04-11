import React from 'react'

import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UserItem from './UserItem';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
}))

const ListUsers = ({ users }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {users.map(user => <UserItem key={user.id} user={user} />)}
        </div>
    )
}


export default ListUsers;