import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.primary.light,
    }
}))

const RoomItem = ({ room }) => {
    const classes = useStyles();
    return (
        <ListItem
            className={classes.root}
            button
            component="li"
            // onClick={} выбор комнаты написать нужно 
            // selected={isSelect}
        >
            <ListItemText 
                primary={room.title}
                secondary={"Комната"}
            />
        </ListItem>
    )
}

export default RoomItem;