<template>
  <div class="upload">

    <h1>Image upload</h1>
    <form
      class=""
      v-on:submit.prevent="submit()">
      <input
        type="file"
        ref="image_input"
        name="image"
        accept="image/*">
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
      this.axios.post(`${process.env.VUE_APP_API_URL}/images`, formData, {
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        this.$router.push({name: 'upload_details', params: {id: response.data._id}})
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    },

  }
}
</script>

<style soped>
form {
}
</style>
