<template>
 <section class="user-posts">
  <!-- <pre>{{ posts }}</pre> -->
  <PostsList :posts="posts" />
 </section>
</template>

<script>
import PostsList from './PostsList.vue';
import { mapGetters, mapActions } from 'vuex'
export default {
 name: 'UserPosts',
 created() {

  this.loadPosts()
  this.getPosts()

 },
 methods: {
  ...mapActions({
   setFilter: 'postStore/filterPosts'
  }),

  loadPosts() {
   this.setFilter({ filterBy: { userFilter: this.$route.name }, userId: this.$route.params.userId })
  },
  getPosts() {
   // console.log('this.posts:', this.posts)
  }
 },
 computed: {
  ...mapGetters({
   posts: 'postStore/getPosts',

  })

 },
 watch: {
  $route: {
   handler: function (val, oldVal) {
    // this.setFilter({ filterBy: { userFilter: val.name }, userId: val.params.userId })
    this.loadPosts()
    console.log('val:', val)
    // this.loadPosts()
   },
   immediate: true,
   deep: true,
  },
 },
 components: {
  PostsList
 },


}
</script>

<style></style>