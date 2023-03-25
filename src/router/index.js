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
      path: '/new-post',
      name: 'new-post',
      component: UserArea
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin
    }

  ]
})


router.beforeEach((to, from, next) => {

  const user = store.getters['userStore/getUser']

  if (to.name !== 'login' && !user) {
    next({ name: 'login' })
    console.log('[redirected from guard]-[no logged user]')
  }
  else next()
})
export default router
