import { getUserData } from './authReducer';

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
    initialized: false
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}


export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        let promise = dispatch(getUserData(token));
        Promise.all([promise])
            .then(() => dispatch(initializedSuccess())) 
    } else {
        dispatch(initializedSuccess());
    }
}

export default appReducer;