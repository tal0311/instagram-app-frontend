
import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

// import gPosts from './../data/postsData.json' assert {type: 'json'}
import gTags from './../data/tags.json' assert {type: 'json'}
import { httpService } from './http.service.js'


// const STORAGE_KEY = 'post_db'

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
    try {
        return await httpService.get('post', filterBy)
    } catch (error) {
        throw error
    }
}

async function getById(postId) {
    try {
        return await httpService.get('post/' + postId)
    } catch (error) {
        throw error
    }
}

async function remove(postId) {
    try {
        return await httpService.remove('post/' + postId)
    } catch (error) {
        throw error
    }
}

async function save(post) {
    try {
        var savedPost
        if (post._id) {
            savedPost = await httpService.put(`post/${post._id}`, post)
        } else {
            savedPost = await httpService.post('post', post)
        }
        return savedPost
    } catch (error) {
        throw error
    }
}

async function addPostComment(postId, txt) {
    try {
        return await httpService.put(`post/${postId}/comment`, txt)
    } catch (error) {
        throw error
    }
}

async function addPostLike(postId) {
    try {
        return await httpService.put(`post/${postId}/like`)
    } catch (error) {
        throw error
    }
}

function getEmptyPost() {
    return {
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