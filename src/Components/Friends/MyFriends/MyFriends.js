import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';

import FriendsList from './MyFriendsList';
import Preloader from '../../common/Preloader/Preloader';

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
})

class MyFriends extends Component {

    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        const { classes, friends, friendsIsFetching } = this.props;
        if (friendsIsFetching) {
            return <Preloader />
        }
        return (
            <div>
                <Container fixed className={classes.root}>
                <FriendsList 
                    friends={friends}
                />
            </Container>
            </div>
        )
    }
}

MyFriends.propTypes = {
    getFriends: PropTypes.func, 
    friendsIsFetching: PropTypes.bool,
    friends: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        nickname: PropTypes.string,
        avatar: PropTypes.string,
        status: PropTypes.string
    }))
}

export default withStyles(useStyles)(MyFriends);