import React, { createContext, Component } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { SETTINGS } from '../../settings';
import md5 from 'md5';
import PropTypes from 'prop-types';

import { setAuthError, setUserData } from '../../redux/authReducer';
import { connect } from 'react-redux';

const WebSocketContext = createContext(null);

export { WebSocketContext };


class WebSocketProvider extends Component {
    constructor(props) {
        console.log(`WebSocket`);
        super(props);
        this.SETTINGS = SETTINGS;
        // this.socket = null;
        this.state = {
            socket: null,
        }

        const { REGISTRATION, LOGIN, LOGOUT, GET_USER_DATA } = this.SETTINGS.SOCKETS_EVENTS;
        
        if (!this.socket) {
            this.socket = io(this.SETTINGS.WS_BASE);
        }
        
        console.log(this.socket.id);

        this.socket.on('connect', () => {
            console.log(this.socket.id);
        })

        this.socket.on(REGISTRATION, data => {
            if (data.result === 'ok') {
                this.getUserData(data.data);
            }
        })

        this.socket.on('hello', data => {
            console.log(data);
        })

        this.socket.on(GET_USER_DATA, data => {
            console.log(data);
            // this.props.setUserData()
        })

        this.ws = {
            socket: this.socket,
            registration: this.registration,
            login: this.login, 
            logout: this.logout,
            getUserData: this.getUserData
        }
    }

    componentDidMount() {

        
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
        console.log(this.ws);
        return (
            <WebSocketContext.Provider value={this.ws}>
                {this.props.children}
            </WebSocketContext.Provider>
        )
    }
}

// const WebSocketProvider = ({ children, setAuthError }) => {
//     let socket;
//     let ws;

//     const { REGISTRATION, LOGIN, LOGOUT, GET_USER_DATA } = SETTINGS.SOCKETS_EVENTS;

    

//     const registration = (data) => {
//         const { login, password, repeatPassword, nickname } = data;
//         if (login && password && repeatPassword && nickname) {
//             if (password === repeatPassword) {
//                 const num =  Math.round(Math.random() * 1000000);
//                 const passHash = md5(login + password);
//                 const token = md5(passHash + String(num));
//                 socket.emit(REGISTRATION, { login, nickname, passHash, token, num });
//             } else {
//                 setAuthError("Повторный пароль введен неправильно");
//             }
//         } 
//     }

//     const login = (data) => {
//         const { login, password } = data;
//         if (login && password) {
//             const num = Math.round(Math.random() * 1000000);
//             const passHash = md5(login + password);
//             const token = md5(passHash + String(num));
//             socket.emit(LOGIN, { login, passHash, token, num });
//         }
//     }

//     const logout = (token) => {
//         if (token) {
//             socket.emit(LOGOUT, { token });
//         }
//     }

//     const getUserData = (token) => {
//         if (token) {
//             socket.emit(GET_USER_DATA, { token });
//         }
//     }



    
//     if (!socket) {
//         socket = io.connect(SETTINGS.WS_BASE)

//         socket.on('connect', () => {
//             console.log(socket.id);
//         })

//         socket.on(REGISTRATION, data => {
//             if (data.result === 'ok') {
//                 getUserData(data.data);
//             }
//         })

//         socket.on(GET_USER_DATA, data => {
//             console.log(data);
//             // this.props.setUserData()
//         })
            

//         ws = {
//             socket: socket,
//         }
//     }

//     return (
//         <WebSocketContext.Provider value={ws}>
//             {children}
//         </WebSocketContext.Provider>
//     )
// }

WebSocketProvider.propTypes = {
    setAuthError: PropTypes.func,
    token: PropTypes.string,   
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps, {
    setAuthError,
    setUserData
})(WebSocketProvider);