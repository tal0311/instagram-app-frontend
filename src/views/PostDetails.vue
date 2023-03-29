<template>
 <dialog ref="details-modal" class="post-details">
  <button @click="$router.go(-1)" class="close-btn" v-html="$getSvg('times')"></button>
  <PostPreview v-if="post" :post="post" is="details" />
  <!-- <pre>{{ post }}</pre> -->
 </dialog>
</template>

<script>

import { postService } from '../services/post.service.local';
import PostPreview from '../components/PostPreview.vue';
export default {
 name: 'PostDetails',
 async created() {
  this.post = await postService.getById(this.$route.params.id)
 },
 data() {
  return {
   post: null
  }
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