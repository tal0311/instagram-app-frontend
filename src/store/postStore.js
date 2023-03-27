import { postService } from "../services/post.service.local"
import { userService } from "../services/user.service"

export const postStore = {
  namespaced: true,
  state: {
    posts: null,
    isModalOpen: false,
    userPosts: null,
    filter: {}
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    isModalOpen(state) {
      return state.isModalOpen
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
    }

  },
  actions: {
    async loadPosts({ commit, state }) {
      const posts = await postService.query(state.filter)
      commit({ type: 'setPosts', posts })
    },
    async postActions({ commit, dispatch }, { action, postId, }) {
      // debugger

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
    }
  },
}