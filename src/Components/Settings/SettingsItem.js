import React from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';  

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}))

const SettingsItem = ({ id, icon, title, isCurrent, selectItem }) => {
    const classes = useStyles();

    return (
        <ListItem 
            button
            className={classes.root}
            selected={isCurrent}
            onClick={ () => selectItem(id) }
        >   
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItem>
    )
}

export default SettingsItem;