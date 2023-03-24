
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import gPost from './../data/post.json' assert {type: 'json'}

const STORAGE_KEY = 'post_db'

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost,
    addPostComment
}
window.cs = postService

async function query(filterBy = { txt: '', price: 0 }) {
    var posts = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
    }
    if (filterBy.price) {
        posts = posts.filter(post => post.price <= filterBy.price)
    }
    return posts
}

function getById(postId) {
    return storageService.get(STORAGE_KEY, postId)
}

async function remove(postId) {
    await storageService.remove(STORAGE_KEY, postId)
}

async function save(post) {
    var savedPost
    if (post._id) {
        savedPost = await storageService.put(STORAGE_KEY, post)
    } else {
        // Later, owner is set by the backend
        post.owner = userService.getLoggedinUser()
        savedPost = await storageService.post(STORAGE_KEY, post)
    }
    return savedPost
}

async function addPostComment(postId, txt) {
    // Later, this is all done by the backend
    const post = await getById(postId)
    if (!post.comments) post.comments = []

    const comments = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    post.comments.push(comments)
    await storageService.put(STORAGE_KEY, post)

    return msg
}

function getEmptyPost() {
    return {
        _id: '',
        txt: '',
        imgUrl: '',
        createdAt: Date.now(),
        by: {
            _id: '',
            username: '',
            imgUrl: '',
            fullname: ''
        },
        loc: {
            lat: 11.11,
            lng: 22.22,
            locname: 'Tel Aviv'
        },
        comments: [],
        likedBy: [],
        tags: []

    }
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
//     await storageService.post(STORAGE_KEY, gPost)
// })()