import {h, resolveComponent} from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      redirect: { name: 'projects-list' },
      component: {
        render() {
          return h(resolveComponent('router-view'))
        }
      },
      children: [
        {
          path: '',
          name: 'projects-list',
          component: () => import('../views/ProjectsView.vue')
        },
        {
          path: 'new',
          name: 'new-project',
          component: () => import('../components/projects/Form.vue')
        },
        // {
        //   path: ':id',
        //   name: 'project',
        //   component: defineAsyncComponent(() => import('../views/ProjectView.vue'))
        // },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
