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
    this.setFilter({ filterBy: { userFilter: val.name } })
   },
   immediate: true,
   deep: true,
  },
 },
 components: {
  PostsList
 },
 unmounted() {
  // this is to make sure the filter is reset when the component is unmounted 
  this.setFilter({ filterBy: { userFilter: '' } })
 }
}
</script>

<style></style>