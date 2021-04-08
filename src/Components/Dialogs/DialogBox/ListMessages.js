import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Message from './Message';


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
        height: 545,
        display: 'flex',
        flexDirection: 'column-reverse',
        paddingBottom: theme.spacing(1)
    }
}))

const ListMessages = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Message 
                text="Привет мир!!! Питон топ, пока ещё не заебал, как кого то js)"
                whoSend="Илья"
            />
            <Message 
                text="Сокеты сосать"
                whoSend="Вова"
            />
            <Message 
                text="Сокеты сосать дплвопв лщлащп щзвлпщза щлпал."
                whoSend="Вова"
            />
        </div>
    )
}


export default ListMessages;