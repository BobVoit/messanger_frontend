import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';   
import { AppBar, Container, Toolbar, Button, Box, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';	
import { connect } from 'react-redux';

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
    logoutAndProfile: {
        display: 'flex',
        alignItems: 'center'
    },
    logout: {
        marginLeft: theme.spacing(1)
    }
}))

const Header = ({ handleDrawerOpen, openDrawer, isAuth, nickname }) => {
    console.log(isAuth, nickname);
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
                    {isAuth &&
                    <IconButton
                        edges="start"
                        color="inherit"
                        aria-label="menu"
                        className={clsx(classes.menuButton, openDrawer && classes.hide)}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                }
                    <Typography 
                        variant="h6" 
                        className={classes.title}
                    >YourMsgs</Typography>
                    {isAuth ? 
                        <Box className={classes.logoutAndProfile}>
                            <Typography
                                variant="subtitle1"
                                color="inherit"
                            >{nickname}</Typography>
                            <Button
                                className={classes.logout}
                                color="inherit"
                                variant="outlined"
                            >Выйти</Button>
                        </Box>
                    :
                    <>
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
                    </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
    nickname: state.auth.nickname,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps)(Header);