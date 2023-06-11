import { storageService } from "./async-storage.service";
import msgs from '../data/msg.json' assert {type: 'json'}
import { store } from './../store'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
import { utilService } from "./util.service";
import { userService } from "./user.service";
import { httpService } from "./http.service";



export const msgService = {
 query,
 add,
 remove,
 getByContactId
}

// ; (() => {
//  setTimeout(() => {
//   socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//    console.log('GOT from socket', review)
//    store.commit({ type: 'msgStore/updateDirectMsgs', review })
//   })
//   socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//    showSuccessMsg(`New review about me ${review.txt}`)
//   })
//  }, 0)

// })()


async function query() {
 try {
  const msgs = await httpService.get('msg')
  return msgs
 } catch (error) {
  throw error
 }

}

async function getByContactId(contactId) {
 const msgCollection = await httpService.get('msg/' + contactId)
 return {
  _id: contactId,
  ...msgCollection[0].history[contactId]
 }
}

async function remove(ownerId, toId) {
 const UserMsgs = await getByOwnerId(ownerId)
 delete UserMsgs.history[toId]
 storageService.put('msg_db', UserMsgs)

}

async function add(ownerId, data, to) {
 // later by backend
 const userMsgs = await getByOwnerId(ownerId)
 if (!userMsgs.history[to]) userMsgs.history[to] = []

 const msg = {
  id: utilService.makeId(),
  ...data
 }
 userMsgs.history[to].push(msg)

 // socket to user
 storageService.saveToStorage('msg_db', notifications)
 return userMsgs
}

; (() => {

 utilService.saveToStorage('msg_db', msgs)
})()