<template>
 <h1>explore</h1>
 <!-- <pre>{{ posts }}</pre> -->
 <PostList :posts="posts" />
</template>
<script>

import PostList from './../components/PostsList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
 name: 'AppExplore',
 created() {
  this.loadPosts()
 },
 methods: {
  ...mapActions({
   getPosts: 'postStore/getExploreData'
  }),
  loadPosts() {
   this.getPosts()
  }
 },
 computed: {
  ...mapGetters({
   posts: 'postStore/getExplorePosts'
  })
 },
 components: {
  PostList
 }
}
</script>

<style></style>