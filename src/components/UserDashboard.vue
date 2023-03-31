<template>
 <section class="dashboard-container grid">
  <div>
   <p class="counter">{{ postCount }}</p>
   <p class="title">Posts</p>
  </div>
  <div>
   <p class="counter">{{ user.following.length }}</p>
   <p class="title">following</p>
  </div>
  <div>
   <p class="counter">{{ user.followers.length }}</p>
   <p class="title">following</p>
  </div>
 </section>
</template>

<script>
export default {
 name: 'UserDashboard',
 props: {
  user: {
   type: Object,
   // required: true
  },
  postCount: {
   type: Number,
   default: 0
  },
 }

}
</script>

