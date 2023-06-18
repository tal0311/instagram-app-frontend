<template>
 <section v-if="msgs" class="inbox-view grid">
  <!-- side container showing users -->
  <section class="by-container">
   <header>
    <p>{{ loggedInUser.username }}</p>
   </header>
   <section class="msg-preview" v-for="msg, idx in msgs" :key="msg">
    <UserPreview :user="{ _id: idx, ...msg }" is="msg-preview">
     <small class="last-msg-preview">{{ msg.msgs.at(-1).content }}</small>
    </UserPreview>
   </section>
  </section>

  <section class="main-container grid">

   <template v-if="!isPrivate">
    <section class="grid no-msg-container">
     <i class="icon" v-html="$getSvg('direct')"></i>
     <h2>Your Messages</h2>
     <p>Send private photos and messages to a friend or group.</p>
     <button>Send Message</button>
    </section>
   </template>

   <template v-else>
    <section class="msg-container grid">
     <header>
      <h1>Chat</h1>
     </header>
     <div class="router-container">
      <RouterView></RouterView>
     </div>
     <section class="new-msg">
      <form class="grid" @submit.prevent="sendMsg">
       <textarea ref="comment-txt" v-model="msg.content" @input="setTextLength" name="txt" id="" cols="10" rows="1"
        placeholder="Message"></textarea>
       <button v-if="isTyping" @click="sendMsg">Send</button>
      </form>
     </section>
    </section>
   </template>

  </section>


 </section>
</template>

<script>
// TODO: add msg cmp (add comment add msg are the same) and hook
// TODO: CONVERT TO DYNAMIC COMPONENT
import UserPreview from '../components/UserPreview.vue'
import { mapGetters } from 'vuex'
export default {
 name: 'AppMessenger',
 data() {
  return {
   msg: {},
   isPrivate: false,
   isTyping: false,
  }
 },
 methods: {
  sendMsg() {
   // BUG: if removing the msg.content from the if statement, the msg is sent twice
   if (!this.msg.content) return
   this.msg.createdAt = Date.now()
   this.msg.to = this.to._id
   // send msg and add to store
   this.$store.dispatch({ type: 'msgStore/addMsg', msg: { ...this.msg } })
   this.msg = {}
  },
  setTextLength({ target }) {
   if (target.value.length > 0) this.isTyping = true
   else this.isTyping = false
  },
 },
 computed: {
  ...mapGetters({
   msgs: 'msgStore/getMsgs',
   loggedInUser: 'userStore/getUser',
   to: 'msgStore/getCurrentContact'
  })
 },
 watch: {
  $route(to, from) {
   if (to.params.byId) {
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