import { notificationService } from '../services/notification.service'
import { userService } from './../services/user.service'

export const userStore = {
  namespaced: true,
  state: {
    loggedInUser: null,
    users: null,
    filterBy: {},
    searchResultsUsers: {},
    notifications: null,
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
    },
    getSearchResults(state) {
      return state.searchResultsUsers
    },
    getNotifications(state) {
      console.log(state.notifications);
      return state.notifications
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
    },
    setUserFilterResults(state, { searchResultsUsers }) {
      state.searchResultsUsers = [...searchResultsUsers]
    },
    setNotifications(state, { notifications }) {
      state.notifications = notifications
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
    async usersFilter({ dispatch, commit }, { searchTerm }) {
      try {
        const searchResultsUsers = await userService.getUsersBySearch({ searchTerm })
        commit({ type: 'setUserFilterResults', searchResultsUsers })
      } catch (error) {
        throw 'Error while filtering users:', error
      }

    },
    async savePost({ commit, state }, { postId }) {
      const userId = state.loggedInUser._id
      try {
        const loggedInUser = await userService.toggleSavedPost(postId, userId)
        commit({ type: 'setUser', loggedInUser })
      } catch (error) {
        console.error(`[userStore/saveStore erroring 
     trying to save post with id ${postId}]:`, error)

      }
    },
    async userSignUp({ commit, state }, { user }) {
      try {
        const signedUser = await userService.signup(user)
        commit({ type: 'addSignedUser', signedUser })
        return
      } catch (error) {
        console.error('[Error while user sign in]:', error)
      }
    },
    async userLogin({ dispatch, commit }, { user }) {
      try {
        await userService.login(user)
        dispatch('loadUser')
        return
      } catch (error) {
        console.error('[Error while user login]:', error)
      }
    },
    async getUserNotification({ commit, state }) {
      const userId = state.loggedInUser._id
      try {
        const notifications = await notificationService.query(userId)
        commit({ type: 'setNotifications', notifications })
      } catch (error) {
        console.error('[Error while getting user notifications]:', error)
      }
    },
    async toggleFollow({ commit, state }, { userToToggle }) {

      let userToUpdate = state.loggedInUser
      userToUpdate = JSON.parse(JSON.stringify(userToUpdate))
      try {
        const updatedUser = await userService.toggleFollow(userToUpdate, userToToggle)
        commit({ type: 'setUser', loggedInUser: updatedUser })
      } catch (error) {
        throw 'Error while updating user:', error
      }
    },
    async updateUser({ commit, state }, { user }) {
      const updatedUser = await userService.update(user)
      commit({ type: 'setUser', loggedInUser: updatedUser })
    }
  }
}
