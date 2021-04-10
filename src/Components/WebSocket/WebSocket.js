import React, { createContext, Component } from 'react';
import { SETTINGS } from '../../settings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socket from '../../service/socket';
import { setAllActiveUsers, setNewActiveUser, removeDisactiveUser } from '../../redux/usersReducer';

const WebSocketContext = createContext(null);

export { WebSocketContext };


class WebSocketProvider extends Component {

    constructor(props) {
        super(props);
        this.SETTINGS = SETTINGS;

        this.socket = socket;

        const { GET_ALL_ACTIVE_USERS, USER_CONNECT, USER_DISCONNECT } = this.SETTINGS.MESSAGES;

        this.socket.on('connect', () => {
            console.log('connect', this.socket.id);

            if (this.props.isAuth) {
                this.setConnection();
            }

        });

        this.socket.on('disconnect', () => {
            console.log('disconnect', this.socket.id);
        })

        this.socket.on(GET_ALL_ACTIVE_USERS, data => {
            console.log(data);
            this.props.setAllActiveUsers(data);
        })
        this.socket.on(USER_CONNECT, data => {
            console.log(data);
            this.props.setNewActiveUser(data);
        })
        this.socket.on(USER_DISCONNECT, data => {
            console.log(USER_DISCONNECT);
            this.props.removeDisactiveUser(data);
        })


        this.ws = {
            socket: this.socket,
            sendMessage: this.sendMessage,
            setConnection: this.setConnection
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth && this.props.isAuth) {
            this.socket.connect();
        } else if (this.props.isAuth !== prevProps.isAuth && !this.props.isAuth) {
            this.socket.disconnect();
        }
    }

    sendMessage = (user, message) => {
        this.socket.emit('message', { user, message });
    }

    setConnection = () => {
        this.socket.emit(this.SETTINGS.MESSAGES.SET_CONNECT, { token: this.props.token });
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
    token: PropTypes.string,
    setAllActiveUsers: PropTypes.func,
    setNewActiveUser: PropTypes.func,
    removeDisactiveUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    token: state.auth.token
})

export default connect(mapStateToProps, {
    setAllActiveUsers,
    setNewActiveUser,
    removeDisactiveUser
})(WebSocketProvider);