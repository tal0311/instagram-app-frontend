import { createRouter, createWebHashHistory } from 'vue-router'
import AppFeed from './../views/AppFeed.vue'
import AppExplore from './../views/AppExplore.vue'
import AppMessenger from '../views/AppMessenger.vue'
import UserArea from './../views/UserArea.vue'
import postDetails from './../views/PostDetails.vue'

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
          component: postDetails
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

  ]
})

export default router
