import React from 'react';

import { ListItem, ListItemAvatar, Avatar, ListItemText, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { userPT } from '../../../propTypes';
import UserAvatar from '../../common/UserAvatar';


const ConversationsItem = ({ user, selectCompanion, isSelect }) => {

    const selectCurrentUser = () => {
      selectCompanion(user);
    }

    return (
        <ListItem
            button
            onClick={selectCurrentUser}
            selected={isSelect}
        >
            <ListItemAvatar>
                <UserAvatar 
                  status={user.status}
                  avatar={user.avatar}
                  nickname={user.nickname}
                />
            </ListItemAvatar>
            <ListItemText 
                primary={user.nickname}
            />
        </ListItem>
    )
}

ConversationsItem.propTypes = {
    user: userPT
}

export default ConversationsItem;