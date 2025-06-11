import { createRouter, createWebHistory } from 'vue-router' 
import PageOne from '../components/page-one.vue'
import PageTwo from '../components/page-two.vue'
import { RouteNames } from './route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.PageOne,
      component: PageOne,
    },
    {
      path: '/todo',
      name: RouteNames.PageTwo,
      component: PageTwo,
    },
  ],
})

export default router
