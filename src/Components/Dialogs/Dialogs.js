import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DialogBox from './DialogBox/DialogBox';
import Conversations from './Conversations/Conversations';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { setCompanion } from '../../redux/chatReducer';
import { companionPT, messagesPT } from '../../propTypes';
import { WebSocketContext } from '../WebSocket/WebSocket';


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
    static contextType = WebSocketContext;
    constructor(props) {
        super(props);
        this.state = {
            selectedCompanionId: -1,
        }
    }


    selectCompanion = (companion) => {
        const ws = this.context;
        this.props.setCompanion(companion);
        ws.getAllMessages(companion.id);
        this.setState({ selectedCompanionId: companion.id });
    }

    render() {
        const { classes, activeUsers, messages, selfId, currentCompanion } = this.props;
        return (
            <Fade in={true}>
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
                                selectCompanion={this.selectCompanion}
                                selectedCompanionId={this.state.selectedCompanionId}
                            />
                        </Grid>

                        <Grid item sm={8} md={8}>
                            <DialogBox 
                                messages={messages}
                                currentCompanion={currentCompanion}
                                selectedCompanionId={this.state.selectedCompanionId}
                                selfId={selfId}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fade>
        )
    }
}

Dialogs.propTypes = {
    activeUsers: PropTypes.array,
    currentCompanion: companionPT,
    setCompanion: PropTypes.func,
    messages: messagesPT,
    selfId: PropTypes.number
}

const mapStateToProps = (state) => ({
    activeUsers: state.users.activeUsers,
    currentCompanion: state.chat.currentCompanion,
    messages: state.chat.messages,
    selfId: state.auth.id
})

export default compose(
    withStyles(useStyles),
    withAuthRedirect,
    connect(mapStateToProps, {
        setCompanion,
    })
)(Dialogs);