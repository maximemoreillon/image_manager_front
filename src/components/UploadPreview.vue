<template>

  <router-link
    :to="{ name: 'upload_details', params: {id: image._id} }"
    class="image_preview">

    <img v-bind:src="image_url">

    <div class="metadata_wrapper">

      <div class="size_wrapper">
        Size: {{image.size/1000}}kB
      </div>

      <!--
      <div class="size_wrapper">
        Referers: {{image.referers.length}}
      </div>
      -->

    </div>

  </router-link>
</template>

<script>



export default {
  name: 'ImageInfo',
  props: {
    image: Object
  },
  components: {

  },
  methods: {
    copy_url() {
      let url_input = this.$refs.image_url
      /* Select the text field */
      url_input.select();
      url_input.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

    },
  },
  computed: {
    image_url(){
      return `${process.env.VUE_APP_API_URL}/images/${this.image._id}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image_preview {
  border: 1px solid #dddddd;
  margin: 5px 0;
  padding: 5px;
  cursor: pointer;

  transition: border-color 0.25s;
  text-decoration: none;
  color: currentcolor;
  text-align: center;
}

.image_preview:hover {
  border-color: #c00000;
}

img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.metadata_wrapper{
  margin-top: 5px;
  text-align: center;
}

.metadata_wrapper > *:not(:last-child){
  margin-bottom: 5px;
}
</style>
