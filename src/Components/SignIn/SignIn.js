import React from 'react';
import { connect } from 'react-redux';

import { Container } from '@material-ui/core';

import { login } from '../../redux/authReducer';
import SignInForm from './SignInForm';
import { Redirect } from 'react-router';


const SignIn = ({ isAuth, login }) => {

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <Container fixed>
            <SignInForm
                loginUser={login}
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    login
})(SignIn);