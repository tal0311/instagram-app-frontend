<template>
 <dialog v-if="story" ref="story" class="user-story">
  <span class="before" @click="storyChange(-1)" v-html="$getSvg('arrow-left')"> </span>
  <img :src="story.imgUrl" alt="story">
  <span class="after" @click="storyChange(1)" v-html="$getSvg('arrow-right')"></span>


  <form>
   <i @click="navigateTo" class="icon close-btn" v-html="$getSvg('times')"></i>
  </form>
 </dialog>
</template>

<script>
import { userService } from '../services/user.service.js'
import { mapActions } from 'vuex'
import { watch } from 'vue'
export default {
 name: 'UserStory',
 created() {
  const { userId, storyId } = this.$route.params
  this.getStory(userId, storyId)
 },
 updated() {
  this.$refs.story.showModal()
 },
 data() {
  return {
   story: null
  }
 },
 methods: {
  async getStory(userId, storyId) {
   try {
    this.story = await userService.getStory(userId, storyId)

   } catch (error) {
    console.error('[Could not Get Story]:', error)
   }

  },
  storyChange(diff) {
   console.log('diff:', diff)
   // const { userId, storyId } = this.$route.params
   // const storyIdx = this.story.user.stories.findIndex(story => story.id === storyId)
   // const nextStoryIdx = storyIdx + diff
   // const nextStory = this.story.user.stories[nextStoryIdx]
   // if (!nextStory) return
   // this.$router.push(`/stories/${userId}/${nextStory.id}`)
  },
  navigateTo() {
   this.$refs.story.close()
   this.$router.push('/')
  },
 },
 watch: {

 }
}
</script>

<style></style>