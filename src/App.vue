<template>
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
  <AppNav />
</template>

<script >
import { mapActions } from 'vuex'
import AppNav from './components/AppNav.vue';
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'App',
  created() {
    console.log('App created');
    this.loadUser()
  },
  methods: {
    ...mapActions(['loadUser'])
  },
  components: {
    AppHeader,
    AppNav
  }
}
</script>

