import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
 
const useStyles = makeStyles(theme => ({
    root: props => ({
        maxWidth: '40%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1),
        alignSelf: props.isSelf ? 'flex-end' : 'flex-start',
    }),
    whoSend: { 
        marginLeft: theme.spacing(2) 
    },
    text: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        textIndent: theme.spacing(1)
    }
}))


const Message = ({ whoSend, text, isSelf }) => {
    const classes = useStyles({ isSelf });
    return (
        <Paper className={classes.root}>
            <Typography
                display="block"
                variant="subtitle2"
                className={classes.whoSend}
            >{whoSend}</Typography>
            <Typography
                display="block"
                variant="body1"
                className={classes.text}
            >{text}</Typography>
        </Paper>
    )
}


export default Message;