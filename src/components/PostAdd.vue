<template>
 <dialog :class="['app-modal', isEditor ? 'editor' : '']" ref="modal">
  <button @click="closeModal" class="close-btn">
   <i v-html="$getSvg('times')"></i>
  </button>
  <h1 class="text-center">Create new post</h1>


  <template v-if="post.imgUrl">
   <section class="img-edit grid">
    <img :src="post.imgUrl" alt="post-img">
    <form class="editor-form" @submit.prevent>
     <textarea name="txt" v-model="post.txt" id="" cols="30" rows="10" placeholder="Write a caption"></textarea>
     <div class="post-info grid">
      <input type="text" v-model="post.loc.locname" placeholder="Add location">
      <i class="icon" @click="getLoc" v-html="$getSvg('location')"></i>
     </div>
     <button @click="onAddPost">Publish</button>
    </form>
   </section>
  </template>


  <form v-else class="grid">
   <i v-html="$getSvg('add-media')"></i>
   <p>Drag photos and videos here</p>
   <input @change="uploadPostImg" type="file" id="postImg" name="postImg" accept="image/*,video/*">
   <label for="postImg">Select from computer</label>
  </form>



 </dialog>
</template>

// TODO: fix font weight
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { postService } from '../services/post.service.local';
import { uploadImg } from './../services/upload.service'
import { locationService } from './../services/locationService'
export default {
 name: 'PostAdd',
 created() {
  this.post = postService.getEmptyPost();

 },
 data() {
  return {
   post: null,
   isEditor: false,

  };
 },
 mounted() {
  this.$refs.modal.showModal();
 },
 methods: {
  ...mapActions({
   addPost: 'postStore/addPost'
  }),
  ...mapMutations({
   toggleModal: 'postStore/toggleModal',

  }),
  async uploadPostImg(ev) {
   const file = ev.type === 'change' ?
    ev.target.files[0] :
    ev.dataTransfer.files[0]
   // TODO: add loader AND error handling 
   // TODO: able to cancel upload
   const { url } = await uploadImg(file)
   this.post.imgUrl = url
   this.isEditor = true
  },
  closeModal() {
   this.$refs.modal.close();
   this.toggleModal();
  },
  async getLoc() {
   const loc = await locationService.getPosition()
   this.post.loc = { ...this.post.loc, ...loc }
  },
  onAddPost() {
   this.addPost({ post: JSON.parse(JSON.stringify(this.post)) })
   this.closeModal();


  }
 }

}
</script>

<style></style>