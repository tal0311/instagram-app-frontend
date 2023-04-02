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
   console.log('this.posts:', this.posts)
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
    console.log('wathceing:')
    this.setFilter({ filterBy: { userFilter: val.name }, userId: val.params.userId })

   },
   immediate: true,
   deep: true,
  },
 },
 components: {
  PostsList
 },
 beforeUnmount() {
  // this is to make sure the filter is reset when the component is unmounted 
  this.setFilter({ filterBy: { userFilter: '' }, userId: '' })
 },

}
</script>

<style></style>