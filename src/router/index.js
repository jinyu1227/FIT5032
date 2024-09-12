import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebasesSigninView from '@/views/FirebasesSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import FirebaseLogoutView from '@/views/FirebaseLogoutView.vue'
import AddBookView from '@/views/AddBookView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      if (isAuthenticated) {
        next()
      } else {
        next({ name: 'AccessDenied' })
      }
    }
  },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebasesSigninView
  },
  {
    path: '/fireregister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/firelogout',
    name: 'FireLogout',
    component: FirebaseLogoutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
