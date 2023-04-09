import { storageService } from "./async-storage.service";
import notifications from '../data/notification.json' assert {type: 'json'}
import { utilService } from "./util.service";
import { userService } from "./user.service";


export const msgService = {
 query,
 getDescription,
 add,
 remove
}

async function query(userId) {
 // debugger
 const msgs = await storageService.query('msg_db')
 return msgs.ownerId[userId] || {}
 //project msgs by ownerId
 // only return te msgs Preview without the history
 // return notifications
}

async function getByOwnerId(ownerId) {
 const msgCollection = await storageService.query('note_db')
 userMsgs = msgCollection.filter(item => item.ownerId === ownerId)
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
 storageService.saveToStorage('note_db', notifications)
 return userMsgs
}

// ; (() => {

//  utilService.saveToStorage('note_db', notifications)
// })()