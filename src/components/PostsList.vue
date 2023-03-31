<template>
 <section class="user-posts">

  <ul class="posts-grid clean-list grid" v-if="posts && posts.length">
   <li v-for="post in posts" :key="post._id">
    <img :src="post.imgUrl" alt="">
   </li>
  </ul>
  <section class="no-posts" v-else>
   <div :class="getNoDataImg"></div>
   <h2>{{ getNoDataMsg }}</h2>
  </section>
 </section>
</template>

<script>
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
   return this.$route.name === 'explore' ? 'Exploring...' : 'No Posts Yet'
  }
 }
}
</script>

<style></style>