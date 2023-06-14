import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { store } from '../store/store'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'

import gUsers from './../data/user.json' assert {type: 'json'}
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    update,
    toggleSavedPost,
    getUsersBySearch,
    getStory,
    toggleFollow
}

window.userService = userService

// TODO: add socket integration
//TODO: divide user service to user and auth services
// TODO: divide user store and auth store

// maybe remove combine with get Users 
async function getUsersBySearch(txt) {
    return await httpService.get('user', txt)

}


async function getUsers(txt = '') {
    return await httpService.get('user', txt)
}


async function getById(userId) {
    const user = await httpService.get('user/' + userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}
function onUserUpdate(user) {
    // store.dispatch({ type: 'setWatchedUser', user })
}

async function update(user) {
    // the update function in BE will only update keys that she knows for security reason
    const updatedKeys = await httpService.put(`user/${user._id}`, user)
    const loggedUser = getLoggedinUser()
    const updatedUser = { loggedUser, ...updatedKeys }
    saveLocalUser(updatedUser)
    return updatedUser
}

async function toggleSavedPost(postId) {
    const updatedKeys = await httpService.put(`user/${postId}/save`)
    const loggedUser = getLoggedinUser()
    const updatedUser = { loggedUser, ...updatedKeys }
    return saveLocalUser(updatedUser)
}


async function toggleFollow(userToToggle) {
    const updatedKeys = await httpService.put(`user/${userToToggle._id}/follow`)
    const loggedUser = getLoggedinUser()

    const updatedUser = { ...loggedUser, ...updatedKeys }
    return saveLocalUser(updatedUser)

    //    this will return only updated keys from user update make sure to update the logged in user
    // {
    //     "_id": "643d2a0f99553dc5ce88b861",
    //         "fullname": "Tal Amit",
    //             "tags": [
    //                 "tag1",
    //                 "tag2",
    //                 "tag3",
    //                 "likeTag"
    //             ],
    //                 "followers": [],
    //                     "following": [
    //                         {
    //                             "fullname": "men75",
    //                             "username": "men.75",
    //                             "_id": "6472e57d55a4ce858ce54929",
    //                             "imgUrl": "https://randomuser.me/api/portraits/men/75.jpg"
    //                         }
    //                     ]
    // }

}

async function getStory(userId) {
    return await httpService.get(`user/${userId}/story`)
}



// auth
async function login({ username, password }) {

    try {
        const user = await httpService.post('auth/login', { username, password })
        if (user) {
            // socketService.login(user._id)
            socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (error) {
        console.info('Error trying to login', error);
    }
}

async function signup(userCard) {
    try {
        const user = await httpService.post('auth/signup', userCard)
        // socketService.login(user._id)
        return saveLocalUser(user)

    } catch (error) {

    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    debugger
    console.log('user:', user)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    // if (!user) throw 'No logged in User'
    return user
}

// later will be handle by BE

// ; (() => {
//     saveLocalUser(gUsers[2])
//     utilService.saveToStorage('user', gUsers)
// })()



