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
        this.socket.connect();

        const { REGISTRATION, LOGIN, LOGOUT, GET_USER_DATA } = this.SETTINGS.MESSAGES;

        this.socket.on('connect', () => {
            console.log(this.socket.id);
        });
        this.socket.on('message', data => {
            console.log(data);
        })

        this.ws = {
            socket: this.socket,
            sendMessage: this.sendMessage
        }
    }

    sendMessage = (user, message) => {
        this.socket.emit('message', { user, message });
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
    setAuthError: PropTypes.func,
    setUserData: PropTypes.func,
    token: PropTypes.string,   
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(WebSocketProvider);