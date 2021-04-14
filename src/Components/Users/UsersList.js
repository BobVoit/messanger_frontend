import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import UserItem from './UserItem';
import UserCard from '../common/UserCard/UserCard';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
}))

const ListUsers = ({ users, requestInFriends }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {users.map(user => <UserCard 
                isAction={true} 
                key={user.id} 
                user={user} 
                actionText="Добавить в друзья"
                actionButtonHandleClick={requestInFriends}
                snackbarText={`Заявка в друзья ${user.nickname} отправлена`}
            />)}
        </div>
    )
}


export default ListUsers;