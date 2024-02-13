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
      <div class="image_wrapper">
        <img contain :src="image_src" class="image_preview" />
      </div>

      <v-card-text class="mt-5">
        <v-row align="center" dense>
          <v-col cols="3">Original file size </v-col>
          <v-col>{{ image.size }} </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col cols="3">Uploader </v-col>
          <v-col>
            <UploaderInfo :id="image.uploader_id" />
            <!-- <span v-if="current_user_is_uploader">(You)</span> -->
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col cols="3">Upload date</v-col>
          <v-col>{{ image.upload_date }}</v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col cols="3">Views</v-col>
          <v-col cols="auto">{{ image.views }}</v-col>
          <v-col v-if="image.last_viewed"
            >(Last viewed
            {{ new Date(image.last_viewed).toDateString() }})</v-col
          >
        </v-row>

        <v-row align="center" v-if="availableVariants.length" dense>
          <v-col cols="3">Variants</v-col>
          <v-col>
            <v-chip-group
              v-model="selectedVariantIndex"
              mandatory
              active-class="primary"
            >
              <v-chip v-for="variant in availableVariants" :key="variant">
                {{ variant }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-text-field label="URL" readonly :value="image_src" />
          </v-col>
        </v-row>

        <v-row align="center" dense>
          <v-col>
            <v-textarea
              label="Description"
              auto-grow
              rows="1"
              v-model="image.description"
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col>
            <v-checkbox label="Restricted" v-model="image.restricted" />
          </v-col>
        </v-row>

        <v-card-subtitle>Referers</v-card-subtitle>
        <v-data-table :headers="referers_headers" :items="image.referers" />
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import UploaderInfo from "../components/UploaderInfo.vue"
const { VUE_APP_IMAGE_MANAGER_API_URL } = process.env

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
      availableVariants: [],
      selectedVariantIndex: 0,
      referers_headers: [
        { text: "URL", value: "url" },
        { text: "Last request", value: "last_request" },
        { text: "Views", value: "views" },
      ],
    }
  },
  mounted() {
    this.get_image_details()
    this.getImageVariants()
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
    async getImageVariants() {
      try {
        const { data } = await this.axios.get("/variants")
        this.availableVariants = ["original", ...data.available]
        const variantIndex = this.availableVariants.findIndex(
          (v) => v === data.default
        )
        if (variantIndex >= 0) this.selectedVariantIndex = variantIndex
      } catch (error) {
        console.error(error)
      }
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
    selectedVariant() {
      return this.availableVariants[this.selectedVariantIndex]
    },
    image_src() {
      const base = `${VUE_APP_IMAGE_MANAGER_API_URL}/images/${this.image_id}`
      if (this.selectedVariant) return `${base}?variant=${this.selectedVariant}`
      else return base
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

<style scoped>
.image_wrapper {
  display: flex;
  justify-content: center;
}
.image_preview {
  max-width: 100%;
}
</style>
