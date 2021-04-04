import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    titleBlock: {
        marginBottom: theme.spacing(5)
    },
    titleIconWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}))


const TitleTemplate = ({ icon, title }) => {
    const classes = useStyles();
    return (
        <div className={classes.titleBlock}>
            <div className={classes.titleIconWrapper}>
                {icon}
            </div>
            <Typography 
                variant="h4"
                align="center"
                className={classes.titleBlock}
            >{title}</Typography>
        </div>
    )
}

export default TitleTemplate;