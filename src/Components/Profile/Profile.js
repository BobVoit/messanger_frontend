import { Avatar, Box, Container, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    wrapper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(5)
    },
    status: {
        marginTop: theme.spacing(2),
    }
})

class Profile extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Container fixed>
                <Box className={classes.wrapper}>
                    <Avatar
                        className={classes.avatar}
                    />
                    <Typography 
                        variant="h4"
                    >Имя</Typography>
                    <Typography
                        variant="subtitle1"
                        className={classes.status}
                    >Тут будет статус</Typography>
                </Box>
            </Container>
        )
    }
}

export default withStyles(useStyles)(Profile);