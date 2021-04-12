import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';
import FriendsList from './FriendsList';
import { getFriends } from '../../redux/usersReducer';
import Preloader from '../common/Preloader/Preloader';

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
})

class Friends extends Component {

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
                <TitleTemplate 
                    icon={<PeopleIcon
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Друзья"
                />
                <FriendsList 
                    friends={friends}
                />
            </Container>
            </div>
        )
    }
}

Friends.propTypes = {
    getFriends: PropTypes.func, 
    friendsIsFetching: PropTypes.bool,
    friends: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        nickname: PropTypes.string,
        avatar: PropTypes.string,
        status: PropTypes.string
    }))
}

const mapStateToProps = (state) => ({
    friendsIsFetching: state.users.friendsIsFetching,
    friends: state.users.friends
})

export default compose(
    withStyles(useStyles),
    withAuthRedirect,
    connect(mapStateToProps, {
        getFriends
    })
)(Friends);