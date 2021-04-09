import React, { createContext, Component } from 'react';
import { SETTINGS } from '../../settings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socket from '../../service/socket';

const WebSocketContext = createContext(null);

export { WebSocketContext };


class WebSocketProvider extends Component {

    constructor(props) {
        super(props);
        this.SETTINGS = SETTINGS;

        this.socket = socket;

        if (this.props.isAuth) {
            console.log(this.socket);
        }

        const { REGISTRATION, LOGIN, LOGOUT, GET_USER_DATA } = this.SETTINGS.MESSAGES;

        this.socket.on('connect', () => {
            console.log('connect', this.socket.id);

            if (this.props.isAuth) {
                this.setConnection();
            }

        });

        this.socket.on('disconnect', () => {
            console.log('disconnect', this.socket.id);
        })

        this.socket.on('message', data => {
            console.log(data);
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
        console.log('render');
        return (
            <WebSocketContext.Provider value={this.ws}>
                {this.props.children}
            </WebSocketContext.Provider>
        )
    }
}

WebSocketProvider.propTypes = {
    
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    token: state.auth.token
})

export default connect(mapStateToProps, {
})(WebSocketProvider);