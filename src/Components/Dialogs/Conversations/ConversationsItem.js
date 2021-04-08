import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemAvatar, Avatar, ListItemText, Badge } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { userPT } from '../../../propTypes';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({

}))

const ConversationsItem = ({ user }) => {
    const classes = useStyles();
    return (
        <ListItem
            button
        >
            <ListItemAvatar>
                {user.status == "online" ? <StyledBadge
                    anchorOrigin={
                        { vertical: 'bottom', horizontal: 'right',}
                    }
                    overlap="circle"
                    variant="dot"
                >
                    <Avatar 
                        src={user.avatar}
                        alt={`${user.nickname} аватар`}
                    />
                </StyledBadge> :
                // if status == offline or is null
                <Avatar 
                    src={user.avatar}
                    alt={`${user.nickname} аватар`}
                />
                } 
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