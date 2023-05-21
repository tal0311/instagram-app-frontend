
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
    const posts = await httpService.query('post', filterBy)
    setTags(posts)
    return posts
}

async function setTags(posts) {
    // debugger
    //pass this to BE and get the tags from there
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



function getById(postId) {
    return httpService.get('post/' + postId)
}

async function remove(postId) {
    await httpService.remove('post/' + postId)
}

async function save(post) {
    var savedPost
    if (post._id) {
        savedPost = await httpService.put(`post/${post._id}`, post)
    } else {
        savedPost = await httpService.post('post', post)
    }
    return savedPost
}

async function addPostComment(postId, txt) {
    return await storageService.put(`post/${postId}/comment`, txt)
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