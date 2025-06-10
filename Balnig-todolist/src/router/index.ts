import { createRouter, createWebHistory } from 'vue-router' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/page-one.vue'),
    },
    {
      path: '/todo',
      name: 'ToDoList',
      component: import('../components/page-two.vue'),
    },
  ],
})

export default router
