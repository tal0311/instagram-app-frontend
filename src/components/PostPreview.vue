<template>
 <section class="post-preview">
  <header class="post-header grid">
   <UserPreview :user="post.by" is="preview" />
   <div class="info grid">
    <span class="username">{{ post.by.username }}</span>
    <span>•</span>
    <span>{{ formattedTime }}</span>
    <small>{{ post.loc.name || 'Tel Aviv' }}</small>
   </div>
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

import { formattedRelativeTime } from '../services/timeService'
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
 },
 computed: {
  formattedTime() {
   return formattedRelativeTime(this.post.createdAt)
  }
 },
}
</script>

<style></style>