import React, { createContext, Component } from 'react';
import { SETTINGS } from '../../settings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socket from '../../service/socket';
import { setAllActiveUsers, setNewActiveUser, removeDisactiveUser } from '../../redux/usersReducer';
import { setAllMessages, addMessage } from '../../redux/chatReducer';

const WebSocketContext = createContext(null);

export { WebSocketContext };


class WebSocketProvider extends Component {

    constructor(props) {
        super(props);
        this.SETTINGS = SETTINGS;

        this.socket = socket;

        const { GET_ALL_ACTIVE_USERS, USER_CONNECT, USER_DISCONNECT,
             GET_ALL_MESSAGES, PRIVATE_MESSAGE } = this.SETTINGS.MESSAGES;

        this.socket.on('connect', () => {
            console.log('connect', this.socket.id);

            if (this.props.isAuth) {
                this.setConnection();
            }

        });

        this.socket.on('disconnect', () => {
            console.log('disconnect', this.socket.id);
        })

        this.socket.on(GET_ALL_ACTIVE_USERS, data => this.props.setAllActiveUsers(data));
        this.socket.on(USER_CONNECT, data => this.props.setNewActiveUser(data));
        this.socket.on(USER_DISCONNECT, data => this.props.removeDisactiveUser(data));

        this.socket.on(GET_ALL_MESSAGES, data => this.props.setAllMessages(data));

        this.socket.on(PRIVATE_MESSAGE, data => this.props.addMessage(data));

        this.ws = {
            socket: this.socket,
            sendMessage: this.sendMessage,
            setConnection: this.setConnection,
            getAllMessages: this.getAllMessages,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth && this.props.isAuth) {
            this.socket.connect();
        } else if (this.props.isAuth !== prevProps.isAuth && !this.props.isAuth) {
            this.socket.disconnect();
        }
    }

    sendMessage = (data) => { // text, from, to, socketIdTo
        const dt = new Date();
        const date = dt.toLocaleDateString();
        const time = dt.toLocaleTimeString();
        this.socket.emit(this.SETTINGS.MESSAGES.PRIVATE_MESSAGE, { ...data, date, time });
    }

    setConnection = () => {
        this.socket.emit(this.SETTINGS.MESSAGES.SET_CONNECT, { token: this.props.token });
    }

    getAllMessages = (companionId) => {
        this.socket.emit(this.SETTINGS.MESSAGES.GET_ALL_MESSAGES, { from: this.props.id, to: companionId });
    }

    render() {
        return (
            <WebSocketContext.Provider value={this.ws}>
                {this.props.children}
            </WebSocketContext.Provider>
        )
    }
}

WebSocketProvider.propTypes = {
    isAuth: PropTypes.bool,
    id: PropTypes.number,
    token: PropTypes.string,
    setAllActiveUsers: PropTypes.func,
    setNewActiveUser: PropTypes.func,
    removeDisactiveUser: PropTypes.func,
    addMessage: PropTypes.func,
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    isAuth: state.auth.isAuth,
    token: state.auth.token
})

export default connect(mapStateToProps, {
    setAllActiveUsers,
    setNewActiveUser,
    removeDisactiveUser,
    setAllMessages,
    addMessage
})(WebSocketProvider);