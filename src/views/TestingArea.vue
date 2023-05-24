<template>
 <div class="sprite" :style="getStyles"></div>
</template>

<script>
import { spriteService } from '../services/sprite.service';
export default {
 name: 'TestArea',
 computed: {
  getStyles() {
   return spriteService.getSprite('logo-small-fill')
  },
 }
}
</script>

<style>
.sprite {
 display: inline-block;
 background: url(./src/assets/images/insta-sprite.png) no-repeat;
}
</style>