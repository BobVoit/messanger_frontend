import io from 'socket.io-client';
import md5 from 'md5';

import { SETTINGS } from '../settings';

import { setUserData } from '../redux/authReducer';


class Socket {
    constructor() {
        this.SETTINGS = SETTINGS;
        this.socket = io(this.SETTINGS.WS_BASE);

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
}

export default Socket;