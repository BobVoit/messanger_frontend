import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import ListMessages from './ListMessages';
import MessageForm from './MessageForm';
import DialogHeader from './DialogHeader';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 665,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        paddingBottom: theme.spacing(0.5),
    },
}))


const DialogBox = ({ messages, currentCompanion, selectedCompanionId,
     selfId, removeSelectedCompanion }) => {
    const classes = useStyles();

    if (selectedCompanionId === -1) {
        return <div className={classes.root}></div>
    }

    console.log(currentCompanion);
    return (
        <div className={classes.root}>
            <DialogHeader 
                currentCompanion={currentCompanion}
                removeSelectedCompanion={removeSelectedCompanion}
            />
            <ListMessages 
                messages={messages}
                selfId={selfId}
                currentCompanion={currentCompanion}
            />
            <MessageForm 
                selfId={selfId}
                currentCompanion={currentCompanion}
            />
        </div>
    )
}

export default DialogBox;
