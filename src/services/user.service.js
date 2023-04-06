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
    getStory
}

window.userService = userService

async function getUsersBySearch(filterBy = { searchTerm: '' }) {
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
    // const user = await storageService.get('user', _id)

    // let user = getById(_id)
    // user.score = score
    await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    return user
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

async function getStory(userId, storyId) {
    const user = await getById(userId)
    return user.stories.find(s => s.id === storyId)

}

// auth
async function login(credentials) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === credentials.username)
    console.log('user login:', user)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCard) {

    const user = createUser(userCard)
    console.log('user:', user)
    const addUser = await storageService.post('user', user)
    console.log('addUser:', addUser)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    // return saveLocalUser(user)
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



