import { store } from '../store'
import { errorService } from '../services/error.service'

window.addEventListener('error', (err) => {
  console.log('window.error:', err)
})
export default {
  install: (app) => {
    app.config.errorHandler = (err, instance, info) => {
      let user = store.getters['userStore/getUser']
      user = JSON.parse(JSON.stringify(user))
      errorService.logError(user, err, instance, info)
      console.error(`[global error handler ${err}]:`,
        'In cmp', instance.$.type.name, 'At', info)
    }
  }
}