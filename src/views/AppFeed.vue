
<template>
  <section v-if="posts" class="app-feed">
    <section class="post-list">
      <PostPreview v-for="post in posts" :key="post.id" :post="post" />
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
    this.$store.dispatch('loadPosts');
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts',

    }),
  },
  components: {
    PostPreview
  }
}

</script>