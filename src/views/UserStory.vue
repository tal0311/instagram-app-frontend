<template>
 <dialog v-if="story" ref="story" class="user-story">
  <header class="story-heder grid">
   <UserPreview :user="user" is="story-on" />
   <p>{{ user.fullname }}</p>
   <!-- <p>{{ story.createdAt }}</p> -->
  </header>
  <span class="before" @click="storyChange(-1)" v-html="$getSvg('arrow-left')"> </span>
  <img :src="story.imgUrl" alt="story">
  <span class="after" @click="storyChange(1)" v-html="$getSvg('arrow-right')"></span>

  <form>
   <i @click="navigateTo" class="icon close-btn" v-html="$getSvg('times')"></i>
  </form>
 </dialog>
</template>

<script>
// TODO: ADD SWIPE TO STORY
// TODO: ADD STORY TIME

import { userService } from '../services/user.service.js'
import { mapActions } from 'vuex'
import UserPreview from '../components/UserPreview.vue'
export default {
 name: 'UserStory',
 created() {
  const { userId, storyId } = this.$route.params
  this.getStory(userId, storyId)
  this.storyInt = setInterval(() => {
   this.storyChange(1)
  }, 5000)
 },
 updated() {
  if (this.$refs.story && this.$refs.story.open) return
  this.$refs.story.showModal()
 },
 beforeUnmount() {
  this.$refs.story.close()
 },
 data() {
  return {
   story: null,
   user: null
  }
 },
 methods: {
  async getStory(userId, storyId) {
   try {
    this.user = await userService.getStory(userId)
    this.story = this.user.stories.find(story => story.id === storyId)
   } catch (error) {
    console.error('[Could not Get Story]:', error)
   }
  },
  storyChange(diff) {
   const { userId, storyId } = this.$route.params
   let storyIdx = this.user.stories.findIndex(story => story.id === storyId)
   const nextStoryIdx = storyIdx += diff
   const nextStory = this.user.stories[nextStoryIdx]
   if (!nextStory) {
    this.navigateTo()
    return
   }
   this.$router.push(`/stories/${userId}/${nextStory.id}`)
  },
  navigateTo() {
   this.$refs.story.close()
   this.$router.push('/')
  },
 },
 watch: {
  $route: {
   deep: true,
   handler(val, oldVal) {
    const { userId, storyId } = val.params
    this.getStory(userId, storyId)
   }
  },
 },
 unmounted() {
  clearInterval(this.storyInt)
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>