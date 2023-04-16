export default {
 install: (app) => {
  app.config.errorHandler = (err, instance, info) => {
   // handle error, e.g. report to a service
   console.log('global error handler:')
   console.error(`[error ${err}]:`, 'In cmp', instance.$.type.name, 'At', info)
  }
 }
}