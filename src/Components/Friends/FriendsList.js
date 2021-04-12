import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import FriendItem from './FriendItem';
import UserCard from '../common/UserCard/UserCard';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: 500,
    }
}))

const FriendsList = ({ friends }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {friends.map(friend => <UserCard 
                isAction={false} 
                key={friend.id} 
                user={friend} 
            />)}
        </div>
    )
}


export default FriendsList;