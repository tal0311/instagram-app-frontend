import { store } from '../store'
import { errorService } from '../services/error.service'

window.addEventListener('error', (err) => {
  console.log('window.error:', err)
})
export default {
  install: (app) => {
    app.config.errorHandler = (err, instance, info) => {
      const user = store.getters['user/getUser']
      // handle error, e.g. report to a service
      errorService.logError(user, err, instance, info)
      console.error(`[global error handler ${err}]:`,
        'In cmp', instance.$.type.name, 'At', info)
    }
  }
}