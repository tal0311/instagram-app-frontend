<template>
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
  <AppNav />
</template>

<script >
import AppNav from './components/AppNav.vue';
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav
  }
}
</script>

