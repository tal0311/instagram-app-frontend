import { createStore } from 'vuex'
import { userStore } from './userStore'
import { postStore } from './postStore'

// Create a new store instance.
export const store = createStore({

 state: {
  msg: 'store connected'
 },
 mutations: {
 },
 getters: {
  getMsg({ msg }) {
   return msg
  }
 },
 modules: {
  postStore,
  userStore,
 }
})