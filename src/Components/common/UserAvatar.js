import React from 'react';

import { Avatar, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

const UserAvatar = ({ status, avatar, avatarClasses, nickname, ...props }) => {

    return (
        <>
            {status === "online" ? <StyledBadge
                anchorOrigin={
                    { vertical: 'bottom', horizontal: 'right',}
                }
                overlap="circle"
                variant="dot"
            >
                <Avatar 
                    src={avatar}
                    className={avatarClasses}
                    alt={`${nickname} аватар`}
                    {...props}
                />
            </StyledBadge> :
            // if status == offline or is null
            <Avatar 
                src={avatar}
                className={avatarClasses}
                alt={`${nickname} аватар`}
                {...props}
            />
            }
        </>
    )
}

export default UserAvatar;