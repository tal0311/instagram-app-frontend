<template>
 <section class="post-preview">
  <header class="post-header">
   <UserPreview :user="post.by" is="preview" />
   <span>{{ post.createdAt }}</span>
   <address>{{ post.loc.name }}</address>
  </header>
  <div class="img-container">
   <img :src="post.imgUrl" alt="">
  </div>
  <div class="post-actions grid">
   <i v-html="$getSvg('like')"></i>
   <i v-html="$getSvg('comment')"></i>
   <i v-html="$getSvg('share')"></i>
   <i v-html="$getSvg('save')"></i>
  </div>
  <footer class="post-footer">
   <p>{{ post.txt }}</p>
   <span>comments</span>
  </footer>
 </section>
</template>

<script>
import UserPreview from './UserPreview.vue'
export default {
 name: 'PostPreview',
 props: {
  post: {
   type: Object,
   required: true,
  },
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>