<template>
  <AppTemplate
    :options="options"
    @user="get_user($event)">

    <template v-slot:nav>
      <v-list
        dense
        nav >
        <v-list-item
          v-for="(item, index) in nav"
          :key="`nav_item_${index}`"
          :to="item.to"
          exact>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

  </AppTemplate>
</template>

<script>
import AppTemplate from '@moreillon/vue_application_template_vuetify'
export default {
  name: 'App',

  components: {
    AppTemplate
  },

  data: () => ({
    options: {
      title: 'Images manager',
      skip_greetings: process.env.NODE_ENV === 'development',
      authenticate: true,
      login_url: process.env.VUE_APP_LOGIN_URL,
      identification_url:process.env.VUE_APP_IDENTIFICATION_URL,
    },
    nav: [
      {title: 'Upload', to: {name: 'Upload'}, icon: 'mdi-upload'},
      {title: 'Images', to: {name: 'Images'}, icon: 'mdi-image'},
      {title: 'About', to: {name: 'About'}, icon: 'mdi-information-outline'},
    ]
  }),

  methods: {
    get_user(user){
      this.$store.commit('set_current_user', user)
    }
  }
};
</script>
