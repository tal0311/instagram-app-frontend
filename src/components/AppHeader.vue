<template>
 <header class="app-header full main-layout">
  <section class="header-container">
   <i class="icon logo" v-html="$getSvg('logo')"></i>

   <form @submit.prevent="">
    <input @input="onSearch" type="search" name="search" placeholder="Search">
    <div v-if="isResults" class="search-preview">
     <UserPreview v-for="(user, idx) in users" :key="idx" :user="user" is="results" />
    </div>
   </form>

   <i class="icon" @click="$router.push(`/notification`)" v-html="$getSvg('like')"></i>
  </section>
 </header>
</template>

<script>
import UserPreview from './UserPreview.vue';
import { mapActions, mapGetters } from 'vuex'
import { utilService } from '../services/util.service';
export default {
 name: 'AppHeader',
 created() {
  console.log('AppHeader created');
  this.onSearch = utilService.debounce(this.onSearch, 500)
 },
 data() {
  return {
   isResults: false
  }
 },
 methods: {
  ...mapActions({
   filterUsers: 'userStore/usersFilter'
  }),
  onSearch(ev) {
   if (!ev.target.value) {
    this.isResults = false;
   }
   else {
    this.isResults = true;
   }
   this.filterUsers({ searchTerm: ev.target.value })
  }
 },
 computed: {
  ...mapGetters({
   users: 'userStore/getSearchResults',
   user: 'userStore/getUser'
  }),
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>