import React from 'react';

import ListNavigation from './ListNavigation';

import { makeStyles, useTheme  } from '@material-ui/core/styles';  
import { Drawer, IconButton, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 300,
        flexShrink: 0,
      },
      drawerPaper: {
        width: 300,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -300,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
}))

const MenuNavigarion = ({ handleDrawerClose, drawerOpen, navigationLinks }) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                    ) : (
                    <ChevronRightIcon />
                    )}
                </IconButton>
            </div>
            <Divider />

            <ListNavigation
                navigationLinks={navigationLinks}
            />
            
        </Drawer> 
    )
}

export default MenuNavigarion;