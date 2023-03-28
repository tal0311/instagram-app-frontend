<template>
 <section class="user-area grid">
  <header class="grid">
   <UserPreview :user="user" is="user-area"></UserPreview>
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