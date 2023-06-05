<template>
 <section class="login grid">
  <form class="login-form grid" @submit.prevent>
   <i class="logo icon text-center" v-html="$getSvg('logo')"></i>
   <input type="text" v-model="formData.username" name="username" placeholder="Phone number, username, or Email">
   <input type="text" v-model="formData.password" name="password" placeholder="Password">
   <template v-if="isSignUp">
    <div class="signup-section grid">
     <input type="text" v-model="formData.fullname" name="fullname" placeholder="Full name">
     <img v-if="userImgPreview" :src="userImgPreview" class="user-img-preview" alt="">
     <input @change="uploadPostImg" type="file" id="postImg" name="postImg" accept="image/*,video/*" hidden>
     <label for="postImg">Select Profile image</label>

    </div>
   </template>
   <button @click="handleUserData">{{ isSignUp ? 'Sign up' : 'Log in' }}</button>
   <p class="forget-passwd text-center">Forgot password?</p>
  </form>
  <section>
   <p class="signup text-center">
    Don't have an account?
    <span @click="isSignUp = !isSignUp">Sign up</span>
   </p>
  </section>
 </section>
</template>

<script>
import { mapActions } from 'vuex'
import { userService } from '../services/user.service'
import { uploadImg } from './../services/upload.service'
export default {
 name: 'AppLogin',
 data() {
  return {
   isSignUp: false,
   userImgPreview: null,
   formData: {
    username: 'tal.amit',
    password: '111'
   }
  }
 },
 methods: {
  ...mapActions({
   signUp: 'userStore/userSignUp',
   login: 'userStore/userLogin'
  }),

  async uploadPostImg(ev) {
   const file = ev.type === 'change' ?
    ev.target.files[0] :
    ev.dataTransfer.files[0]
   // TODO: add loader AND error handling 
   // TODO: able to cancel upload

   const { url } = await uploadImg(file)
   this.userImgPreview = url
  },
  async handleUserData() {
   try {
    if (this.isSignUp) {
     this.formData.imgUrl = this.userImgPreview
     await this.signUp({ user: { ...this.formData } })
    } else {
     await this.login({ user: { ...this.formData } })
    }
    this.formData = {}
    this.$router.push('/')
   } catch (error) {
    throw '[Error while sign or log in]' + error
   }

  }
 }
}
</script>

<style></style>