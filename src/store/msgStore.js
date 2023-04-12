
import { msgService } from "../services/msg.service.js"
import { utilService } from "../services/util.service"

export const msgStore = {
  namespaced: true,
  state: {
    msgs: null,
    currentContact: null,
  },
  getters: {
    getMsgs(state) {
      return state.msgs
    },
    getCurrentContact(state) {
      return state.currentContact
    }

  },
  mutations: {
    setMsgs(state, { msgs }) {
      state.msgs = msgs
    },
    updateMsg(state, { msg }) {
      const idx = state.msgs.findIndex(p => p._id === msg._id)
      state.msgs.splice(idx, 1, msg)

    },
    setCurrentContact(state, { contact }) {
      state.currentContact = contact
    },
    updateDirectMsgs(state, { msg }) {
      state.currentContact.msgs.push(msg)
    },
  },
  actions: {

    async loadMsgs({ commit, state }, { userId }) {
      try {
        const msgs = await msgService.query(userId)
        commit({ type: 'setMsgs', msgs })
        // if (state.filter.userFilter === 'msg') commit('userStore/MsgCount', { count: Msgs.length }, { root: true })
      } catch (error) {
        console.error('[Error trying to load Msgs]:', error)
      }
    },
    async addMsg({ commit }, { msg }) {
      try {
        const MsgToAdd = await MsgService.save({ ...msg })
        commit({ type: 'publishMsg', MsgToAdd })
      } catch (error) {
        console.error('[Error trying to Add msg]:', error)
      }
    },
    // filtering  msg in user area by userId

    async loadCurrentContact({ commit }, { contactId }) {
      try {
        const contact = await msgService.getByContactId(contactId)
        commit({ type: 'setCurrentContact', contact })
      } catch (error) {
        console.error('[Error trying to load current contact]:', error)
      }
    }
  },
}