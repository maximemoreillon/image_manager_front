<template>
  <component :is="profileUrl ? 'a' : 'span'" :href="profileUrl" target="_blank">
    <span v-if="user">{{ user.display_name }}</span>
    <span v-else>{{ id }}</span>
  </component>
</template>

<script>
const { VUE_APP_USER_MANAGER_API_URL, VUE_APP_USER_MANAGER_GUI_URL } =
  process.env

export default {
  name: "UploaderInfo",
  props: {
    id: String,
  },
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    this.getUploaderInfo()
  },
  methods: {
    async getUploaderInfo() {
      const url = `${VUE_APP_USER_MANAGER_API_URL}/users/${this.id}`
      const { data } = await this.axios.get(url)
      this.user = data
    },
  },
  computed: {
    current_user_id() {
      const { current_user } = this.$store.state
      if (!current_user) return false
      return current_user._id
    },
    current_user_is_uploader() {
      return this.id === this.current_user_id
    },
    profileUrl() {
      if (!VUE_APP_USER_MANAGER_GUI_URL) return
      return `${VUE_APP_USER_MANAGER_GUI_URL}/users/${this.id}`
    },
  },
}
</script>
