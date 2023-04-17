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
    console.info('%c App created', 'color: #c642dd');
    console.info('%c See the code at https://github.com/tal0311/instagram-app-frontend ', 'color: #c642dd');
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

