import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import SignUpForm from './SignUpForm';
import { setIsSignUp } from '../../redux/authReducer';

const useStyles = makeStyles((theme) => ({
    
}))


const SignUp = ({ setIsSignUp, isAuth, isSignUp }) => {
    const classes = useStyles();

    return (
        <Container fixed>
            <SignUpForm
                isAuth={isAuth}
                setIsSignUp={setIsSignUp}
                isSignUp={isSignUp}
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isSignUp: state.auth.isSignUp
})

export default connect(mapStateToProps, {
    setIsSignUp
})(SignUp);