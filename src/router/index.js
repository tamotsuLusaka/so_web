import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Photo from '../views/Photo.vue'
import ShowPhoto from '../views/ShowPhoto.vue'
import Movie from '../views/Movie.vue'
import Web from '../views/Web.vue'
import ShowWeb from '../views/ShowWeb.vue'
import Design from '../views/Design.vue'
import ShowDesign from '../views/ShowDesign.vue'
import Brand from '../views/Brand.vue'
import ShowBrand from '../views/ShowBrand.vue'
import Policy from '../views/Policy.vue'
import Manager from '../views/manager/Manager.vue'
import ManagerOfPhoto from '../views/manager/ManagerOfPhoto.vue'
import CreatePhoto from '../views/manager/CreatePhoto.vue'
import ManagerOfMovie from '../views/manager/ManagerOfMovie.vue'
import CreateMovie from '../views/manager/CreateMovie.vue'
import ManagerOfWeb from '../views/manager/ManagerOfWeb.vue'
import CreateWeb from '../views/manager/CreateWeb.vue'
import ManagerOfDesign from '../views/manager/ManagerOfDesign.vue'
import CreateDesign from '../views/manager/CreateDesign.vue'
import ManagerOfBrand from '../views/manager/ManagerOfBrand.vue'
import CreateBrand from '../views/manager/CreateBrand.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    props: true,
  },
  {
    path: '/gallery/photography',
    name: 'Photo',
    component: Photo,
    props: true,
  },
  {
    path: '/gallery/photography/:id',
    name: 'ShowPhoto',
    component: ShowPhoto,
    props: true
  },
  {
    path: '/gallery/videography',
    name: 'Movie',
    component: Movie,
    props: true
  },
  {
    path: '/gallery/web',
    name: 'Web',
    component: Web,
    props: true
  },
  {
    path: '/gallery/web/:id',
    name: 'ShowWeb',
    component: ShowWeb,
    props: true
  },
  {
    path: '/gallery/design',
    name: 'Design',
    component: Design,
    props: true
  },
  {
    path: '/gallery/design/:id',
    name: 'ShowDesign',
    component: ShowDesign,
    props: true
  },
  {
    path: '/gallery/brand',
    name: 'Brand',
    component: Brand,
    props: true
  },
  {
    path: '/gallery/brand/:id',
    name: 'ShowBrand',
    component: ShowBrand,
    props: true
  },
  {
    path: '/policy',
    name: 'Policy',
    component: Policy,
    props: true
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
    props: true
  },
  {
    path: '/manager/photo',
    name: 'ManagerOfPhoto',
    component: ManagerOfPhoto,
    props: true
  },
  {
    path: '/manager/photo/create',
    name: 'CreatePhoto',
    component: CreatePhoto,
    props: true
  },
  {
    path: '/manager/photo/:id',
    name: 'EditPhoto',
    component: CreatePhoto,
    props: true
  },
  {
    path: '/manager/movie',
    name: 'ManagerOfMovie',
    component: ManagerOfMovie,
    props: true
  },
  {
    path: '/manager/movie/create',
    name: 'CreateMovie',
    component: CreateMovie,
    props: true
  },
  {
    path: '/manager/movie/:id',
    name: 'EditMovie',
    component: CreateMovie,
    props: true
  },
  {
    path: '/manager/web',
    name: 'ManagerOfWeb',
    component: ManagerOfWeb,
    props: true
  },
  {
    path: '/manager/web/create',
    name: 'CreateWeb',
    component: CreateWeb,
    props: true
  },
  {
    path: '/manager/web/:id',
    name: 'EditWeb',
    component: CreateWeb,
    props: true
  },
  {
    path: '/manager/design',
    name: 'ManagerOfDesign',
    component: ManagerOfDesign,
    props: true
  },
  {
    path: '/manager/design/create',
    name: 'CreateDesign',
    component: CreateDesign,
    props: true
  },
  {
    path: '/manager/design/:id',
    name: 'EditDesign',
    component: CreateDesign,
    props: true
  },
  {
    path: '/manager/brand',
    name: 'ManagerOfBrand',
    component: ManagerOfBrand,
    props: true
  },
  {
    path: '/manager/brand/create',
    name: 'CreateBrand',
    component: CreateBrand,
    props: true
  },
  {
    path: '/manager/brand/:id',
    name: 'EditBrand',
    component: CreateBrand,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  //リンク後にスクロールをトップに戻す
  scrollBehavior () {
    return document.getElementById('app').scrollIntoView();
  }
})

export default router
