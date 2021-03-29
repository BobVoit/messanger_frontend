import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Provider } from 'react-redux';

import { navigationLinks } from './common';
import store from './redux/store';

import { ThemeProvider } from '@material-ui/styles';
import { Box, CssBaseline } from '@material-ui/core';
import { theme } from './theme/createTheme';
import { withStyles } from '@material-ui/core/styles';

import WebSocketProvider, { WebSocketContext } from './Components/WebSocket/WebSocket';

import Header from './Components/Header/Header';
import MenuNavigarion from './Components/MenuNavigation/MenuNavigarion';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Profile from './Components/Profile/Profile';
import Friends from './Components/Friends/Friends';
import Users from './Components/Users/Users';
import Dialogs from './Components/Dialogs/Dialogs';

const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    }
    this.drawerWidth = 300;
  }
  
  static contextType = WebSocketContext;

  handleDrawerOpen = () => {
    this.setState({ openDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };


  render() {
    console.log(this.context);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div>
            <Header 
              handleDrawerOpen={this.handleDrawerOpen}
              openDrawer={this.state.openDrawer}
              drawerWidth={this.drawerWidth}
            />
            <MenuNavigarion 
              handleDrawerClose={this.handleDrawerClose}
              openDrawer={this.state.openDrawer}
              drawerWidth={this.drawerWidth}
              navigationLinks={navigationLinks}
            />
            <Box className={classes.main}>
              <Route path="/signup" render={() => <SignUp />} />
              <Route path="/signin" render={() => <SignIn />} />
              <Route path="/profile" render={() => <Profile />} />
              <Route path="/friends" render={() => <Friends />} />
              <Route path="/users" render={() => <Users />} />
              <Route path="/dialogs" render={() => <Dialogs />} />
            </Box>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

// let AppContainer = compose(withRouter, 
//   connect())(App);

let AppContainer = withStyles(useStyles)(App)

  
const MainApp = () => {
  console.log('render MainApp')
  return (
    <BrowserRouter>
      <Provider store={store}>
        <WebSocketProvider>
          <AppContainer />
        </WebSocketProvider>
      </Provider>     
    </BrowserRouter>
  )
}

export default MainApp;
