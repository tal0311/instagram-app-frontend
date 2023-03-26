import { createRouter, createWebHashHistory } from 'vue-router'
import AppFeed from './../views/AppFeed.vue'
import AppExplore from './../views/AppExplore.vue'
import AppMessenger from '../views/AppMessenger.vue'
import UserArea from './../views/UserArea.vue'
import PostDetails from './../views/PostDetails.vue'
import TestArea from './../views/TestingArea.vue'
import AppLogin from './../views/AppLogin.vue'
import { store } from './../store/index'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppFeed,
      children: [
        {
          path: 'p/:id',
          name: 'details',
          component: PostDetails
        }
      ]
    },
    {
      path: '/explore',
      name: 'explore',
      component: AppExplore
    },
    {
      path: '/direct',
      name: 'feed',
      component: AppMessenger
    },
    {
      path: '/username',
      name: 'user-area',
      component: UserArea
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: "/"
    },

  ]
})



const routerHistory = []
router.beforeEach((to, from, next) => {
  console.log('routerHistory:', routerHistory)

  store.dispatch('userStore/loadUser')
  const user = store.getters['userStore/getUser']
  console.log('user:', user)

  if (to.name !== 'login' && !user) {
    next({ name: 'login' })
    console.log('[redirected from guard]-[no logged user]')
  }

  else next()
})
export default router
