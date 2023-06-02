<template>
 <dialog ref="details-modal" class="post-details">
  <button @click="$router.go(-1)" class="close-btn" v-html="$getSvg('times')"></button>
  <PostPreview @action="onPostAction" v-if="post" :post="post" :loggedUser="getUser" is="details" />
  <!-- <pre>{{ post }}</pre> -->
 </dialog>
</template>

<script>

import { mapGetters } from 'vuex'
import { postService } from '../services/post.service.local';
import PostPreview from '../components/PostPreview.vue';
export default {
 name: 'PostDetails',
 async created() {
  await this.getSelectedPost()
 },
 data() {
  return {
   post: null
  }
 },
 methods: {
  async onPostAction({ action, postId, comment = null }) {
   await this.$store.dispatch('postStore/postActions', { action, postId, comment })
   this.getSelectedPost()
  },
  async getSelectedPost() {
   this.post = await postService.getById(this.$route.params.id)
  },
 },
 computed: {
  ...mapGetters({
   getUser: 'userStore/getUser',
  }),
 },

 mounted() {
  this.$refs['details-modal'].showModal()
 },
 beforeUnmount() {
  this.$refs['details-modal'].close()
 },
 components: {
  PostPreview
 }

}
</script>

<style></style>