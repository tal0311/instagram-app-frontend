<template>
 <section class="user-area grid">

  <header class="grid">
   <UserPreview :user="user" is="user-area" />
   <article class="user-info-container">
    <h5>{{ user.fullname }}</h5>
    <p>בארץ ישראל, מי שלא מאמין בניסים הוא לא מציאותי - דוד בן גוריון</p>
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
  <RouterView></RouterView>

 </section>
</template>


<script>
// TODO: add tooltip 
import UserDashboard from '../components/UserDashboard.vue';
import UserPreview from '../components/UserPreview.vue';
import { mapGetters, mapActions } from 'vuex'
import UserDashboardVue from '../components/UserDashboard.vue';
import { eventBus } from './../services/event-bus.service'
export default {
 name: 'UserArea',
 created() {

 },
 data() {
  return {
   routes: [
    { title: 'Posts', name: 'post', icon: 'posts' },
    { title: 'Saved', name: 'saved-posts', icon: 'saved' },
    { title: 'Tagged', name: 'tagged-post', icon: 'tagged' },
   ],

  }
 },
 methods: {
  setPostCount(val) {
   this.postCount = val
  }
 },

 computed: {

  ...mapGetters({
   postCount: 'userStore/postCount',
   user: 'userStore/getUser'
  })


 },
 components: {
  UserPreview,
  UserDashboard
 },
}
</script>

<style></style>