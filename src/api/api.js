import * as axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3001",
})

export const authAPI = {
    registration(login, nickname, passHash, token, num) { // data: { login, nickname, passHash, token, num }
        return instance.post('/auth/registration', {
            login, nickname, passHash, token, num
        });
    },
    login(login, passHash, token, num) {
        return instance.post('/auth/login', {
            login, passHash, token, num
        })
    },
    logout(token) {
        return instance.get(`/auth/logout/${token}`);
    }
}

export const usersAPI = {
    getUserData(token) {
        return instance.get(`/users/getUserData/${token}`);
    }
}