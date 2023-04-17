import { httpService } from "./http.service"
import { utilService } from "./util.service"
export const errorService = {
 logError
}

function logError(user, err, instance, info) {
 const errorToLog = _createNewError(user, err, instance, info)
 console.log('%cError', _getStyles(), errorToLog)
}


function _createNewError(user, err, instance, info) {
 return {
  _id: utilService.makeId(),
  desc: `[global error handler ${err}]`,
  user,
  info,
  instance: instance.$.type.name

 }
}


function _getStyles() {
 return 'color:#fff; background:red; padding:5px; border-radius:5px; font-weight:bold'
} 