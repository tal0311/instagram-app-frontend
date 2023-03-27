<template>
 <section>
  <h1>user area</h1>
 </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
 name: 'UserArea',
 created() {
  this.$store.dispatch('postStore/loadPosts');
 },
 computed: {

  ...mapGetters({})


 }
}
</script>

<style></style>