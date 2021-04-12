import React from 'react';

import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    preloader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    }
}))

const Preloader = ({ size }) => {
    const classes = useStyles();
    return <CircularProgress
        color="secondary" 
        size={size || 50} 
        className={classes.preloader}
    />;
}

export default Preloader;