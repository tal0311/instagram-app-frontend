<template>
 <section class="user-posts">
  <!-- <ul class="posts-grid clean-list grid" v-if="posts && posts.length">
   <li v-for="post in posts" :key="post._id">
    <img :src="post.imgUrl" alt="">
   </li>
  </ul>
  <section class="no-posts" v-else>
   <div class="img"></div>
   <h2>No Posts Yet</h2>
  </section> -->

  <PostsList :posts="posts" />

 </section>
</template>

<script>
import PostsList from './PostsList.vue';
import { mapGetters, mapActions } from 'vuex'
export default {
 name: 'UserPosts',
 created() {

 },
 methods: {
  ...mapActions({
   setFilter: 'postStore/filterPosts'
  })
 },
 computed: {
  ...mapGetters({
   posts: 'postStore/getPosts',

  })
 },
 watch: {
  $route: {
   handler: function (val, oldVal) {
    console.log('route changed', val.name);
    // debugger
    this.setFilter({ filterBy: { userFilter: val.name } })

   },
   immediate: true,
   deep: true,
  },
 },
 components: {
  PostsList
 }
}
</script>

<style></style>