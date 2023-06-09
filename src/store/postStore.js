import { postService } from "../services/post.service.local"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"

export const postStore = {
  namespaced: true,
  state: {
    posts: null,
    isModalOpen: false,
    explorePosts: null,
    filter: null,

  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    isModalOpen(state) {
      return state.isModalOpen
    },
    getExplorePosts(state) {
      return state.explorePosts
    },
    postCount(state) {
      // this is to over com the problem of the refresh userArea refresh
      if (!state.posts) return 0
      return state.posts.length
    }

  },
  mutations: {
    setPosts(state, { posts }) {
      state.posts = posts
    },
    updatePost(state, { post }) {
      const idx = state.posts.findIndex(p => p._id === post._id)
      state.posts.splice(idx, 1, post)

    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen
    },
    setFilter(state, { filterBy, userId }) {
      state.filter = { ...state.filter, ...filterBy, userId }
    },
    setExplorePosts(state, { explorePosts }) {
      state.explorePosts = explorePosts
    },
    publishPost(state, { postToAdd }) {
      state.posts.unshift(postToAdd)
    }
  },
  actions: {
    async loadPosts({ commit, state }) {
      try {
        const posts = await postService.query({ ...state.filter })
        commit({ type: 'setPosts', posts })
      } catch (error) {
        throw 'Can not load posts'
      }
    },
    async addPost({ commit }, { post }) {
      try {
        const postToAdd = await postService.save({ ...post })
        commit({ type: 'publishPost', postToAdd })
      } catch (error) {
        console.error('[Error trying to Add post]:', error)
      }
    },
    // filtering  post in user area by userId
    async filterPosts({ dispatch, commit }, { filterBy, userId }) {
      commit({ type: 'setFilter', filterBy, userId })
      try {
        await dispatch('loadPosts')
      } catch (error) {
        console.error('[Failed to filter posts]:', error)
      }
    },
    async getPostCount({ state, commit }, { userId }) {

      // postService.query()
    },
    async postActions({ rootGetters, commit, dispatch }, { action, postId, comment = null }) {
      try {
        let post = null
        const loggedInUser = rootGetters['userStore/getUser']
        switch (action) {
          case 'like':
            post = await postService.addPostLike(postId, loggedInUser._id)
            commit({ type: 'updatePost', post })
            break;
          case 'save':
            await dispatch('userStore/savePost', { postId }, { root: true })

            break;
          case 'comment':
            post = await postService.addPostComment(postId, comment)
            commit({ type: 'updatePost', post })
            break;

          default:
            break;

        }
      } catch (error) {
        throw `Error ${action}ing on post ${postId} error: ${error} `

      }
    },

    async getExploreData({ dispatch, commit }) {
      try {
        const explorePosts = await postService.getExploreDate()
        commit('setExplorePosts', { explorePosts })
      } catch (error) {
        await dispatch('loadPosts')
        throw 'Error in getExploreData:'
      }
    }
  },
}