import React, { createContext, Component } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { SETTINGS } from '../../settings';
import md5 from 'md5';
import PropTypes from 'prop-types';

import { setAuthError } from '../../redux/authReducer';
import { connect } from 'react-redux';

const WebSocketContext = createContext(null);

export { WebSocketContext }

class WebSocketProvider extends Component {
    constructor(props) {
        super(props);
        this.SOCKETS_EVENTS = SETTINGS.SOCKETS_EVENTS;
    }

    componentDidMount() {
        const { REGISTRATION } = this.SETTINGS.SOCKETS_EVENTS;
        this.socket = io(this.SETTINGS.WS_BASE);
        console.log(this.socket);

        this.ws = {
            socket: this.socket,
            registration: this.registration
        }

        this.socket.on('connect', () => {
            console.log(this.socket);
        })

        this.socket.on(REGISTRATION, data => {
            
        })
    }

    registration = (data) => {
        const { login, password, repeatPassword, nickname } = data;
        if (login && password && repeatPassword && nickname) {
            if (password === repeatPassword) {
                const num =  Math.round(Math.random() * 1000000);
                const passHash = md5(login + password);
                const token = md5(passHash + String(num));
                this.socket.emit(this.SOCKETS_EVENTS.REGISTRATION, { login, nickname, passHash, token, num });
            } else {
                this.props.setAuthError("Повторный пароль введен неправильно");
            }
        } 
    }

    login = (data) => {
        const { login, password } = data;
        if (login && password) {
            const num = Math.round(Math.random() * 1000000);
            const passHash = md5(login + password);
            const token = md5(passHash + String(num));
            this.socket.emit(this.SOCKETS_EVENTS.LOGIN, { login, passHash, token, num });
        }
    }

    logout = () => {
        if (this.props.token) {
            this.socket.emit(this.SOCKETS_EVENTS.LOGOUT, this.props.token);
        }
    }

    getUserData = () => {
        if (this.props.token) {
            this.socket.emit(this.SOCKETS_EVENTS.GET_USER_DATA, this.props.token);
        }
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
    token: PropTypes.string,   
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps, {
    setAuthError
})(WebSocketProvider);