import React, { Component } from 'react'

import { Container, Typography } from '@material-ui/core';

import UsersList from './UsersList';

class Users extends Component {
    render() {
        return (
            <Container fixed>
                <Typography 
                    component="h2" 
                    variant="h3"
                    align="center"
                >Пользователи</Typography>
                <UsersList />
            </Container>
        )
    }
}

export default Users;