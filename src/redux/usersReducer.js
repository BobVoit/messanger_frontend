import { userAPI } from '../api/api';

const SET_ALL_ACTIVE_USERS = 'SET_ALL_ACTIVE_USERS';
const SET_NEW_ACTIVE_USER = 'SET_NEW_ACTIVE_USER';
const REMOVE_DISACTIVE_USER = 'REMOVE_DISACTIVE_USER';
const SET_USERS = 'SET_USERS';
const SET_FRIENDS = 'SET_FRIENDS';
const TOGGLE_FRIENDS_IS_FETCHING = 'TOGGLE_FRIENDS_IS_FETCHING';
const TOGGLE_USERS_IS_FETCHING = 'TOGGLE_USERS_IS_FETCHING';
const SET_PROFILE = 'SET_PROFILE';
const TOGGLE_CURRENT_PROFILE = 'TOGGLE_CURRENT_PROFILE';
const TOGGLE_PROFILE_IS_DOWNLOAD = 'TOGGLE_PROFILE_IS_DOWNLOAD';

// initialState
let initialState = {
    activeUsers: [],
    users: [],
    usersIsFetching: false,
    friends: [],
    friendsIsFetching: false,
    profile: null,
    profileIsDownload: false,
    isYourCurrentProfile: true,
    
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
        case SET_FRIENDS: {
            return {
                ...state,
                friends: action.friends
            }
        }
        case TOGGLE_FRIENDS_IS_FETCHING: {
            return {
                ...state,
                friendsIsFetching: action.value
            }
        }
        case TOGGLE_USERS_IS_FETCHING: {
            return {
                ...state,
                usersIsFetching: action.value
            }
        }
        case SET_PROFILE: {
            return {
                ...state, 
                profile: action.profile
            }
        }
        case TOGGLE_CURRENT_PROFILE: {
            return {
                ...state,
                isYourCurrentProfile: action.value
            }
        }
        case TOGGLE_PROFILE_IS_DOWNLOAD: {
            return {
                ...state,
                profileIsDownload: action.value
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

export const setFriends = (friends) => ({
    type: SET_FRIENDS,
    friends
})

export const toggleFriendsIsFetching = (value) => ({
    type: TOGGLE_FRIENDS_IS_FETCHING,
    value
})

export const toggleUsersIsFetching = (value) => ({
    type: TOGGLE_USERS_IS_FETCHING,
    value
})

export const setProfile = (profile) => ({
    type: SET_PROFILE,
    profile
})

export const toggleCurrentAcount = (value) => ({
    type: TOGGLE_CURRENT_PROFILE,
    value
})

export const toggleProfileIsDownload = (value) => ({
    type: TOGGLE_PROFILE_IS_DOWNLOAD,
    value
})


export const getUsers = (count, start) => async (dispatch) => {
    const response = await userAPI.getSomeUsers(count, start);
    dispatch(toggleUsersIsFetching(true));
    const { result, data } = response.data;
    if (result === 'ok' && data instanceof Array) {
        dispatch(toggleUsersIsFetching(false));
        dispatch(setUsers(data));
    } 
}

export const getFriends = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(toggleFriendsIsFetching(true));
    const response = await userAPI.getAllFriends(token);
    const { result, data} = response.data;
    if (result === 'ok' && data instanceof Array) {
        dispatch(toggleFriendsIsFetching(false));
        dispatch(setFriends(data));
    }
}

export const getProfile = userId => async dispatch => {
    const response = await userAPI.getUserProfile(userId);
    dispatch(toggleProfileIsDownload(true));
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        dispatch(toggleProfileIsDownload(false));
        dispatch(setProfile(data));
    }
}


export default usersReducer;