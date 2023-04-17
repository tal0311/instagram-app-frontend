<template>
 <section v-if="user" class=" user-area grid">

  <header class="grid">
   <UserPreview :user="user" is="user-area" />
   <article class="user-info-container">
    <h5>{{ user.fullname }}</h5>
    <p>{{ user.bio }}</p>
   </article>
   <article class="user-settings-container grid">
    <p>{{ user.username }}</p>
    <i class="settings" v-html="$getSvg('settings')"></i>
    <button @click="userAction" :class="['edit-profile', setButtonState]">{{ setButtonState }}</button>
   </article>
  </header>

  <UserDashboard :postCount="postCount" :user="user" />
  <section class="router-container grid">
   <RouterLink v-for="route, idx in routes" :key="route.name" :to="{ name: routes[idx].name }">

    <i class="icon" :title="route.title" v-html="$getSvg(route.icon)"></i>
   </RouterLink>
  </section>

  <RouterView></RouterView>

 </section>
</template>


<script>
// TODO: add tooltip 
// TODO: add user settings
// TODO: add user Follow functionality
import UserDashboard from '../components/UserDashboard.vue';
import UserPreview from '../components/UserPreview.vue';
import { mapGetters, mapActions } from 'vuex'
import UserDashboardVue from '../components/UserDashboard.vue';
// import { eventBus } from './../services/event-bus.service'
import { userService } from '../services/user.service';

export default {
 name: 'UserArea',
 created() {
  this.loadUser()
 },
 data() {
  return {
   routes: [
    { title: 'Posts', name: 'post', icon: 'posts' },
    { title: 'Saved', name: 'saved-posts', icon: 'saved' },
    { title: 'Tagged', name: 'tagged-posts', icon: 'tagged' },
   ],
   user: null,

  }
 },
 methods: {
  async loadUser() {
   const { userId } = this.$route.params
   this.user = await userService.getById(userId)
  },
  userAction() {
   if (this.setButtonState === 'Edit Profile') {
    this.$router.push({ name: 'edit-profile', params: { userId: this.user._id } })
    return
   } else {

    this.$store.dispatch({
     type: 'userStore/toggleFollow',
     userToToggle: JSON.parse(JSON.stringify(this.user))
    })

   }
  }
 },
 computed: {
  ...mapGetters({
   postCount: 'postStore/postCount',
   loggedUser: 'userStore/getUser'
  }),
  setButtonState() {
   const { userId } = this.$route.params
   if (this.loggedUser._id === userId) {
    return 'edit profile'

   }
   if (this.loggedUser.following.some(f => f._id === userId)) {
    return 'following'

   }
   if (!this.loggedUser.following.some(f => f._id === userId)) {
    return 'follow'

   }
  }
 },
 components: {
  UserPreview,
  UserDashboard
 },
 beforeUnmount() {
  this.$store.dispatch({
   type: 'postStore/filterPosts',
   filterBy: { userFilter: '' },
   userId: ''
  })
 },
}
</script>

<style></style>