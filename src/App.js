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

import WebSocketProvider from './Components/WebSocket/WebSocket';
import { initializeApp } from './redux/appReducer';
import Preloader from './Components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

import Header from './Components/Header/Header';
import MenuNavigarion from './Components/MenuNavigation/MenuNavigarion';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Profile from './Components/Profile/Profile';
// import Friends from './Components/Friends/Friends';
// import Users from './Components/Users/Users';
import Dialogs from './Components/Dialogs/Dialogs';
// import Settings from './Components/Settings/Settings';

const Users = React.lazy(() => import('./Components/Users/Users'));
const Friends = React.lazy(() => import('./Components/Friends/Friends'));
const Settings = React.lazy(() => import('./Components/Settings/Settings'));


const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
    this.drawerWidth = 300;
  }


  componentDidMount() {
    this.props.initializeApp();
  }
  

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };


  render() {
    
    if (!this.props.initialized) {
      return <Preloader size={70} />
    }


    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Redirect to="/signin" />
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div>
            <Header 
              handleDrawerOpen={this.handleDrawerOpen}
              drawerOpen={this.state.drawerOpen}
              drawerWidth={this.drawerWidth}
              socket={this.state.socket}
            />
            <MenuNavigarion 
              handleDrawerClose={this.handleDrawerClose}
              drawerOpen={this.state.drawerOpen}
              drawerWidth={this.drawerWidth}
              navigationLinks={navigationLinks}
            />
            <Box className={classes.main}>
              <Route path="/signup" render={() => <SignUp />} />
              <Route path="/signin" render={() => <SignIn />} />
              <Route path="/profile/:userId?" render={() => <Profile />} />
              <Route path="/dialogs" render={() => <Dialogs />} />
              <Route path="/friends" render={withSuspense(Friends)} />
              <Route path="/users" render={withSuspense(Users)} />
              <Route path="/settings" render={withSuspense(Settings)} />
            </Box>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(withRouter, withStyles(useStyles),
  connect(mapStateToProps, { initializeApp }))(App);

  
const MainApp = () => {
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
