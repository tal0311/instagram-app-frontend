
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
    addPostComment,
    addPostLike
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
async function addPostLike(postId) {
    // Later, this is all done by the backend
    const post = await getById(postId)
    if (!post.likedBy) post.likedBy = []
    const { username: by, _id, imgUrl } = userService.getLoggedinUser()
    const idx = post.likedBy.findIndex(by => by._id === _id)
    if (idx === -1) {
        const like = {
            _id,
            by,
            imgUrl
        }
        post.likedBy.push(like)
        return await storageService.put(STORAGE_KEY, post)
    }
    post.likedBy.splice(idx, 1)
    return await storageService.put(STORAGE_KEY, post)
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
// ; (() => {
//     let posts = [gPost, gPost, gPost, gPost, gPost]

//     posts = posts.map(post => {

//         const wordLength = utilService.getRandomIntInclusive(0, 8)

//         return {
//             ...post,
//             txt: utilService.makeLorem(wordLength),
//             _id: utilService.makeId()
//         }

//     })
//     utilService.saveToStorage(STORAGE_KEY, posts)


// })()