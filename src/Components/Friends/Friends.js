import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Paper, Tabs, Tab, Box, Container, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MyFriends from './MyFriends/MyFriends';
import RequestsInFriends from './RequestsInFriends/RequestsInFriends';
import { getFriends, getRequestsInFriends } from '../../redux/usersReducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabsNavigation: {
    maxWidth: 600,
    marginRight: 'auto',
    marginLeft: 'auto'
  }
}))


const Friends = ({ friends, friendsIsFetching, getFriends, getRequestsInFriends,
  requestsInFriends, requestsInFriendsIsFetching })  => {

  const classes = useStyles();
  const  [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  return (
    <Fade in={true}>
      <Container>
        <Paper className={classes.tabsNavigation}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="tabs-navigation"
            centered
          >
            <Tab label="Мои друзья" {...a11yProps(0)} />
            <Tab label="Заявки в друзья" {...a11yProps(1)} />
          </Tabs>
        </Paper>

        <TabPanel value={tab} index={0}>
          <MyFriends
            friends={friends}
            friendsIsFetching={friendsIsFetching}
            getFriends={getFriends}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <RequestsInFriends 
            getRequestsInFriends={getRequestsInFriends}
            requestsInFriends={requestsInFriends}
            requestsInFriendsIsFetching={requestsInFriendsIsFetching}
          />
        </TabPanel>
      </Container>
    </Fade>
  )
}

const mapStateToProps = (state) => ({
  friendsIsFetching: state.users.friendsIsFetching,
  friends: state.users.friends,
  requestsInFriends: state.users.requestsInFriends,
  requestsInFriendsIsFetching: state.users.requestsInFriendsIsFetching,
})

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
      getFriends,
      getRequestsInFriends
  })
)(Friends);