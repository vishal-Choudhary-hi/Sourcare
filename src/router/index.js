import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreatePlaylist from '../views/playlist/CreatePlaylist.vue'
import PlaylistDetails from '@/views/playlist/PlaylistDetails.vue'
import UserPlaylist from '@/views/playlist/UserPlaylist.vue'
import MySaveList from '@/views/MySaveList.vue'
import { projectAuth } from '@/firebase/config'

const requireAuth=(to,from,next)=>{
  let user=projectAuth.currentUser
  if(!user){
    next({name:'Login'})
  }
  else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter:requireAuth,
  },
  {
    path: '/login',
    name:'Login',
    component:Login
  },
  {
    path: '/signup',
    name:'Signup',
    component:Signup
  },
  {
    path:'/playlist/create',
    name:'CreatePlaylist',
    component:CreatePlaylist,
    beforeEnter:requireAuth,
  },
  {
    path:'/playlist/:id',
    name:'PlaylistDetails',
    component:PlaylistDetails,
    beforeEnter:requireAuth,
    props:true,
  },
  {
    path:'/playlists/user',
    name:'UserPlaylist',
    component:UserPlaylist,
    beforeEnter:requireAuth
  },
  {
    path:'/search',
    name:'MySaveList',
    component:MySaveList,
    beforeEnter:requireAuth,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
