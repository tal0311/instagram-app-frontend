
export const spriteService = {
 getSprite
}

function getSprite(type) {

 const spriteOpts = {
  'logo-shadow': `background-position: -307px 0px;
    width: 62px;
    height: 63px;`,
  'big-hart': 'background-position: -5px -22px; width: 113px; height: 95px;',
  'lock': 'background-position: -128px 3px; width: 100px;  height: 100px; ',
  'lock-blue': 'background-position: -227px 1px; width: 78px;   height: 78px; ',
  'logo-withe': `background-position: -371px 0px;
    width: 60px;
    height: 60px;`,
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