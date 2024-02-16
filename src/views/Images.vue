<template>
  <v-card>
    <v-toolbar flat>
      <v-row>
        <v-col>
          <v-toolbar-title>Images</v-toolbar-title>
        </v-col>
        <v-col cols="auto">
          <v-btn exact :to="{ name: 'Upload' }" color="primary">
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
const { VUE_APP_IMAGE_MANAGER_API_URL } = process.env

export default {
  name: "Home",
  data() {
    return {
      images: [],
      search: "",
      loading: false,
      total: 0,
      // options: {},
      thumbnail_size: "10em",
      footerProps: { "items-per-page-options": [10, 50, 100, -1] },
      headers: [
        { value: "thumbnail", text: "" },
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
    query() {
      this.get_images()
    },
  },
  mounted() {
    this.get_images()
  },

  methods: {
    get_images() {
      this.loading = true

      const params = { ...this.query }

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
      return `${VUE_APP_IMAGE_MANAGER_API_URL}/images/${_id}?variant=thumbnail`
    },
    setQueryParam(key, value) {
      if (this.query[key] === value) return
      const query = { ...this.query }
      if (value) query[key] = value
      else delete query[key]
      /* router.replace acts like router.push, the only difference is that it navigates without pushing a new history entry, as its name suggests - it replaces the current entry. */
      this.$router.replace({ query })
    },
  },

  computed: {
    query() {
      return this.$route.query
    },
    options: {
      get() {
        // Those are not defaults, those are values which are set if the table does not set them
        const {
          sort = "upload_date",
          order = "-1", // Does not become default for some reason
          limit = 10,
          skip = 0,
        } = this.$route.query

        return {
          itemsPerPage: Number(limit),
          sortBy: [sort],
          sortDesc: [order === "-1"],
          page: skip / limit + 1,
        }
      },
      set(newVal) {
        // When the table sets some options

        const { itemsPerPage, page, sortBy, sortDesc } = newVal

        const params = {
          limit: String(itemsPerPage),
          skip: String((page - 1) * itemsPerPage),
          order: String(sortDesc[0] ? -1 : 1),
          sort: sortBy[0],
        }

        // Not ideal but better than before
        Object.keys(params).forEach((key) => {
          this.setQueryParam(key, params[key])
        })
      },
    },
  },
}
</script>
