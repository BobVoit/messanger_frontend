import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';


const ItemNavigation = ({ data }) => {
    const { title, icon, link } = data;

    // const redirect = () => {
    //     console.log(link);
    //     return <Redirect to={link} />
    // }

    return (
        <ListItem 
            component={NavLink}
            to={link}
            button
            divider
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText  primary={title} />
        </ListItem>
    )
}


export default ItemNavigation;