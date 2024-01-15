import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import TabsPage from '../views/TabsPage.vue';
import SignupPageVue from '@/views/SignupPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { 
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
      },
      {
        path: 'trip',
        component: () => import('@/views/Trip.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'trip/new-trip',
        component: () => import('@/views/NewTrip.vue')
      },
    ]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPageVue,
  },
  {
    path : '/component',
    name: 'Component',
    component: () => import('@/views/Component.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
