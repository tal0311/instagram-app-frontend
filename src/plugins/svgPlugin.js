import { getSvg } from "../services/svg.service"

export default {
 install: (app) => {
  app.config.globalProperties.$getSvg = (key) => {
   return getSvg(key)
  }
 }
}

