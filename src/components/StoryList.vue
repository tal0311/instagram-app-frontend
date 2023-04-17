<template>
 <!-- <section class="grid list-wrapper"> -->
 <!-- <span class="vertical-text left-arrow" v-html="$getSvg('story-scroll')"></span> -->
 <section class="story-list grid">
  <UserPreview :user="user" is="story" />
  <UserPreview v-for="story in userList" :key="story._id" :user="story" is="story" />
 </section>
 <!-- <span class="vertical-text right-arrow" v-html="$getSvg('story-scroll')"></span> -->
 <!-- </section> -->
</template>

<script>
// todo: filter non active story users
import UserPreview from './UserPreview.vue';
export default {
 props: {
  userList: {
   type: Object,
   required: true
  },
  user: {
   type: Object,
   required: true
  }
 },
 name: 'StoryList',
 components: {
  UserPreview
 },
 created() {
  // for scrolling the story list
  // document.querySelector('.story-list').scrollBy({ left: 200, behavior: "smooth", })
 }
}
</script>

<style></style>