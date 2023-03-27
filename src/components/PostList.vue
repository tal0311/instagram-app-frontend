<template>
 <section class="post-list">
  <ul v-if="posts && posts.length">
   <li v-for="post in posts" :key="post._id">
    <img :src="post.imgUrl" alt="">
   </li>
  </ul>
  <section class="no-posts" v-else>
   <div class="img"></div>
   <h2>No posts to Yet</h2>
  </section>

 </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
 name: 'PostList',
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
 }
}
</script>

<style></style>