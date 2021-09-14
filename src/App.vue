<template>
  <AppTemplate
  :options="options"
  @user="get_user($event)">

  <template v-slot:nav>

    <router-link :to="{ name: 'upload'}">
      <upload-icon />
      <span>New upload</span>
    </router-link>
    <router-link :to="{ name: 'list'}">
      <format-list-bulleted-icon />
      <span>Upload list</span>
    </router-link>
    <router-link :to="{ name: 'about'}">
      <InformationOutlineIcon />
      <span>About</span>
    </router-link>

  </template>

</AppTemplate>

</template>

<script>
//import AppTemplate from '@/components/vue_application_template/AppTemplate.vue'
import AppTemplate from '@moreillon/vue_application_template'

import UploadIcon from 'vue-material-design-icons/Upload.vue';
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import InformationOutlineIcon from 'vue-material-design-icons/InformationOutline.vue';

export default {
  name: 'app',
  components: {
    AppTemplate,
    UploadIcon,
    FormatListBulletedIcon,
    InformationOutlineIcon
  },

  data(){
    return {
      options: {
        authenticate: true,
        title: 'Image manager',
        login_url: `${process.env.VUE_APP_AUTHENTICATION_API_URL}/login`,
        identification_url: `${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`
      }

    }
  },
  mounted(){
  },
  methods: {
    get_user(user){
      this.$store.commit('set_user', user)
    }

  }
}
</script>


<style>

</style>
