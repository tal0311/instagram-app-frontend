<template>
 <div v-if="contact" class="msg-details grid">

  <section class="msg-content" v-for="msg, idx in contact.msgs" :key="idx">
   <UserPreview :user="contact" is="msg-details">
    <p class="msg">{{ msg.content }}</p>
   </UserPreview>
  </section>

 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserPreview from '../components/UserPreview.vue'
export default {
 name: 'MsgDetails',
 computed: {
  ...mapGetters({
   contact: 'msgStore/getCurrentContact'
  })
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>