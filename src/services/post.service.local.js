
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import gPosts from './../data/postsData.json' assert {type: 'json'}

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

async function query(filterBy = { txt: '', userFilter: '' }) {

    let posts = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
    }
    if (filterBy.userFilter) {
        posts = userFilter(posts, filterBy.userFilter)
    }
    return posts
}

function userFilter(posts, type) {
    const user = userService.getLoggedinUser()
    console.log('user:', user)
    switch (type) {
        // posts user tagged in
        case 'tagged-posts':

            break;
        // posts created by the user
        case 'post':
            const userPosts = user.posts
            return posts.filter(post => userPosts.includes(post._id))

            break;
        // posts saved by the user
        case 'saved-posts':
            const savedIds = user.savedPostIds
            return posts.filter(post => savedIds.includes(post._id))

            break;

        default:
            break;
    }
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



//     utilService.saveToStorage(STORAGE_KEY, gPosts)


// })()