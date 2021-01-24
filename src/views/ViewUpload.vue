<template>
  <div class="upload_details">

    <template v-if="image">

      <div class="image_Wrapper">
        <a v-bind:href="image_url">
          <img v-bind:src="image_url">
        </a>

      </div>

      <div class="table_wrapper">
        <table>

          <tr>
            <td>Size</td>
            <td>{{image.size/1000}} kB</td>
          </tr>
          <tr>
            <td>Upload date</td>
            <td>{{image.upload_date}}</td>
          </tr>
          <tr>
            <td>Copy URL</td>
            <td>
              <input
              class="url_input"
              type="text"
              readonly
              ref="image_url"
              v-bind:value="image_url">

              <content-copy-icon
                v-on:click="copy_url()"/>
            </td>
          </tr>
          <tr>
            <td>Delete</td>
            <td>
              <delete-icon v-on:click="delete_image()"/>
            </td>
          </tr>

        </table>
      </div>

      <div class="table_wrapper">
        <table class="referers_table">

          <tr>
            <th>Referers: {{image.referers.length}}</th>
          </tr>
          <tr v-for="referer in image.referers" v-bind:key="referer.url">
            <td>
              <a v-bind:href="referer.url">{{referer.url}}</a>
            </td>
          </tr>


        </table>
      </div>



    </template>



  </div>
</template>

<script>
// @ is an alias to /src
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue';

export default {
  name: 'ViewUpload',
  data(){
    return {
      image: null,
    }
  },
  components: {
    ContentCopyIcon,
    DeleteIcon,
  },
  mounted(){
    this.get_upload()
  },
  methods: {
    get_upload(){
      if(this.$route.query.id){
        this.image = null;
        this.axios.get(`${process.env.VUE_APP_API_URL}/image_details`, {
          params: {id: this.$route.query.id}
        })
        .then(response => { this.image = response.data })
        .catch(error => console.log(error))
      }

    },
    delete_image(){
      if(confirm('Really?')){
        this.axios.delete(`${process.env.VUE_APP_API_URL}/image`, {
          params: {id: this.$route.query.id}
        })
        .then( () => { this.$router.push({name: 'list'}) })
        .catch(error => console.log(error))
      }
    },
    copy_url() {
      let url_input = this.$refs.image_url
      /* Select the text field */
      url_input.select();
      url_input.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      setTimeout(() => {this.url_copied = false}, 3000)

    },
  },
  computed: {
    image_url(){
      return `${process.env.VUE_APP_API_URL}/image/${this.image._id}`;
    }
  }
}
</script>

<style scoped>
.image_Wrapper{
  text-align: center;
}

img {
  width: 50vw;
  height: 50vh;
  object-fit: contain;
}

.table_wrapper {
  margin-top: 10px;
}

table {
  border-collapse: collapse;
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  table-layout: fixed;
}

.referers_table{
  text-align: left;
}


tr:not(:first-child){
  border-top: 1px solid #dddddd;
}

td, th {
  padding: 5px;
  overflow-x: hidden;
}
.url_input{
  z-index: -1;
  opacity: 0;
  position: absolute;
}

.material-design-icon {
  cursor: pointer;
  transition: color 0.25s;
}

.material-design-icon:hover {
  color: #c00000;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #c00000;
}

</style>
