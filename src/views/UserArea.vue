<template>
 <section class="user-area grid">
  <header>
   <UserPreview :user="user" is="user-area"></UserPreview>
   userInfo
  </header>
  <section class="dashboard-container">
   dashboard
  </section>
  <section class="router-container">
   <RouterLink v-for="route, idx in routes" :key="route.name" :to="{ name: routes[idx].name }">
    {{ routes[idx].title }}
   </RouterLink>

   <RouterView></RouterView>

  </section>
 </section>
</template>

<script>
import UserPreview from '../components/UserPreview.vue';
import { mapGetters, mapActions } from 'vuex'
export default {
 name: 'UserArea',
 data() {
  return {
   routes: [
    { title: 'Posts', name: 'post' },
    { title: 'Saved', name: 'saved-posts' },
    { title: 'Tagged', name: 'tagged-post' },


   ]
  }
 },
 created() {

 },
 computed: {

  ...mapGetters({
   //  posts: 'postStore/savedPosts',
   user: 'userStore/getUser'
  })


 },
 components: {
  UserPreview
 },
}
</script>

<style></style>