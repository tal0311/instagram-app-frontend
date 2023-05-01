
export const spriteService = {
 getSprite
}

function getSprite(type) {

 const spriteOpts = {
  'logo-shadow': 'background-position: -307px 0px; width: 62px; height: 63px;',
  'big-hart': 'background-position: -5px -22px; width: 113px; height: 95px;',
  'lock': 'background-position: -128px 3px; width: 100px; height: 100px;',
  'lock-blue': 'background-position: -227px 1px; width: 78px; height: 78px; ',
  'logo-withe': 'background-position: -371px 0px; width: 60px; height: 60px;',
  'logo-display': 'background-position: 6px -126px; width: 182px; height: 57px;',
  'story-arrow-left': 'background-position: -131px -100px; width: 28px; height: 26px;',
  'story-arrow-left': 'background-position: -163px -100px; width: 28px; height: 26px;',
  'tunnel': 'background-position: -193px -97px; width: 32px; height: 32px;',
  'circle-play-btn': 'background-position: -227px -77px; width: 78px; height: 78px;',
  'story-circle': 'background-position: -304px -64px; width: 68px; height: 68px;'

 }

 return spriteOpts[type] || ''
}