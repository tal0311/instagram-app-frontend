<template>
  <section :class="getClass">
    <!-- <pre>{{ isLiked }}</pre> -->
    <header class="post-header grid">
      <UserPreview :user="post.by" is="preview" />
      <div class="info grid">
        <span class="username">{{ post?.by?.username }}</span>
        <span>•</span>
        <span>{{ formattedTime(post.createdAt) }}</span>
        <small>{{ post?.loc?.name || 'Tel Aviv' }}</small>
      </div>
    </header>
    <div class="img-container">
      <img :src="post.imgUrl" alt="">
    </div>
    <div class="post-actions grid">
      <i v-for="(action, idx) in actions" :key="idx" @click="$emit('action', { action: action.name, postId: post._id })"
        v-html="$getSvg(action.icon)"></i>
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
  created() {
    const userId = this.$store.getters['userStore/getUser']._id
    console.log(' liked:', this.post.likedBy.some(by => by._id === userId))
  },
  data() {
    return {
      actions: [
        { name: 'like', icon: '' },
        { name: 'comment', icon: 'comment' },
        { name: 'share', icon: 'share' },
        { name: 'save', icon: 'save' },
      ],

    }
  },
  methods: {
    formattedTime(ts) {
      return formattedRelativeTime(ts)
    },


  },
  computed: {

    getClass() {
      const userId = this.$store.getters['userStore/getUser']._id
      const isLiked = this.post.likedBy.some(by => by._id === userId)
      this.actions[0].icon = isLiked ? 'like-full' : 'like'
      console.log('this.actions[0].icon:', this.actions[0].icon, isLiked)
      return `post-preview ${this.post._id} ${isLiked ? 'isLiked' : ''}`

    },

  },
  components: {
    UserPreview
  }
}
</script>

<style></style>