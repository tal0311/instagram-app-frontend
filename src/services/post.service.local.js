
import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import gPosts from './../data/postsData.json' assert {type: 'json'}
import gTags from './../data/tags.json' assert {type: 'json'}
import { httpService } from './http.service.js'


const STORAGE_KEY = 'post_db'

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost,
    addPostComment,
    addPostLike,
    getExploreDate
}
window.ps = postService

async function query(filterBy = { txt: '', userFilter: '', userId: '' }) {
    // debugger
    let posts = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
    }
    if (filterBy.userId) {
        posts = await userFilter(posts, filterBy.userFilter, filterBy.userId)
    }
    setTags(posts)
    return posts
}

async function setTags(posts) {
    // debugger
    if (!posts || !posts.length) return
    posts = posts.map(post => {
        if (post.tags) {
            return post.tags
        }
    })
    const userTags = [...new Set(posts.flatMap(tag => tag))]
    const loggedInUser = userService.getLoggedinUser()
    const user = await userService.getById(loggedInUser._id)
    user.tags = userTags
    userService.update(user)
}

async function userFilter(posts, type, userId) {
    const user = await userService.getById(userId)
    // debugger
    switch (type) {
        // posts user tagged in
        case 'tagged-posts':
            return []
            break;
        // posts created by the user
        case 'post':
            return posts.filter(post => post.by._id === user._id)

            break;
        // posts saved by the user
        case 'saved-posts':
            const { savedPostIds } = user
            return posts.filter(post => savedPostIds.includes(post._id))
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
        savedPost = await httpService.post(STORAGE_KEY, post)
    }
    return savedPost
}



async function addPostComment(postId, txt) {
    // Later, this is all done by the backend

    const post = await getById(postId)
    debugger
    const { _id, fullname, username, imgUrl } = userService.getLoggedinUser()
    if (!post.comments) post.comments = []
    const comment = {
        id: utilService.makeId(),
        by: { _id, fullname, username, imgUrl },
        txt
    }
    post.comments.push(comment)
    await storageService.put(STORAGE_KEY, post)

    return post
}
async function addPostLike(postId, userId) {
    // Later, this is all done by the backend
    const post = await getById(postId)
    if (!post.likedBy) post.likedBy = []
    const { username: by, _id, imgUrl } = await userService.getById(userId)
    const user = await userService.getById(userId)

    const idx = post.likedBy.findIndex(by => by._id === _id)
    if (idx === -1) {
        const like = {
            _id: user._id,
            by: user.username,
            imgUrl: user.imagUrl
        }
        if (post.tags.length) {
            updateTags(post.tags, user)
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

async function updateTags(postTags, user) {
    if (postTags.length) {
        postTags.forEach(tag => {
            if (!user.tags.includes(tag)) {
                user.tags.push(tag)
            }
        });
    }
    userService.update(user)

}


async function getExploreDate() {
    // TODO: CONVERT TO HTTP SERVICE
    const loggedInUser = userService.getLoggedinUser()
    const user = await userService.getById(loggedInUser._id)
    const randomTags = getRandomTags(5)
    const tagsToExplore = [...user.tags, ...randomTags]
    try {
        const explorePosts = Promise.all(tagsToExplore.map(async tag => {
            const url = `https://source.unsplash.com/random/400x400/?${tag}`
            const res = await axios.get(url)
            return {
                imgUrl: res.request.responseURL,
                tag
            }

        }))
        // utilService.saveToStorage('explore_db', explorePosts)


        return explorePosts

    } catch (error) {
        throw new Error('Error while trying getting explore data' + error)

    }

}

function getRandomTags(numTags) {
    const randomTags = [];
    for (let i = 0; i < numTags; i++) {
        const randomIndex = Math.floor(Math.random() * gTags.length);
        randomTags.push(gTags[randomIndex]);
    }
    return randomTags;
}





// TEST DATA
// ; (() => {
//     utilService.saveToStorage(STORAGE_KEY, gPosts)
// })()