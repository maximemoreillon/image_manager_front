<template>
  <v-card>
    <v-card-title>Image manager GUI</v-card-title>
    <v-card-subtitle> v{{ version }} </v-card-subtitle>
    <v-card-text>
      GUI for the image management microservice. Developed and maintained by
      <a href="https://maximemoreillon.com">Maxime Moreillon</a>
    </v-card-text>
    <v-card-text>
      <v-data-table
        hide-default-footer
        :itemsPerPage="-1"
        :headers="headers"
        :items="services"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { version } from "@/../package.json"
const {
  VUE_APP_LOGIN_URL,
  VUE_APP_IDENTIFICATION_URL,
  VUE_APP_USER_MANAGER_API_URL,
  VUE_APP_USER_MANAGER_GUI_URL,
  VUE_APP_IMAGE_MANAGER_API_URL,
} = process.env

export default {
  name: "About",
  data() {
    return {
      version,
      headers: [
        { text: "Service", value: "name" },
        { text: "URL", value: "url" },
      ],
      services: [
        {
          name: "Image manager GUI",
          url: window.location.origin,
        },
        {
          name: "Image manager back-end",
          url: VUE_APP_IMAGE_MANAGER_API_URL,
        },
        {
          name: "Login",
          url: VUE_APP_LOGIN_URL,
        },
        {
          name: "Identification",
          url: VUE_APP_IDENTIFICATION_URL,
        },
        {
          name: "User manager API",
          url: VUE_APP_USER_MANAGER_API_URL,
        },
        {
          name: "User-manager GUI",
          url: VUE_APP_USER_MANAGER_GUI_URL,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
