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
    setFilter(state, { filterBy }) {
      state.filter = { ...state.filter, ...filterBy }
      // console.log('state.filter:', state.filter)
    },
    setExplorePosts(state, { explorePosts }) {
      state.explorePosts = explorePosts

    }

  },
  actions: {
    async loadPosts({ commit, state }) {
      console.log('loading posts')
      try {
        const posts = await postService.query({ ...state.filter })
        commit({ type: 'setPosts', posts })
      } catch (error) {
        console.log('error trying to load posts:', error)
      }
    },
    async filterPosts({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy })
      try {
        await dispatch('loadPosts')
      } catch (error) {
        console.log(':',)
      }
    },
    async postActions({ commit, dispatch }, { action, postId, }) {
      try {

        let post = null
        switch (action) {
          case 'like':
            post = await postService.addPostLike(postId)
            commit({ type: 'updatePost', post })
            break;
          case 'save':
            dispatch('userStore/savePost', { postId }, { root: true })
            break;

          default:
            break;

        }
      } catch (error) {
        console.log(`[error ${action}ing on post ${postId}]:`, error)

      }
    },
    async setFilter({ commit, state }, { filter }) {
      commit({ type: 'setFilter', filter })
    },
    async getExploreData({ dispatch, commit }) {
      try {
        const explorePosts = await postService.getExploreDate()
        commit('setExplorePosts', { explorePosts })
      } catch (error) {
        await dispatch('loadPosts')
        console.log('[Error in getExploreData]:', error)
      }
    }
  },
}