<template>
 <article @click="navigateTo" :class="['user-preview grid', is]">
  <div class="gradient-wrapper">
   <img :src="user.imgUrl" alt="">
  </div>

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
   required: true

  },
 },
 created() {


 },
 methods: {
  navigateTo() {
   const cancelNavigation = ['user-area', 'nav']
   if (cancelNavigation.includes(this.is)) return
   this.$router.push(`/user/${this.user._id}`)
  }
 },
}
</script>

<style></style>