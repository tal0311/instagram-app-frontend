import { userService } from './../services/user.service'

export const userStore = {
 namespaced: true,
 state: {
  loggedInUser: null,
  postCount: 0,
  users: null
 },
 getters: {
  getUser(state) {
   return state.loggedInUser
  },
  getUsers(state) {
   // if (!state.users) return
   return state.users
  },
  postCount(state) {
   return state.postCount
  }
 },
 mutations: {
  setUser(state, { loggedInUser }) {
   state.loggedInUser = loggedInUser
  },
  postCount(state, { count }) {
   state.postCount = count
  },
  setUsers(state, { users }) {
   state.users = users
  }
 },
 actions: {
  loadUser({ commit }) {
   const loggedInUser = userService.getLoggedinUser()
   commit({ type: 'setUser', loggedInUser })
  },
  async loadUsers({ state, commit }) {
   const users = await userService.getUsers()
   commit({ type: 'setUsers', users })
  },
  async savePost({ commit }, { postId }) {
   try {
    const loggedInUser = await userService.toggleSavedPost(postId)
    commit({ type: 'setUser', loggedInUser })
   } catch (error) {
    console.error(`[userStore/saveStore erroring 
    trying to save post with id ${postId}]:`, error)

   }
  }
 }
}