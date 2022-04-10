<template>
  <v-card
    max-width="40em"
    class="mx-auto"
    :loading="loading">
    <v-toolbar flat>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn
            exact
            :to="{name: 'Images'}"
            icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title>Image</v-toolbar-title>
        </v-col>
        <v-spacer />
        <!-- <v-col cols="auto">
          <v-btn
            icon>
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-col> -->
        <v-col cols="auto">
          <v-btn
            color="#c00000"
            icon
            @click="delete_image()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />

    <template v-if="image">
      <v-card-text>
        <v-img
          :src="image_src"
          alt=""/>
      </v-card-text>

      <v-card-text class="mt-5">
        <v-row align="center">
          <v-col>
            Size
          </v-col>
          <v-col>
            {{image.size}}
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            Uploader
          </v-col>
          <v-col>
            {{image.uploader_id}}
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            Upload date
          </v-col>
          <v-col>
            {{image.upload_date}}
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            Views
          </v-col>
          <v-col>
            {{image.views}}
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            URL
          </v-col>
          <v-col>
            <v-text-field
              readonly
              :value="image_src"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            Thumbnail URL
          </v-col>
          <v-col>
            <v-text-field
              readonly
              :value="thumbnail_src"/>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-card-subtitle>Referers</v-card-subtitle>
        <v-data-table
          :headers="referers_headers"
          :items="image.referers" />
      </v-card-text>
    </template>

  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ImageDetails',
  data(){
    return {
      loading: false,
      deleting: false,
      image: null,
      referers_headers: [
        { text: 'URL', value: 'url'},
        { text: 'Last request', value: 'last_request'}
      ]
    }
  },
  mounted(){
    this.get_image_details()
  },
  watch: {
    image_id(){
      this.get_image_details()
    }
  },
  methods: {
    get_image_details(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/images/${this.image_id}/details`
      this.axios.get(url)
        .then(({data}) => {
          this.image = data
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => { this.loading = false })
    },
    delete_image(){
      if(!confirm(`Delete image?`)) return
      this.deleting = true
      const url = `${process.env.VUE_APP_API_URL}/images/${this.image_id}`
      this.axios.delete(url)
        .then(() => {
          this.$router.push({name: 'Images'})
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => { this.deleting = false })
    }
  },
  computed: {
    image_id(){
      return this.$route.params._id
    },
    image_src(){
      return `${process.env.VUE_APP_API_URL}/images/${this.image_id}`
    },
    thumbnail_src(){
      return `${this.image_src}/thumbnail`
    }
  }

}
</script>
