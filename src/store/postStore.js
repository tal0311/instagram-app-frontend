import { postService } from "../services/post.service.local"

export const postStore = {
 state: {
  posts: []
 },
 getters: {
  getPosts(state) {
   return state.posts
  }
 },
 mutations: {
  setPosts(state, { posts }) {
   state.posts = posts
  }
 },
 actions: {
  async loadPosts({ commit }) {
   const posts = await postService.query()
   console.log('posts:', posts)
   commit({ type: 'setPosts', posts })
  }
 }
}