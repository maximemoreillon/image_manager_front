<template>
  <v-card>
    <v-toolbar flat>
      <v-row>
        <v-col>
          <v-toolbar-title>Images</v-toolbar-title>
        </v-col>
        <v-col cols="auto">
          <v-btn exact :to="{ name: 'Upload' }">
            <v-icon>mdi-upload</v-icon>
            <span class="ml-2">Upload new</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />

    <v-card-text>
      <v-form @submit.prevent="get_images()">
        <v-row align="center">
          <v-col>
            <v-text-field label="Search" v-model="search" clearable />
          </v-col>
          <v-col cols="auto">
            <v-btn icon type="submit">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-data-table
        :loading="loading"
        :items="images"
        :headers="headers"
        :options.sync="options"
        :server-items-length="total"
        :items-per-page="10"
        :footer-props="footerProps"
        @click:row="
          $router.push({ name: 'Image', params: { _id: $event._id } })
        "
      >
        <template v-slot:item.thumbnail="{ item }">
          <v-img
            class="ma-2"
            contain
            :width="thumbnail_size"
            :height="thumbnail_size"
            :src="get_image_thumbnail_src(item)"
          />
        </template>

        <template v-slot:item.upload_date="{ item }">
          <span>
            {{ new Date(item.upload_date).toDateString() }}
          </span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      images: [],
      search: "",
      loading: false,
      total: 0,
      options: {},
      thumbnail_size: "10em",
      footerProps: { "items-per-page-options": [10, 50, 100, -1] },
      headers: [
        { value: "thumbnail", text: "Thumbnail" },
        { value: "upload_date", text: "Upload date" },
        { value: "uploader_id", text: "Uploader" },
        { value: "size", text: "Size" },
        { value: "views", text: "Views" },
        { value: "last_viewed", text: "Last viewed" },
        { value: "description", text: "Description" },
      ],
    }
  },
  watch: {
    options: {
      handler() {
        this.get_images()
      },
      deep: true,
    },
  },
  mounted() {
    this.get_images()
  },

  methods: {
    get_images() {
      this.loading = true
      const { itemsPerPage, page, sortBy, sortDesc } = this.options

      const params = {
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort: sortBy[0],
        order: sortDesc[0] ? 1 : -1,
        search: this.search,
      }
      this.axios
        .get(`/images`, { params })
        .then(({ data }) => {
          this.total = data.total
          this.images = data.items
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    get_image_thumbnail_src({ _id }) {
      return `${process.env.VUE_APP_API_URL}/images/${_id}/thumbnail`
    },
  },
}
</script>
