import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { withStyles } from '@material-ui/core/styles';

import TitleTemplate from '../common/TitleTemplate/TitleTemplate';
import DialogBox from './DialogBox/DialogBox';
import Conversations from './Conversations/Conversations';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


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
        const { classes, activeUsers } = this.props;
        return (
            <Container fixed className={classes.root}>
                <Grid 
                    container 
                    className={classes.gridContainer}
                    direction="row"
                    spacing={2}
                >
                    <Grid item sm={4} md={4}>
                        <Conversations
                            activeUsers={activeUsers}
                        />
                    </Grid>

                    <Grid item sm={8} md={8}>
                        <DialogBox />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

Dialogs.propTypes = {
    activeUsers: PropTypes.array,

}

const mapStateToProps = (state) => ({
    activeUsers: state.users.activeUsers
})

export default compose(
    withStyles(useStyles),
    withAuthRedirect,
    connect(mapStateToProps, {

    })
)(Dialogs);