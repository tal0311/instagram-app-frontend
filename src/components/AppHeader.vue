<template>
 <header class="app-header full main-layout">
  <section class="header-container">
   <i class="icon logo" v-html="$getSvg('logo')"></i>
   <input type="search" name="search" placeholder="Search">
   <i class="icon" v-html="$getSvg('like')"></i>
  </section>
 </header>
</template>

<script>
export default {
 name: 'AppHeader',
}
</script>

<style></style>