<template>
 <section class="post-preview">
  <header class="post-header">
   <span>user-preview : {{ post.by.username }}</span> <span>{{ post.createdAt }}</span>
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
export default {
 name: 'PostPreview',
 props: {
  post: {
   type: Object,
   required: true,
  },
 },
}
</script>

<style></style>