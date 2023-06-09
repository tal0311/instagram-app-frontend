import { createRouter, createWebHashHistory } from 'vue-router'
import AppFeed from './../views/AppFeed.vue'
import AppExplore from './../views/AppExplore.vue'
import AppMessenger from '../views/AppMessenger.vue'
import UserArea from './../views/UserArea.vue'
import PostDetails from './../views/PostDetails.vue'
import UserStory from './../views/UserStory.vue'
import TestArea from './../views/TestingArea.vue'
import UserNotification from './../views/UserNotification.vue'
import MsgDetails from './../views/MsgDetails.vue'
import UserEdit from './../views/UserEdit.vue'

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
      name: 'inbox',
      component: AppMessenger,
      children: [
        {
          path: '/direct/:byId',
          name: 'msg-details',
          component: MsgDetails,
        }
      ]
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
          name: 'tagged-posts',
          component: UserPosts
        }
      ]
    },
    {
      path: '/user/edit/:userId',
      name: 'edit-profile',
      component: UserEdit,

    },
    {
      path: '/stories/:userId/:storyId',
      name: 'stories',
      component: UserStory
    },
    {
      path: '/notification',
      name: 'notification',
      component: UserNotification
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin
    },
    {
      path: '/test',
      name: 'test',
      component: TestArea
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: "/user/:userId"
    },

  ]
})



export const routerHistory = []
router.beforeEach((to, from, next) => {


  store.dispatch('userStore/loadUser')
  const user = store.getters['userStore/getUser']

  routerHistory.push(to)
  if (to.name !== 'login' && !user) {
    next({ name: 'login' })
    throw 'redirected from guard-no logged user'
  }

  if (to.name === 'explore' && !user.tags) {
    store.dispatch('postStore/getExploreData')

  }

  if (to.name === 'post') {
    const { userId } = to.params
    store.dispatch('postStore/getPostCount', { userId })
  }
  if (to.name === 'inbox') {

    store.dispatch('msgStore/loadMsgs', { userId: user._id })
  }

  if (to.path.includes('user') && to.params.userId === ':userId') {
    next({ name: 'login' })

  }
  if (to.name === 'msg-details') {
    store.dispatch('msgStore/loadCurrentContact', { contactId: to.params.byId })
  }
  next()
})
export default router
