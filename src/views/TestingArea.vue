<template>
 <div class="sprite" :style="getStyles"></div>
</template>

<script>

import { spriteService } from '../services/sprite.service';
export default {

 name: 'TestingArea',
 computed: {
  getStyles() {
   return spriteService.getSprite('circle-play-btn')


  },


 }
}
</script>

<style>
.logo {}
</style>