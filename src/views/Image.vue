<template>
  <v-card max-width="40em" class="mx-auto" :loading="loading">
    <v-toolbar flat>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn exact :to="{ name: 'Images' }" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title>Image</v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            icon
            :disabled="!current_user_is_admin && !current_user_is_uploader"
            @click="update_image()"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="#c00000"
            icon
            :disabled="!current_user_is_admin && !current_user_is_uploader"
            @click="delete_image()"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />

    <template v-if="image">
      <v-card-text>
        <v-img :src="image_src" alt="" />
      </v-card-text>

      <v-card-text class="mt-5">
        <v-row align="center">
          <v-col cols="3">Size </v-col>
          <v-col>{{ image.size }} </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3">Uploader </v-col>
          <v-col>
            <UploaderInfo :id="image.uploader_id" />
            <!-- <span v-if="current_user_is_uploader">(You)</span> -->
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3">Upload date</v-col>
          <v-col>{{ image.upload_date }}</v-col>
        </v-row>

        <v-row align="center">
          <v-col>
            <v-text-field label="URL" readonly :value="image_src" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-text-field
              label="Thumbnail URL"
              readonly
              :value="thumbnail_src"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-textarea
              label="Description"
              auto-grow
              rows="1"
              v-model="image.description"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-checkbox label="Restricted" v-model="image.restricted" />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="3">Views</v-col>
          <v-col>{{ image.views }}</v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3">Last viewed</v-col>
          <v-col>{{ image.last_viewed || "Unavailable" }}</v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-card-subtitle>Referers</v-card-subtitle>
        <v-data-table :headers="referers_headers" :items="image.referers" />
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import UploaderInfo from "../components/UploaderInfo.vue"

export default {
  name: "ImageDetails",
  components: {
    UploaderInfo,
  },
  data() {
    return {
      loading: false,
      deleting: false,
      image: null,
      referers_headers: [
        { text: "URL", value: "url" },
        { text: "Last request", value: "last_request" },
      ],
    }
  },
  mounted() {
    this.get_image_details()
  },
  watch: {
    image_id() {
      this.get_image_details()
    },
  },
  methods: {
    get_image_details() {
      this.loading = true
      const url = `/images/${this.image_id}/details`
      this.axios
        .get(url)
        .then(({ data }) => {
          this.image = data
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    delete_image() {
      if (!confirm(`Delete image?`)) return
      this.deleting = true
      const url = `/images/${this.image_id}`
      this.axios
        .delete(url)
        .then(() => {
          this.$router.push({ name: "Images" })
        })
        .catch((error) => {
          alert("Deletion failed")
          console.error(error)
        })
        .finally(() => {
          this.deleting = false
        })
    },
    update_image() {
      this.updating = true
      const url = `/images/${this.image_id}`
      this.axios
        .patch(url, this.image)
        .then(() => {
          alert("Image updated")
          this.get_image_details()
        })
        .catch((error) => {
          alert("Update failed")
          console.error(error)
        })
        .finally(() => {
          this.updating = false
        })
    },
  },
  computed: {
    image_id() {
      return this.$route.params._id
    },
    image_src() {
      return `${process.env.VUE_APP_API_URL}/images/${this.image_id}`
    },
    thumbnail_src() {
      return `${this.image_src}/thumbnail`
    },
    current_user_id() {
      const { current_user } = this.$store.state
      if (!current_user) return false
      return current_user._id
    },
    current_user_is_admin() {
      const { current_user } = this.$store.state
      return current_user.isAdmin
    },
    current_user_is_uploader() {
      if (!this.image) return false
      const { uploader_id } = this.image
      return uploader_id === this.current_user_id
    },
  },
}
</script>
