<script>
import { ContentLoader } from "vue-content-loader"

export default {
 components: { ContentLoader }
}
</script>

<template>
 <content-loader viewBox="0 0 400 460" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
  <circle cx="31" cy="31" r="15" />
  <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
  <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
  <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
 </content-loader>
</template>