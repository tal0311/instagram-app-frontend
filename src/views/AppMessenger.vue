<template>
 <section v-if="msgs" class="inbox-view grid">


  <section class="by-container">
   <header>
    <h1>Inbox</h1>
   </header>
   <pre>{{ msgs }}</pre>
   <UserPreview v-for="msg in msgs" :key="msg" :user="msg" is="msg-preview" />
  </section>

  <section class="side-container grid">
   <section v-if="!isPrivate" class="grid no-msg-container ">
    <i class="icon" v-html="$getSvg('direct')"></i>
    <h2>Your Messages</h2>
    <p>Send private photos and messages to a friend or group.</p>
    <button>Send Message</button>
   </section>
   <template v-else>
    <header>
     <h1>Chat</h1>
    </header>
    <RouterView></RouterView>
   </template>
  </section>


 </section>
</template>

<script>
import UserPreview from '../components/UserPreview.vue'
import { mapGetters } from 'vuex'
export default {
 name: 'AppMessenger',

 data() {
  return {
   isPrivate: false
  }
 },
 computed: {
  ...mapGetters({
   msgs: 'msgStore/getMsgs'
  })
 },
 watch: {
  $route(to, from) {
   if (to.params.byId) {
    console.log('to.params.id', to.params.byId)
    this.isPrivate = true
   } else {
    this.isPrivate = false
   }
  }
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>