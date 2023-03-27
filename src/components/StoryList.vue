<template>
 <section class="story-list grid">
  <UserPreview :user="userList" is="story" />
  <UserPreview :user="userList" is="story" />
  <UserPreview :user="userList" is="story" />
  <UserPreview :user="userList" is="story" />
  <UserPreview :user="userList" is="story" />
  <UserPreview :user="userList" is="story" />
  <UserPreview :user="userList" is="story" />
 </section>
</template>

<script>
import UserPreview from './UserPreview.vue';
export default {
 props: {
  userList: {
   type: Object,
   required: true
  }
 },
 name: 'StoryList',
 components: {
  UserPreview
 },
}
</script>

<style></style>