import React, { createContext, Component } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { SETTINGS } from '../../settings';
import md5 from 'md5';
import PropTypes from 'prop-types';
import Socket from '../../modules/Socket';

import { setAuthError, setUserData } from '../../redux/authReducer';
import { connect } from 'react-redux';

const WebSocketContext = createContext(null);

export { WebSocketContext };


class WebSocketProvider extends Component {


    socket = null;

    constructor(props) {
        super(props);
        this.SETTINGS = SETTINGS;
        this.socket = io(this.SETTINGS.WS_BASE, {
            transports: ['websocket'],
            rejectUnauthorized: false,
            secure: true
        });

        const { REGISTRATION, LOGIN, LOGOUT, GET_USER_DATA } = this.SETTINGS.SOCKETS_EVENTS;

        this.socket.on('connect', () => {
            console.log(this.socket.id);
        })

        this.socket.on(REGISTRATION, data => {
            if (data.result === 'ok') {
                this.getUserData(data.data);
            }
        })

        this.socket.on('hello', data => {
            console.log(data)
        })

        this.socket.on(GET_USER_DATA, data => {
            console.log(data);
            if (data.result === 'ok') {
                const { login, password, nickname, status, token, id } = data.data;
                setUserData(id, login, password, nickname, true, status, token);
            }
        })

        this.ws = {
            socket: this.socket,
            registration: this.socket
        }
    }

    componentDidMount() {
        this.setState({
            socket: new Socket()
        })
    }

    
    registration = (data) => {
        const { login, password, repeatPassword, nickname } = data;
        if (login && password && repeatPassword && nickname) {
            if (password === repeatPassword) {
                const num =  Math.round(Math.random() * 1000000);
                const passHash = md5(login + password);
                const token = md5(passHash + String(num));
                this.socket.emit(this.SETTINGS.SOCKETS_EVENTS.REGISTRATION, { login, nickname, passHash, token, num });
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
            this.socket.emit(this.SETTINGS.SOCKETS_EVENTS.LOGIN, { login, passHash, token, num });
        }
    }

    logout = (token) => {
        if (token) {
            this.socket.emit(this.SETTINGS.SOCKETS_EVENTS.LOGOUT, { token });
        }
    }

    getUserData = (token) => {
        if (token) {
            this.socket.emit(this.SETTINGS.SOCKETS_EVENTS.GET_USER_DATA, { token });
        }
    }

    render() {
        console.log(this.socket);
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
    token: state.auth.token
})

export default connect(mapStateToProps, {
    setAuthError,
    setUserData
})(WebSocketProvider);