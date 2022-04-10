<template>
  <v-card>
    <v-toolbar flat>
      <v-row>
        <v-col>
          <v-toolbar-title>Images</v-toolbar-title>
        </v-col>
        <v-col cols="auto">
          <v-btn
            exact
            :to="{name: 'Upload'}">
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />

    <v-card-text>
      <v-data-table
        :loading="loading"
        :items="images"
        :headers="headers"
        :options.sync="options"
        :server-items-length="total"
        :items-per-page="50"
        :footer-props="footerProps"
        @click:row="$router.push({name: 'Image', params: {_id: $event._id}})">

        <template v-slot:item.thumbnail="{ item }">

          <v-img
            width="5em"
            height="5em"
            contain
            :src="get_image_thumbnail_src(item)"/>
        </template>


      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      images: [],
      loading: false,
      total: 0,
      options: {},
      footerProps: {'items-per-page-options': [50, 100, 500, -1]},
      headers: [
        {value: 'thumbnail', text: 'Thumbnail'},
        {value: 'upload_date', text: 'Upload date'},
        {value: 'uploader_id', text: 'Uploader'},
        {value: 'size', text: 'Size'},
        {value: 'views', text: 'Views'},
      ],
    }
  },
  watch: {
    options: {
      handler () {
        this.get_images()
      },
      deep: true,
    },
  },
  mounted(){
    this.get_images()
  },

  methods: {
    get_images(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/images`
      const { itemsPerPage, page, sortBy, sortDesc, } = this.options
      const params = {
        batch_size: itemsPerPage,
        start_index: (page-1) * itemsPerPage,
        sort: sortBy[0],
        order: sortDesc[0] ? 1 : -1
      }
      this.axios.get(url, {params})
        .then( ({data}) => {
          this.total = data.total
          this.images = data.items
        })
        .catch( error => {
          console.error(error)
        })
        .finally( () => { this.loading = false})
    },
    get_image_thumbnail_src({_id}){
      return `${process.env.VUE_APP_API_URL}/images/${_id}/thumbnail`
    }
  }
}
</script>
