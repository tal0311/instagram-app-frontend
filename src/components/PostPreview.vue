<template>
  <section :class="getClass">
    <header class="post-header grid">
      <UserPreview :user="post.by" is="preview" />
      <div class="info grid">
        <span class="username">{{ post?.by?.username }}</span>
        <template v-if="is !== 'details'">
          <span>•</span>
          <span>{{ formattedTime(post.createdAt) }}</span>
        </template>
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
      <p v-if="is !== 'details'">{{ post.tags }} </p>
      <p @click="navigateTo" class="comments">{{ commentsTitle }}</p>
      <div class="add-comment">
        <textarea v-model="comment.txt" @input="setTextLength" name="txt" id="" cols="50" rows="1"
          placeholder="Add a comment..."></textarea>
        <section class="comments-container" v-if="is === 'details' && isCommentsOpen">
          <ul class="clean-list" v-for="(comment, idx) in post.comments" :key="idx">
            <li>{{ comment.txt }}</li>
          </ul>
        </section>
        <button v-if="isTyping" @click="addComment">Post</button>
      </div>
    </footer>
  </section>
</template>

<script>


import { formattedRelativeTime } from '../services/timeService'
import UserPreview from './UserPreview.vue'
export default {
  name: 'PostPreview',
  props: {
    is: {
      type: String,
      default: 'preview'
    },
    post: {

      type: Object,
      required: true,
    },
  },
  created() {

  },
  data() {
    return {
      actions: [
        { name: 'like', icon: '' },
        { name: 'comment', icon: 'comment' },
        { name: 'share', icon: 'share' },
        { name: 'save', icon: 'save' },
      ],
      comment: {
        txt: '',
      },
      isTyping: false,
      isCommentsOpen: false

    }
  },
  methods: {
    formattedTime(ts) {
      return formattedRelativeTime(ts)
    },
    addComment() {

    },
    setTextLength({ target }) {
      if (target.value.length > 0) this.isTyping = true
      else this.isTyping = false
    },
    navigateTo() {
      if (this.is === 'details') this.isCommentsOpen = !this.isCommentsOpen
      else
        this.$router.push(`/p/${this.post._id}`)
    }

  },
  computed: {
    commentsTitle() {

      if (!this.post.comments.length) return 'Be the first to comment'
      if (this.post.comments.length >= 1) return `view all ${this.post.comments.length} comment`

    },

    getClass() {
      const user = this.$store.getters['userStore/getUser']
      const isLiked = this.post?.likedBy?.some(by => by._id === user._id)
      const isSaved = user.savedPostIds.includes(this.post._id)
      this.actions[0].icon = isLiked ? 'like-full' : 'like'
      this.actions[3].icon = isSaved ? 'save-full' : 'save'
      return `post-preview ${this.is} ${this.post._id} ${isLiked ? 'isLiked' : ''} ${isSaved ? 'isSaved' : ''}`
    },

  },
  components: {
    UserPreview
  }
}
</script>

<style></style>