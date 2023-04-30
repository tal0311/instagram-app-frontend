


function getSprite(type) {

 const spriteOpts = {
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

 return spriteOpts[type] || ''
}