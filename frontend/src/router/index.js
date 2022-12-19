import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Movies from '../views/Movies.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
