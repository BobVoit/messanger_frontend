import React, { Component } from 'react'

import { Container, Grid } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { withStyles } from '@material-ui/core/styles';

import TitleTemplate from '../common/TitleTemplate/TitleTemplate';
import DialogBox from './DialogBox/DialogBox';
import Conversations from './Conversations/Conversations';


const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(10)
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    gridContainer: {
        flexGrow: 1,
    }
})

class Dialogs extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Container fixed className={classes.root}>
                {/* <TitleTemplate 
                    icon={<ChatIcon 
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Диалоги"
                /> */}
                <Grid 
                    container 
                    className={classes.gridContainer}
                    direction="row"
                    spacing={2}
                >
                    <Grid item sm={4} md={4}>
                        <Conversations rrr={3} />
                    </Grid>

                    <Grid item sm={8} md={8}>
                        <DialogBox />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withStyles(useStyles)(Dialogs);