<template>
  <div class="about">
    <h1>Image manager</h1>
    <p>Author: Maxime MOREILLON</p>
    <p>Version: {{version}}</p>
    <p>API URL: {{api_url}}</p>


  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import pjson from '../../package.json'

export default {
  name: 'About',

  data(){
    return {
      version: pjson.version,
      api_url: process.env.VUE_APP_API_URL
    }
  },

}
</script>

<style soped>

</style>
