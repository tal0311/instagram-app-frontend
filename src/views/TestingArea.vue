<template>
 <div class="sprite" :style="getStyles"></div>
</template>

<script>

import { spriteService } from '../services/sprite.service';
export default {

 name: 'TestingArea',
 computed: {
  getStyles() {
   return spriteService.getSprite('logo-shadow')


  },


 }
}
</script>

<style>
.logo {}
</style>