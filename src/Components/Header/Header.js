import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';   
import { AppBar, Container, Toolbar, Button, Box, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';	

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${300}px)`,
        marginLeft: 300,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    },
    login: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none',
    },
}))

const Header = ({ handleDrawerOpen, openDrawer }) => {
    const classes = useStyles();
    return (
        <AppBar 
            position="fixed" 
            className={clsx(classes.appBar, {
                [classes.appBarShift]: openDrawer,
          })}
        >
            <Container fixed>
                <Toolbar>
                    <IconButton
                        edges="start"
                        color="inherit"
                        aria-label="menu"
                        className={clsx(classes.menuButton, openDrawer && classes.hide)}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        className={classes.title}
                    >YourMsgs</Typography>
                    <Box className={classes.login}>
                        <Button
                            component={NavLink}
                            to='/signin' 
                            color="inherit" 
                            variant="outlined"
                        >Войти</Button>
                    </Box>
                    <Button 
                        component={NavLink}
                        to='/signup'
                        color="secondary" 
                        variant="contained"
                    >Регистрация</Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


export default Header;