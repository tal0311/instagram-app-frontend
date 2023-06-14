<template>
  <header class="app-header full main-layout">
    <section class="header-container">
      <i class="icon logo" @click="$router.push('/')" v-html="$getSvg('logo')"></i>

      <form @submit.prevent="">
        <input @input="onSearch" type="search" name="search" placeholder="Search" />
        <div v-if="isResults" class="search-preview">
          <UserPreview v-for="(user, idx) in users" :key="idx" :user="user" is="results" />
        </div>
      </form>
      <div class="note-container">
        <i class="icon" @click="$router.push(`/notification`)" v-html="$getSvg('like')"></i>
        <span v-if="isNote" class="user-note"></span>
      </div>
    </section>
  </header>
</template>

<script>
import UserPreview from './UserPreview.vue'
import { mapActions, mapGetters } from 'vuex'
import { utilService } from '../services/util.service'
import { socketService } from '../services/socket.service'

export default {
  name: 'AppHeader',
  created() {
    this.onSearch = utilService.debounce(this.onSearch, 500)
    socketService.on('add-user-note', this.onUserNote)
  },
  data() {
    return {
      isResults: false,
      isNote: false
    }
  },
  methods: {
    ...mapActions({
      filterUsers: 'userStore/usersFilter'
    }),
    onSearch(ev) {
      if (!ev.target.value) {
        this.isResults = false
      } else {
        this.isResults = true
      }
      this.filterUsers({ searchTerm: ev.target.value })
    },
    onUserNote() {
      console.log('i did it!!!!')
      this.isNote = true
    }
  },
  computed: {
    ...mapGetters({
      users: 'userStore/getSearchResults',
      user: 'userStore/getUser'
    })
  },
  components: {
    UserPreview
  }
}
</script>

<style></style>