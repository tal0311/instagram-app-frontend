<template>
 <section class="story-list grid">
  <UserPreview :user="user" is="story" />
  <UserPreview v-for="story in userList" :key="story._id" :user="story" is="story" />
 </section>
</template>

<script>
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

 }
}
</script>

<style></style>