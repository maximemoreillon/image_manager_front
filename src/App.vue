<template>
  <div id="app">

    <AppTemplate applicationName="Image manager">

      <template v-slot:navigation>
        <router-link to="/">
          <upload-icon />
          <span>Upload</span>
        </router-link>
        <router-link to="/uploads">
          <format-list-bulleted-icon />
          <span>Upload list</span>
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

export default {
  name: 'app',
  components: {
    AppTemplate,
    UploadIcon,
    FormatListBulletedIcon,
  },

  data(){
    return {}
  }
}
</script>


<style>

</style>
