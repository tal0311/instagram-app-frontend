import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'

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
async function getUsersBySearch(filterBy = { txt: '' }) {
    const userCollection = await storageService.query('user')
    if (filterBy.searchTerm) {
        const regex = new RegExp(filterBy.searchTerm, 'i')
        return userCollection.filter(user => regex.test(user.username))
    }
    return userCollection

}


async function getUsers() {
    const user = getLoggedinUser()
    const following = user.following.map(f => f._id)
    const userCollection = await storageService.query('user')

    // for removing loggedIn user from user list
    return userCollection.filter(u => u._id !== user._id)
    return userCollection
    // return httpService.get(`user`)
}


async function getById(userId) {
    const user = await storageService.get('user', userId)
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

async function toggleSavedPost(postId, userId) {
    const user = await getById(userId)
    if (!user) throw new Error('Not loggedin')
    if (user.savedPostIds.includes(postId)) {
        const idx = user.savedPostIds.findIndex(p => p === postId)
        user.savedPostIds.splice(idx, 1)
        await update(user)
        return saveLocalUser(user)
    }
    user.savedPostIds.push(postId)
    await update(user)
    return saveLocalUser(user)

}


async function toggleFollow(userToToggle) {
    // TODO: refactor to get only id 
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

async function getStory(userId, storyId) {
    const user = await getById(userId)
    return user.stories.find(s => s.id === storyId)
}



// auth
async function login(credentials) {
    try {

        const user = await httpService.get('auth/login', credentials)
        if (user) {
            // socketService.login(user._id)
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
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// later will be handle by BE
function createUser({ fullname, password, username, imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' }) {

    return {
        _id: '',
        username,
        imgUrl,
        fullname,
        password,
        createdAt: Date.now(),
        following: [],
        followers: [],
        savedPostIds: [],
        stories: [],
        highlights: []
    }
}





// ; (() => {
//     saveLocalUser(gUsers[2])
//     utilService.saveToStorage('user', gUsers)
// })()



