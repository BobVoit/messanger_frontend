import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SignUpForm from './SignUpForm';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
}))


const SignUp = () => {
    const classes = useStyles();
    return (
        <Container fixed>
            <SignUpForm />
        </Container>
    )
}

export default SignUp;