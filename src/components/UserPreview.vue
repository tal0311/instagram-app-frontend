<template>
 <article :class="['user-preview grid', is]">
  <img :src="user.imgUrl" alt="">
  <span v-if="!is === 'nav'">{{ user.username }}</span>
 </article>
</template>

<script>
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