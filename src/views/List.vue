<template>
  <div class="uploads_list">

    <UploadPreview
      v-for="(image, image_index) in images"
      v-bind:key="image._id"
      v-bind:image="image"
      v-on:image_deleted="remove_image(image_index)"/>


  </div>
</template>

<script>
// @ is an alias to /src
import UploadPreview from '@/components/UploadPreview.vue';

export default {
  name: 'List',
  data(){
    return {
      images: []
    }
  },
  components: {
    UploadPreview,
  },
  mounted(){
    this.get_images()
  },
  methods: {
    get_images(){
      this.axios.get(`${process.env.VUE_APP_API_URL}/list`)
      .then(response => {
        this.images.splice(0,this.images.length)
        response.data.forEach((image) => {
          this.images.push(image)
        });
      })
      .catch(error => console.log(error))
    },
    remove_image(image_index){
      this.images.splice(image_index,1)
    },

    drop(){
      if(confirm('Really?')){
        this.axios.post(`${process.env.VUE_APP_API_URL}/drop`)
        .then( () => {
          this.get_images()
        })
        .catch(error => console.log(error))
      }

    }
  },
}
</script>

<style scoped>
.uploads_list {

  /* IE fallback behavior */
  display: flex;
  flex-wrap: wrap;

  /* Normal behavior */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
  grid-gap: 15px;
}
</style>
