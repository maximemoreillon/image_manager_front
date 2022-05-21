<template>
  <v-card
    max-width="30em"
    class="mx-auto">
    <v-toolbar flat>
      <v-row>
        <v-col cols="auto">
          <v-btn
            exact
            :to="{name: 'Images'}"
            icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title>Upload</v-toolbar-title>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />

    <v-card-text>
      <v-form @submit.prevent="upload_image()">
        <v-row align="center">
          <v-col>
            <v-file-input
              accept="image/*"
              label="Image"
              v-model="image"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="auto">
            <v-checkbox 
              label="Private" 
              v-model="restricted" />
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <v-btn
              :loading="loading"
              type="submit">
              <v-icon>mdi-upload</v-icon>
              <span class="ml-2">Upload</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Upload',
  data(){
    return {
      image: null,
      restricted: false,
      loading: false,
    }
  },
  methods: {
    upload_image(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/images`
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('restricted', this.restricted)
      this.axios.post(url,formData)
      .then(({data: {_id}}) => {
        this.$router.push({name: 'Image', params: {_id}})
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => { this.loading = false })

    }
  }
}
</script>
