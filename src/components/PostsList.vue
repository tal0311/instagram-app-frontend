<template>
 <section class="user-posts">

  <ul class="posts-grid clean-list grid" v-if="posts && posts.length">
   <li v-for="post in posts" :key="post._id">
    <img :src="post.imgUrl" alt="">
   </li>
  </ul>
  <section class="no-posts" v-else>
   <div :class="getNoDataImg"></div>
   <div>{{ getNoDataMsg }}</div>
   <SpinnerLoader v-if="$route.name === 'explore'" />
  </section>
 </section>
</template>

<script>
import SpinnerLoader from './SpinnerLoader.vue'
// TODO: FIX CONDITION TO FIT USER POSTS
export default {
 name: 'UserPosts',
 props: {
  posts: {
   type: Array,
  }
 },
 computed: {
  getNoDataImg() {
   return this.$route.name === 'explore' ? 'explore' : 'img'
  },
  getNoDataMsg() {
   return this.$route.name === 'explore' ? '' : 'No Posts Yet'
  }
 },
 components: {
  SpinnerLoader
 }
}
</script>

<style></style>