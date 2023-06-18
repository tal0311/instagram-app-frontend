<template>
 <div v-if="contact" class="msg-details grid">

  <section class="msg-content" v-for="msg, idx in contact.msgs" :key="idx">

   <!-- trying to solve this with computed caused a recursive warning -->
   <template v-if="msg.by === loggedUser._id">
    <UserPreview :user="loggedUser" is="msg-details is-from-me">
     <p class="msg">{{ msg.content }}</p>
    </UserPreview>
   </template>

   <template v-else>
    <UserPreview :user="contact" is="msg-details">
     <p class="msg">{{ msg.content }}</p>
    </UserPreview>
   </template>

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
   contact: 'msgStore/getCurrentContact',
   loggedUser: 'userStore/getUser'
  }),
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>