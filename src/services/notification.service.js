import { storageService } from "./async-storage.service";
import notifications from '../data/notification.json' assert {type: 'json'}
import { utilService } from "./util.service";
import { userService } from "./user.service";


export const notificationService = {
 query,
 getDescription
}

async function query(userId) {
 // debugger
 const notifications = await storageService.query('note_db')
 return notifications[userId] || []
 // return notifications
}


function getDescription(type) {

 const descOpts = {
  'like': 'liked your post',
  'comment': 'commented on your post',
  'follow': 'started following you',
  'unfollow': 'unfollowed you',
  'mention': 'mentioned you in a comment',
  'tag': 'tagged you in a post',
  'save': 'saved your post',
  'unsave': 'unsaved your post',
  'share': 'shared your post',
  'request': 'requested to follow you',
  'accept': 'accepted your follow request',
  'save': 'saved your post',
  'send': 'sent you a message',


 }

 return descOpts[type] || type
}

// ; (() => {

//  utilService.saveToStorage('note_db', notifications)
// })()