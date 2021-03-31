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
    constructor(props) {
        console.log(`WebSocket`);
        super(props);
        this.SETTINGS = SETTINGS;
        this.state = {  
            socket: null
        }
    }

    componentDidMount() {
        this.setState({
            socket: new Socket()
        })
    }

    render() {
        console.log(this.state.socket);
        return (
            <WebSocketContext.Provider value={this.state.socket}>
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