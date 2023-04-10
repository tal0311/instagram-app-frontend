
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
      console.log('state.Msgs:', state.msgs)
      return state.msgs
    },
    getCurrentContact(state) {
      return state.currentContact
    }

  },
  mutations: {
    setMsgs(state, { msgs }) {
      state.msgs = msgs
      console.log('state.msgs:', state.msgs)

    },
    updateMsg(state, { msg }) {
      const idx = state.msgs.findIndex(p => p._id === msg._id)
      state.msgs.splice(idx, 1, msg)

    },

  },
  actions: {

    async loadMsgs({ commit, state }, { userId }) {
      try {
        console.log('loading msgs:', userId)
        const msgs = await msgService.query(userId)
        console.info('Msgs:', msgs)
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
    async filterMsgs({ dispatch, commit }, { filterBy, userId }) {
      commit({ type: 'setFilter', filterBy, userId })
      try {
        await dispatch('loadMsgs')
      } catch (error) {
        console.error('[Failed to filter Msgs]:', error)
      }
    },
    async getMsgCount({ state, commit }, { userId }) {

      // MsgService.query()
    },
    async MsgActions({ rootGetters, commit, dispatch }, { action, MsgId, comment = null }) {
      try {
        let msg = null
        const loggedInUser = rootGetters['userStore/getUser']
        switch (action) {
          case 'like':
            msg = await MsgService.addMsgLike(MsgId, loggedInUser._id)
            commit({ type: 'updateMsg', msg })
            break;
          case 'save':
            await dispatch('userStore/saveMsg', { MsgId }, { root: true })

            break;
          case 'comment':
            msg = await MsgService.addMsgComment(MsgId, comment.txt)
            commit({ type: 'updateMsg', msg })
            break;

          default:
            break;

        }
      } catch (error) {
        console.error(`[Error ${action}ing on msg ${MsgId}]:`, error)

      }
    },

    async getExploreData({ dispatch, commit }) {
      try {
        const exploreMsgs = await MsgService.getExploreDate()
        commit('setExploreMsgs', { exploreMsgs })
      } catch (error) {
        await dispatch('loadMsgs')
        console.error('[Error in getExploreData]:', error)
      }
    }
  },
}