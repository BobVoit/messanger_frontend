import PropTypes from 'prop-types';

// PT - PropTypes

export const userPT = PropTypes.shape({
    avatar: PropTypes.oneOfType([ PropTypes.string ]),
    nickname: PropTypes.oneOfType([ PropTypes.string ]),
    status: PropTypes.string
});