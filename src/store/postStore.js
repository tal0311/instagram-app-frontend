import { postService } from "../services/post.service.local"

export const postStore = {
  namespaced: true,
  state: {
    posts: null
  },
  getters: {
    getPosts(state) {
      return state.posts
    }
  },
  mutations: {
    setPosts(state, { posts }) {
      state.posts = posts
    },
    updatePost(state, { post }) {
      const idx = state.posts.findIndex(p => p._id === post._id)
      state.posts.splice(idx, 1, post)

    }
  },
  actions: {
    async loadPosts({ commit }) {
      const posts = await postService.query()

      commit({ type: 'setPosts', posts })
    },
    async postActions({ commit }, { action, postId, }) {
      // debugger

      try {

        let post = null
        switch (action) {
          case 'like':
            post = await postService.addPostLike(postId)
            break;

          default:
            break;

        }
        commit({ type: 'updatePost', post })
      } catch (error) {
        console.log(`[error ${action} on post ${postId}]:`, error)

      }
    }
  },
}