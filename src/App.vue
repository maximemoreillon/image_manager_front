<template>
  <div id="app">

    <AppTemplate applicationName="Image manager">

      <template v-slot:navigation>
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

  </div>
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

    }
  },
  mounted(){
    this.get_current_user()
  },
  methods: {
    get_current_user(){
      const url = `${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`
      this.axios.get(url)
      .then(response => {this.$store.commit('set_user', response.data)})
      .catch(error => { console.error(error) })
    }
  }
}
</script>


<style>

</style>
