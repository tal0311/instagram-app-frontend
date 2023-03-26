<template>
 <dialog class="app-modal" ref="modal">
  <button @click="closeModal" class="close-btn">
   <i v-html="$getSvg('times')"></i>
  </button>
  <h1 class="text-center">Create new post</h1>


  <form class="grid">
   <i v-html="$getSvg('add-media')"></i>
   <p>Drag photos and videos here</p>
   <button @click="closeModal">Select from computer</button>
  </form>

 </dialog>
</template>

// TODO: fix font weight
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
 name: 'PostAdd',
 mounted() {
  this.$refs.modal.showModal();
 },
 methods: {
  ...mapMutations({
   toggleModal: 'postStore/toggleModal'
  }),
  closeModal() {
   this.$refs.modal.close();
   this.toggleModal();
  }
 },



}
</script>

<style></style>