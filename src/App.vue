<template>
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
  <AppNav />
  <PostAdd v-if="isModalOpen" />
</template>

<script >
import { mapActions, mapGetters } from 'vuex'
import PostAdd from './components/PostAdd.vue'
import AppNav from './components/AppNav.vue';
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'App',
  created() {
    console.log('App created');
    this.loadUser()
  },
  methods: {
    ...mapActions({
      loadUser: 'userStore/loadUser'
    })
  },
  computed: {
    ...mapGetters({
      isModalOpen: 'postStore/isModalOpen'
    })
  },
  components: {
    AppHeader,
    AppNav,
    PostAdd
  }
}
</script>

