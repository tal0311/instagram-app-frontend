import { storageService } from "./async-storage.service";
import msgs from '../data/msg.json' assert {type: 'json'}
import { store } from './../store'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
import { utilService } from "./util.service";
import { userService } from "./user.service";
import { httpService } from "./http.service";
import { th } from "element-plus/es/locale";




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
  return await httpService.get('msg')
 } catch (error) {
  throw error
 }

}

async function getByContactId(contactId) {
 try {
  return await httpService.get('msg/' + contactId)
 } catch (error) {
  throw error
 }
}

async function remove(ownerId, toId) {

}

async function add(msg) {
 try {
  return await httpService.post('msg/add', msg)
 } catch (error) {
  throw error
 }
}

// ; (() => {

//  utilService.saveToStorage('msg_db', msgs)
// })()