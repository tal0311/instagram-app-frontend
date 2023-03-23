<template>
 <nav class="app-nav full main-layout">
  <div class="nav-container grid">
   <RouterLink to="/">
    <i v-html="$getSvg('home')"></i>
   </RouterLink>
   <i v-html="$getSvg('search')"></i>
   <RouterLink to="/explore">
    <i v-html="$getSvg('explore')"></i>
   </RouterLink>
   <RouterLink to="/direct">
    <i v-html="$getSvg('inbox')"></i>
   </RouterLink>
   <RouterLink to="/new-post">
    <i v-html="$getSvg('new-post')"></i>
   </RouterLink>
   <RouterLink to="/username">
    <UserPreview :user="getUser" is="nav" />
   </RouterLink>
  </div>

 </nav>
</template>

<script>


import { mapGetters } from 'vuex';
import UserPreview from './UserPreview.vue';
export default {
 name: 'AppNav',
 created() {
  console.log('getUser:', this.getUser)
 },
 components: {
  UserPreview
 },
 computed: {
  ...mapGetters(['getUser'])
 }
}
</script>

<style></style>