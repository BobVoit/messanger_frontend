import React from 'react';

import { List } from '@material-ui/core';

import ItemNavigation from './ItemNavigation';


const ListNavigation = ({ navigationLinks, handleDrawerClose }) => {


    return (
        <List component="nav">
            {navigationLinks.map((item, index) => <ItemNavigation 
                handleDrawerClose={handleDrawerClose} 
                key={index} 
                data={item} 
            />)}
        </List>
    )
}


export default ListNavigation;