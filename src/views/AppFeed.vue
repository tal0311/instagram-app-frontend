
<template>
  <section class="app-feed grid">
    <section v-if="posts" class="post-list">
      <PostPreview @action="onPostAction" v-for="post in posts" :key="post._id" :post="post" />
    </section>
    <section class="loading-logo grid" v-else>
      <img :src="loadingSrc" alt="">
    </section>
    <RouterView />
  </section>
</template>


<script >
import PostPreview from '../components/PostPreview.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'AppFeed',
  components: {
  },
  created() {
    this.$store.dispatch('postStore/loadPosts');

  },
  data() {
    return {
    };
  },
  methods: {
    onPostAction({ action, postId }) {
      this.$store.dispatch('postStore/postActions', { action, postId })
    },
  },
  computed: {
    ...mapGetters({
      posts: 'postStore/getPosts',
    }),
    loadingSrc() {
      return 'https://cdn.usbrandcolors.com/images/logos/instagram-logo.png'
    },
  },
  components: {
    PostPreview
  }
}

</script>