<template>
 <div v-if="contact" class="msg-details">
  <!-- <h1>Message Details</h1>
  <p>Message ID: {{ $route.params.id }}</p>
  <p>Message Content: {{ $route.params.content }}</p> -->
  <!-- <pre>{{ contact.msgs }}</pre> -->
  <section class="msg-content grid" v-for="msg, idx in contact.msgs" :key="idx">
   <UserPreview :user="contact" is="msg-details">
   </UserPreview>
   <p class="msg">{{ msg.content }}</p>
  </section>
  <!-- <header class="msg-header">
  </header> -->

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