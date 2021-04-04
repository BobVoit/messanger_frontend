import React from 'react';

import { List } from '@material-ui/core';

import ItemNavigation from './ItemNavigation';


const ListNavigation = ({ navigationLinks }) => {


    return (
        <List component="nav">
            {navigationLinks.map((item, index) => <ItemNavigation key={index} data={item} />)}
        </List>
    )
}


export default ListNavigation;