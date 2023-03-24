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
  }
 },
 actions: {
  loadUser({ commit }) {
   const loggedInUser = userService.getLoggedinUser()
   commit({ type: 'setUser', loggedInUser })
  }
 }
}