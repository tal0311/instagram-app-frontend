<template>
 <section class="login grid">
  <form class="login-form grid">
   <i class="logo icon text-center" v-html="$getSvg('logo')"></i>
   <input type="text" name="username" placeholder="Phone number, username, or Email">
   <input type="text" name="password" placeholder="Password">
   <button>Log in</button>
   <p class="forget-passwd text-center">Forgot password?</p>
  </form>
  <section>
   <p class="signup text-center">
    Don't have an account?
    <span>Sign up</span>
   </p>
  </section>
 </section>
</template>

<script>
export default {
 name: 'AppLogin'
}
</script>

<style></style>