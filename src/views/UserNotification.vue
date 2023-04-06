<template>
 <section v-if="notifications" class="user-notification main-layout">
  <h3>Recent Notification</h3>

  <section class="notification-list grid">
   <article class="notification-preview grid" v-for="note, idx in notifications" :key="idx">
    <UserPreview :user="note.by" />
    <span class="username">{{ note.by.username }}</span>
    <span>{{ note.dsc }}</span>
    <span>{{ getDesc(note.type) }}</span>
    <span>{{ note.createdAt }}</span>
   </article>
  </section>

 </section>
</template>

<script>
import UserPreview from '../components/UserPreview.vue';
import { notificationService } from '../services/notification.service.js'
import { mapGetters } from 'vuex'
export default {
 name: 'userNotification',
 created() {
  this.$store.dispatch('userStore/getUserNotification')
 },
 computed: {
  ...mapGetters({
   notifications: 'userStore/getNotifications'
  }),

 },
 methods: {
  getDesc(type) {
   return notificationService.getDescription(type)
  }
 },
 components: {
  UserPreview
 }
}
</script>

<style></style>