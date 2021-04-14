import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Container, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';
import UsersList from './UsersList';
import { getUsers, requestInFriends } from '../../redux/usersReducer';


const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
        width: 500
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
})

class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const selfId = localStorage.getItem('userId');
        this.props.getUsers(selfId, 20, 0);
    }


    render() {
        const { classes, users, requestInFriends } = this.props;
        return (
            <div>
                <Container fixed className={classes.root}>
                <TitleTemplate 
                    icon={<SupervisorAccountIcon
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Люди"
                />
                <UsersList 
                    users={users}
                    requestInFriends={requestInFriends}
                />
            </Container>
            </div>
        )
    }
}

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        login: PropTypes.string,
        password: PropTypes.string,
        nickname: PropTypes.string,
        status: PropTypes.string,
        token: PropTypes.string,
    }))
}

const mapStateToProps = (state) => ({
    users: state.users.users
})

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, {
        getUsers,
        requestInFriends
    }),
    withRouter,
    withAuthRedirect
)(Users);