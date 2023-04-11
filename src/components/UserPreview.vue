<template>
 <article @click="navigateTo" :class="['user-preview grid', is]">
  <div class="gradient-wrapper">
   <img :src="user.imgUrl" alt="">
  </div>
  <template v-if="fullPreview">
   <div class="user-info grid">
    <p class="user-name">{{ user.username }}</p>
    <small class="fill-name">{{ user.fullname }}</small>
    <slot></slot>
   </div>

  </template>

 </article>
</template>

<script>
// TODO: refactor user preview to accept slot
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

  console.log('this.user:', this.user)
 },
 methods: {
  navigateTo() {
   const cancelNavigation = ['user-area', 'nav']
   if (this.is === 'story' && this.user.stories.length) {
    console.log('stories:', this.user.stories)
    this.$router.push(`/stories/${this.user._id}/${this.user.stories[0].id}`)
    return
   }
   if (this.is === 'msg-preview') {
    this.$router.push(`/direct/${this.user._id}`)
    return
   }
   if (cancelNavigation.includes(this.is)) return
   this.$router.push(`/user/${this.user._id}`)
  }
 },
 computed: {
  fullPreview() {
   const fullPreviewOpt = ['result', 'msg-preview',]
   return (fullPreviewOpt.includes(this.is))
  }
 }
}
</script>

<style></style>