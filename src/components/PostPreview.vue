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
  <div class="post-actions">
   <button class="like-btn">like</button>
   <button class="comment-btn">comment</button>
   <button class="share-btn">share</button>
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