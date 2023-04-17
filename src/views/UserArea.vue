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
    <button class="edit-profile ">Edit Profile</button>
   </article>
  </header>

  <UserDashboard :postCount="postCount" :user="user" />
  <section class="router-container grid">
   <RouterLink v-for="route, idx in routes" :key="route.name" :to="{ name: routes[idx].name }">
    <!-- {{ routes[idx].icon }} -->
    <i class="icon" :title="route.title" v-html="$getSvg(route.icon)"></i>
   </RouterLink>
  </section>
  <!-- <pre>{{ user }}</pre> -->
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
  // const { userId } = this.$route.params
  // this.user = await userService.getById(userId)
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

 },
 computed: {

  ...mapGetters({
   postCount: 'postStore/postCount',
   // user: 'userStore/getUser'
  })


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
  // this is to make sure the filter is reset when the component is unmounted 
  // this.setFilter({ filterBy: { userFilter: '' }, userId: '' })
 },
}
</script>

<style></style>