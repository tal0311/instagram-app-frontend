<template>
 <nav class="app-nav grid">
  <RouterLink to="/">
   <i v-html="$getSvg('home')"></i>
  </RouterLink>
  <i v-html="$getSvg('search')"></i>
  <RouterLink to="/explore">
   <i v-html="$getSvg('explore')"></i>
  </RouterLink>
  <RouterLink to="/direct">
   <i v-html="$getSvg('inbox')"></i>
  </RouterLink>
  <i v-html="$getSvg('new-post')"></i>
  <RouterLink to="/username">
   <i v-html="$getSvg('profile')"></i>
  </RouterLink>
 </nav>
</template>

<script>
export default {
 name: 'AppNav',
}
</script>

<style></style>