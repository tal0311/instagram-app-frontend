<template>
 <nav v-if="getUser" class="app-nav full main-layout">
  <div class="nav-container grid">

   <RouterLink v-for="(route, idx) in routes" :key="idx" :to="route.name">
    <i v-html="$getSvg(route.icon)"></i>
   </RouterLink>

   <i @click="openModal" v-html="$getSvg('new-post')"></i>

   <RouterLink :to="{
    name: 'post'
    , params: {
     userId: getUser._id
    }
   }">
    <UserPreview v-if="getUser" :user="getUser" is="nav" />
   </RouterLink>
  </div>

 </nav>
</template>

<script>


import { mapGetters, mapMutations, mapActions } from 'vuex';
import UserPreview from './UserPreview.vue';
export default {
 name: 'AppNav',
 created() {
  // this.$store.dispatch('userStore/loadUser');

 },

 data() {
  return {
   routes: [
    { name: '/', icon: 'home' },
    { name: '/search', icon: 'search' },
    { name: '/explore', icon: 'explore' },
    { name: '/direct', icon: 'inbox' },

   ]
  };
 },
 methods: {
  ...mapMutations({}),
  ...mapActions({
   loadUser: 'userStore/loadUser'
  }),

  openModal() {
   this.$store.commit('postStore/toggleModal');
  }
 },
 components: {
  UserPreview
 },
 computed: {
  ...mapGetters({
   getUser: 'userStore/getUser'
  }),
 }
}
</script>

<style></style>