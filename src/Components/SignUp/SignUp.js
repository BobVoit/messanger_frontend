import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import SignUpForm from './SignUpForm';
import { setIsSignUp, registration } from '../../redux/authReducer';


const useStyles = makeStyles((theme) => ({
    
}))


const SignUp = ({ setIsSignUp, isAuth, isSignUp, registration }) => {
    const classes = useStyles();

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
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isSignUp: state.auth.isSignUp
})

export default connect(mapStateToProps, {
    setIsSignUp,
    registration
})(SignUp);