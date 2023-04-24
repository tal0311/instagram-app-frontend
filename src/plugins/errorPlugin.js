import { store } from '../store'
import { routerHistory } from './../router'
import { errorService } from '../services/error.service'


export default {
  install: (app) => {
    app.config.errorHandler = (err, instance, info) => {
      let user = store.getters['userStore/getUser']
      user = JSON.parse(JSON.stringify(user))
      errorService.logError(user, err, instance, info, routerHistory)

    }
  }
}