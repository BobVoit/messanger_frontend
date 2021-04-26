import React from 'react';

import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userPT } from '../../../propTypes';
import UserAvatar from '../../common/UserAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.secondary.light,
    }
}))

const ConversationsItem = ({ user, selectCompanion, isSelect }) => {
    const classes = useStyles();
    const selectCurrentUser = () => {
      selectCompanion(user);
    }
    return (
        <ListItem
            className={classes.root}
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