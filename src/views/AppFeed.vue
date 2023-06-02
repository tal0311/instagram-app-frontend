
<template>
  <section v-if="users" class="app-feed grid">
    <StoryList :user="getUser" :userList="users" />
    <section v-if="posts" class="post-list">
      <PostPreview @action="onPostAction" v-for="post in posts" :key="post._id" :post="post" :loggedUser="getUser" />
    </section>
    <section class="loading-logo grid" v-else>
      <img :src="loadingSrc" alt="">
    </section>
    <RouterView />
  </section>
</template>


<script >
import StoryList from '../components/StoryList.vue';
import PostPreview from '../components/PostPreview.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'AppFeed',

  async created() {
    try {
      this.$store.dispatch('userStore/loadUsers');
      this.$store.dispatch('postStore/loadPosts');
    } catch (error) {
      // console.log('error:', error)
    }

  },

  data() {
    return {
    };
  },
  methods: {
    onPostAction({ action, postId, comment = null }) {
      this.$store.dispatch('postStore/postActions', { action, postId, comment })
    },

  },
  computed: {
    ...mapGetters({
      posts: 'postStore/getPosts',
      getUser: 'userStore/getUser',
      users: 'userStore/getUsers',
    }),

    loadingSrc() {
      return 'https://cdn.usbrandcolors.com/images/logos/instagram-logo.png'
    },
  },

  components: {
    PostPreview,
    StoryList,
  }
}

</script>