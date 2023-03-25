<template>
 <article :class="['user-preview grid', is]">
  <div class="gradient-wrapper">
   <img :src="user.imgUrl" alt="">
  </div>
  <span v-if="!is === 'nav'">{{ user.username }}</span>
 </article>
</template>

<script>
// TODO: add user story on user entity
export default {
 name: 'UserPreview',
 props: {
  is: {
   type: String,
   default: 'preview'
  },
  user: {
   type: Object,

  },
 },
 created() {
  // console.log('user', this.user);
 }
}
</script>

<style></style>