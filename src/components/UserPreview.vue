<template>
 <article @click="navigateTo" :class="['user-preview grid', is]">
  <div class="gradient-wrapper">
   <img :src="user.imgUrl" alt="">
  </div>
  <template v-if="fullPreview">
   <div class="user-info grid">

    <p>{{ user.username }}</p>
    <small>{{ user.fullname }}</small>

   </div>

  </template>
  <slot></slot>

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
   if (this.is === 'story' && this.user.stories.length) {
    console.log('stories:', this.user.stories)
    this.$router.push(`/stories/${this.user._id}/${this.user.stories[0].id}`)
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