import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    List, 
    Typography,
    Button 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConversationsItem from './ConversationsItem';
import CreateRoom from '../Rooms/CreateRoom';
import RoomItem from '../Rooms/RoomItem';
import { userPT } from '../../../propTypes';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',  
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        minHeight: 665,
        maxHeight: 665,
        position: 'relative',
        paddingBottom: theme.spacing(0.5),
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light,
        height: 50,
        boxShadow: theme.shadows[4],
    },
    title: {
        color: theme.palette.text.white
    },
    list: {
        height: 584,
        overflow: 'auto',
    },
    creteRoom: {
        borderRadius: 0,
        boxShadow: theme.shadows[4]
    }
}))

const Conversations = ({ activeUsers, selectCompanion, 
    selectedCompanionId, rooms, selectRoom }) => {
    const classes = useStyles();
    const [openCreateRoom, setOpenCreateRoom] = useState(false);


    const openDialogCreateRoom = () => setOpenCreateRoom(true);
    const closeDialogCreateRoom = () => setOpenCreateRoom(false);

    const unionAndRenderConversationsAndRooms = () => {
        return rooms.concat(activeUsers).map((element, index) => ({
            ...element,
            idSelect: index
        })).map(element => element.login ? <ConversationsItem 
            isSelect={selectedCompanionId === element.idSelect}
            key={element.id} 
            user={element} 
            selectCompanion={selectCompanion}
        /> :  <RoomItem 
            isSelect={selectedCompanionId === element.idSelect}
            key={element.id}
            room={element}
            selectRoom={selectRoom}
        />);
    }

    console.log(rooms.concat(activeUsers).map((element, index) => ({
        ...element,
        idSelect: index
    })));
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography
                    className={classes.title}
                    display="block"
                    variant="h5"
                >Пользователи</Typography>
            </div>
            <List 
                component="ul"
                dense
                className={classes.list}
            >
                {unionAndRenderConversationsAndRooms()}
                {/* {rooms.map(room => <RoomItem 
                    key={room.id}
                    room={room}
                    // selectCompanion={selectCompanion}
                />)}
                {activeUsers.map(user => <ConversationsItem 
                    isSelect={selectedCompanionId === user.id}
                    key={user.id} 
                    user={user} 
                    selectCompanion={selectCompanion}
                />)} */}
            </List>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.creteRoom}
                size="small"
                onClick={openDialogCreateRoom}
            >Создать комнату</Button>
            <CreateRoom 
                open={openCreateRoom}
                handleClose={closeDialogCreateRoom}
            /> 
        </div>
    )
}

Conversations.propTypes = {
    users: PropTypes.arrayOf(userPT)
}


export default Conversations;
