import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Container } from '@material-ui/core';

import SignUpForm from './SignUpForm';
import { setIsSignUp, registration } from '../../redux/authReducer';



const SignUp = ({ setIsSignUp, isAuth, isSignUp, registration, errorAuth }) => {

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <Container fixed>
            <SignUpForm
                isAuth={isAuth}
                setIsSignUp={setIsSignUp}
                isSignUp={isSignUp}
                registration={registration}
                errorAuth={errorAuth}
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isSignUp: state.auth.isSignUp,
    errorAuth: state.auth.error
})

export default connect(mapStateToProps, {
    setIsSignUp,
    registration
})(SignUp);