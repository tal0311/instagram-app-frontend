import { createRouter, createWebHashHistory } from 'vue-router'
import AppFeed from './../views/AppFeed.vue'
import AppExplore from './../views/AppExplore.vue'
import AppMessenger from '../views/AppMessenger.vue'
import UserArea from './../views/UserArea.vue'
import PostDetails from './../views/PostDetails.vue'
import TestArea from './../views/TestingArea.vue'
import UserPosts from './../components/UserPosts.vue'

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
          props: true,
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
      path: '/user/:userId',
      name: 'user-area',
      component: UserArea,
      children: [
        {
          path: '/user/:userId',
          name: 'post',
          component: UserPosts
        },
        {
          path: 'saved',
          name: 'saved-posts',
          component: UserPosts
        },
        {
          path: 'tagged',
          name: 'tagged-post',
          component: UserPosts
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: "/user/:userId"
    },

  ]
})



const routerHistory = []
router.beforeEach((to, from, next) => {


  store.dispatch('userStore/loadUser')
  const user = store.getters['userStore/getUser']


  if (to.name !== 'login' && !user) {
    next({ name: 'login' })
    console.info('[redirected from guard]-[no logged user]')
  }

  if (to.name === 'explore' && !user.tags) {
    store.dispatch('postStore/getExploreData')

  }

  if (to.name === 'post') {
    console.log('post:',)
    const { userId } = to.params
    store.dispatch('postStore/getPostCount', { userId })
  }

  if (to.path.includes('user') && to.params.userId === ':userId') {
    next({ name: 'login' })
  }
  next()
})
export default router
