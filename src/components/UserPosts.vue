<template>
 <section class="user-posts">
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
 },
 methods: {
  ...mapActions({
   setFilter: 'postStore/filterPosts'
  }),

  loadPosts() {
   this.setFilter({ filterBy: { userFilter: this.$route.name }, userId: this.$route.params.userId })
  },
 },
 computed: {
  ...mapGetters({
   posts: 'postStore/getPosts',

  })

 },
 watch: {
  $route: {
   handler: function (val, oldVal) {
    this.loadPosts()
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