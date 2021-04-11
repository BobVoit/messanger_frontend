import { userAPI } from '../api/api';

const SET_ALL_ACTIVE_USERS = 'SET_ALL_ACTIVE_USERS';
const SET_NEW_ACTIVE_USER = 'SET_NEW_ACTIVE_USER';
const REMOVE_DISACTIVE_USER = 'REMOVE_DISACTIVE_USER';
const SET_USERS = 'SET_USERS';

// initialState
let initialState = {
    activeUsers: [],
    users: [],
}



const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_ACTIVE_USERS: {
            return {
                ...state,
                activeUsers: Object.values(action.activeUsers)
            }
        }
        case SET_NEW_ACTIVE_USER: {
            return {
                ...state,
                activeUsers: [ ...state.activeUsers, action.newActiveUser ]
            }
        }
        case REMOVE_DISACTIVE_USER: {
            return {
                ...state,
                activeUsers: state.activeUsers.filter(user => user.id !== action.user.id )
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return state;
    }
}

export const setAllActiveUsers = (users) => ({
    type: SET_ALL_ACTIVE_USERS,
    activeUsers: users
})

export const setNewActiveUser = (user) => ({
    type: SET_NEW_ACTIVE_USER,
    newActiveUser: user
})

export const removeDisactiveUser = (user) => ({
    type: REMOVE_DISACTIVE_USER,
    user
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users
})


export const getUsers = (count, start) => async (dispatch) => {
    const response = await userAPI.getSomeUsers(count, start);
    const { result, data } = response.data;
    if (result === 'ok' && data instanceof Array) {
        console.log(data);
        dispatch(setUsers(data));
    } 
}


export default usersReducer;