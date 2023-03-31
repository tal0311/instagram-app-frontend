import { userService } from './../services/user.service'

export const userStore = {
 namespaced: true,
 state: {
  loggedInUser: null
 },
 getters: {
  getUser(state) {
   return state.loggedInUser
  }
 },
 mutations: {
  setUser(state, { loggedInUser }) {
   state.loggedInUser = loggedInUser
  },
  updateUserPosts(state, { postId }) {
   console.log('postId:', postId)
  }
 },
 actions: {
  loadUser({ commit }) {
   const loggedInUser = userService.getLoggedinUser()
   commit({ type: 'setUser', loggedInUser })
  },
  async savePost({ commit }, { postId }) {
   try {
    const loggedInUser = await userService.toggleSavedPost(postId)
    commit({ type: 'setUser', loggedInUser })
   } catch (error) {
    console.log(`[userStore/saveStore erroring 
    trying to save post with id ${postId}]:`, error)

   }
  }
 }
}