import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserCard from '../../common/UserCard/UserCard';
import RequestsFriendsItem from './RequestsFriendsItem';

import Preloader from '../../common/Preloader/Preloader';

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    list: {
        maxWidth: 500,
        marginRight: 'auto',
        marginLeft: 'auto'
    }
})

class RequestsInFriends extends Component {

    componentDidMount() {
        const selfId = localStorage.getItem('userId');
        this.props.getRequestsInFriends(selfId);
    }


    render() {
        console.log(this.props)
        const { classes, requestsInFriendsIsFetching, requestsInFriends, addInFriends } = this.props;
        if (requestsInFriendsIsFetching) {
            return <Preloader />
        }
        console.log(requestsInFriends);
        return (
            <div>
                <Container fixed className={classes.root}>
                    <List className={classes.list}>
                        {requestsInFriends.map(user => <RequestsFriendsItem 
                            actionText="Добавить в друзья"
                            snackbarText={`${user.nickname} добавлен в друзья`}
                            isAction={true}
                            addInFriends={addInFriends}
                            user={user}
                            key={user.id}
                        />)}
                    </List>
                </Container>
            </div>
        )
    }
}

RequestsInFriends.propTypes = {

}

export default withStyles(useStyles)(RequestsInFriends);