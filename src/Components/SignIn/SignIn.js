import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SignInForm from './SignInForm';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
}))


const SignIn = () => {
    const classes = useStyles();
    return (
        <Container fixed>
            <SignInForm />
        </Container>
    )
}

export default SignIn;