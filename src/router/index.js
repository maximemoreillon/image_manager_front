import Vue from 'vue'
import VueRouter from 'vue-router'
import Upload from '../views/Upload.vue'
import List from '../views/List.vue'
import ViewUpload from '../views/ViewUpload.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'upload',
    component: Upload
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/images/:id',
    name: 'upload_details',
    component: ViewUpload,
  },
  {
    path: '/uploads',
    name: 'list',
    component: List
  },
  {
    path: '/view_upload',
    name: 'view_upload',
    component: ViewUpload
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
