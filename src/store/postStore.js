import { postService } from "../services/post.service.local"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"

export const postStore = {
  namespaced: true,
  state: {
    posts: null,
    isModalOpen: false,
    explorePosts: null,

    filter: null
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
      console.info('loading posts with filter:', { ...state.filter })
      try {
        const posts = await postService.query({ ...state.filter })
        // console.info('posts:', posts)
        commit({ type: 'setPosts', posts })
        // if (state.filter.userFilter === 'post') commit('userStore/postCount', { count: posts.length }, { root: true })
      } catch (error) {
        console.error('[Error trying to load posts]:', error)
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
    // filtering  post in user area
    async filterPosts({ dispatch, commit }, { filterBy, userId }) {
      console.info('filterPosts filterBy, userId: ', filterBy, userId)
      commit({ type: 'setFilter', filterBy, userId })
      try {
        await dispatch('loadPosts')
      } catch (error) {
        console.error('[Failed to filter posts]:', error)
      }
    },
    // async setFilter({ commit, dispatch }, { filter, userId }) {
    //   console.log('userId:', userId)
    //   commit({ type: 'setFilter', filter, userId })
    //   dispatch('loadPosts')


    // },
    async postActions({ rootGetters, commit, dispatch }, { action, postId, }) {
      try {
        let post = null
        const loggedInUser = rootGetters['userStore/getUser']
        switch (action) {
          case 'like':
            post = await postService.addPostLike(postId, loggedInUser._id)
            commit({ type: 'updatePost', post })
            break;
          case 'save':
            dispatch('userStore/savePost', { postId }, { root: true })
            break;

          default:
            break;

        }
      } catch (error) {
        console.error(`[Error ${action}ing on post ${postId}]:`, error)

      }
    },

    async getExploreData({ dispatch, commit }) {
      try {
        const explorePosts = await postService.getExploreDate()
        commit('setExplorePosts', { explorePosts })
      } catch (error) {
        await dispatch('loadPosts')
        console.error('[Error in getExploreData]:', error)
      }
    }
  },
}