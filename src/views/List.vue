<template>
  <div class="uploads_list">

    <div class="uploads_wrapper">
      <UploadPreview
        v-for="(image, image_index) in images"
        v-bind:key="image._id"
        v-bind:image="image"
        v-on:image_deleted="remove_image(image_index)"/>
    </div>

    <div class="" v-if="loading">
      Loading...
    </div>



    <div class="load_more_button_wrapper" v-if="!loaded_all">
      <button
        type="button"
        v-on:click="get_images()"
        >Load more</button>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import UploadPreview from '@/components/UploadPreview.vue';

export default {
  name: 'List',
  data(){
    return {
      images: [],
      loading: false,
      loaded_all: false,
      load_count: 20,
    }
  },
  components: {
    UploadPreview,
  },
  mounted(){
    this.delete_all_images()
    this.get_images()
  },
  methods: {
    delete_all_images(){
      this.images.splice(0,this.images.length)
      this.loaded_all = false
    },
    get_images(){
      this.loading = true,
      this.axios.get(`${process.env.VUE_APP_API_URL}/image_list`, {
        params: {
          start_index: this.images.length,
          load_count: this.load_count,
        }

      })
      .then(response => {
        response.data.forEach((image) => {
          this.images.push(image)
        });

        if(response.data.length < this.load_count) this.loaded_all = true;
      })
      .catch(error => console.log(error))
      .finally(() => this.loading = false)
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
.uploads_wrapper {

  /* IE fallback behavior */
  display: flex;
  flex-wrap: wrap;

  /* Normal behavior */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
  grid-gap: 15px;
}
.load_more_button_wrapper{
  margin-top: 10px;
  text-align: center;
}
</style>
