import PropTypes from 'prop-types';

// PT - PropTypes

export const userPT = PropTypes.shape({
    avatar: PropTypes.oneOfType([ PropTypes.string ]),
    nickname: PropTypes.oneOfType([ PropTypes.string ]),
    status: PropTypes.string
});

export const companionPT = PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    avatar: PropTypes.string,
    socketId: PropTypes.string,
    token: PropTypes.string
});

export const messagePT = PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    fromId: PropTypes.number,
    toId: PropTypes.number
})

export const messagesPT = PropTypes.arrayOf(messagePT);