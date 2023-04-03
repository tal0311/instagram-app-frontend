import { userService } from './../services/user.service'

export const userStore = {
 namespaced: true,
 state: {
  loggedInUser: null,
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
  },
  addSignedUser(state, { user }) {
   state.users.push(user)
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
  async savePost({ commit, state }, { postId }) {
   console.log('postId:', postId,)
   const userId = state.loggedInUser._id
   try {
    // debugger
    const loggedInUser = await userService.toggleSavedPost(postId, userId)
    // console.log('savedposts:', savedPostsId)
    commit({ type: 'setUser', loggedInUser })
   } catch (error) {
    console.error(`[userStore/saveStore erroring 
    trying to save post with id ${postId}]:`, error)

   }
  },
  async userSignUp({ commit, state }, { user }) {
   try {
    console.log('user from store:', user)
    const signedUser = await userService.signup(user)
    commit({ type: 'addSignedUser', signedUser })
    return
   } catch (error) {
    console.error('[Error while user sign in]:', error)
   }
  },
  async userLogin({ dispatch, commit }, { user }) {
   try {
    // console.log('login user:', user)
    await userService.login(user)
    dispatch('loadUser')
    return
   } catch (error) {

   }
  }
 }
}