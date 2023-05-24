
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
  'story-circle': 'background-position: -304px -64px; width: 68px; height: 68px;',
  'arrow-blue-right': 'background-position: -370px -58px; width: 45px; height: 75px;',
  'arrow-left-black-small': 'background-position: -413px -59px; width: 15px; height: 23px;',
  'hash-tag': 'background-position: -413px -102px; width: 16px; height: 23px;',
  'left-arrow-no-bg': 'background-position: -188px -135px; width: 18px; height: 31px;',
  'right-arrow-no-bg': 'background-position: -272px -190px; width: 21px; height: 28px; ',
  'share': 'background-position: -229px -155px; width: 23px; height: 24px;',
  'like-small': 'background-position: -252px -155px; width: 28px; height: 24px;',
  'send-image': 'background-position: -279px -155px; width: 26px; height: 26px;',
  'google-play-logo': 'background-position: 2px -179px; width: 134px; height: 46px;',
  'app-store-logo': 'background-position: -129px -179px; width: 132px; height: 47px;',
  'microsoft-logo': 'background-position: 2px -223px; width: 124px; height: 45px;',
  'logo-white-small': 'background-position: -226px -224px; width: 32px; height: 34px;',
  'retry-black': 'background-position: -259px -224px; width: 28px; height: 31px;',
  'check-mark-circle': 'background-position: -303px -194px; width: 68px; height: 67px;',
  'logo-small-no-fill': 'background-position: -370px -278px; width: 44px; height: 43px;',
  'logo-small-fill': 'background-position: -369px -235px; width: 45px; height: 43px;',
  'verified-small': 'background-position: -243px -368px; width: 14px; height: 14px;'

 }

 return spriteOpts[type] || ''
}

