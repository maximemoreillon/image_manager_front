import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Images from '../views/Images.vue'
import Upload from '../views/Upload.vue'
import Image from '../views/Image.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/images',
    name: 'Images',
    component: Images
  },
  {
    path: '/images/new',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/images/:_id',
    name: 'Image',
    component: Image
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
