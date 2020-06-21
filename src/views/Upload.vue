<template>
  <div class="home">
    <form
      class=""
      v-on:submit.prevent="submit()">
      <input type="file" ref="image_input" name="image">
      <input type="submit" name="">
    </form>

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {

  },
  data(){
    return {

    }
  },
  methods: {
    submit(){

      let formData = new FormData();
      formData.append('image', this.$refs.image_input.files[0]);
      this.axios.post(`${process.env.VUE_APP_API_URL}/image`, formData, {
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        this.$router.push({name: 'view_upload', query: {id: response.data._id}})
      })
      .catch(error => console.log(error));

    },

  }
}
</script>

<style soped>
form {
  text-align: center;
}
</style>
