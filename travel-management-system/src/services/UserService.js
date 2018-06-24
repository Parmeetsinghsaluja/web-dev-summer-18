let _singleton = Symbol();
const LOG_IN_URL = 'http://localhost:4000/api/login';
const PROFILE_URL = 'http://localhost:4000/api/profile';
const USER_URL = 'http://localhost:4000/api/user';



class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    loginUser(username,password){
        return fetch(LOG_IN_URL, {
            method: 'post',
            body: JSON.stringify({username:username, password: password}),
            credentials: "same-origin",
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response;
        })
    }

    findUserById(userId) {
        return fetch(USER_URL + '/' + userId,{
            credentials: "same-origin"
        }).then(response => response.json());
    }

    findUserIdByUsername(username) {
        return fetch(PROFILE_URL + '/' + username,{
            credentials: "same-origin"
        })
            .then(response => response.json());
    }
    deleteUser(userId) {
        return fetch(USER_URL + '/' + userId, {
            method: 'delete',
            credentials: "same-origin"
        })
    }

    findAllUsers() {
        return fetch(USER_URL,{
            credentials: "same-origin"
        })
            .then(response => response.json());
    }

    createUser(user) {
        return fetch(USER_URL, {
            method: 'post',
            body: JSON.stringify(user),
            credentials: "same-origin",
            headers: {
                'content-type': 'application/json'
            }
        });
    }

}
export default UserService;