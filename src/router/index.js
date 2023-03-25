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
      path: '/test',
      name: 'test',
      component: TestArea
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin
    }

  ]
})



const routerHistory = []
router.beforeEach((to, from, next) => {
  console.log('to:', to)
  console.log('router:', router)

  const avoidHistory = ['/new']
  if (!avoidHistory.includes(to.path)) {
    routerHistory.push(to.path)
    console.log('routerHistory:', routerHistory)
  }
  store.dispatch('userStore/loadUser')
  const user = store.getters['userStore/getUser']

  if (to.name !== 'login' && !user) {
    next({ name: 'login' })
    console.log('[redirected from guard]-[no logged user]')
  }
  if (to.path === '/new') {
    console.log('dispatch to store ope new post modal:')
    next(routerHistory.pop())

  }
  else next()
})
export default router
