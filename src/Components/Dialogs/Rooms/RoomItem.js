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

const RoomItem = ({ room, isSelect, selectRoom }) => {
    const classes = useStyles();
    const selectCurrentRoom = () => selectRoom(room);
    console.log(isSelect);
    return (
        <ListItem
            selected={isSelect}
            className={classes.root}
            button
            onClick={selectCurrentRoom}
            component="li"
        >
            <ListItemText 
                primary={room.title}
                secondary={"Комната"}
            />
        </ListItem>
    )
}

export default RoomItem;