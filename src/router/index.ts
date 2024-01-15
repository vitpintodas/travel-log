import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import TabsPage from '../views/TabsPage.vue'
import SignupPageVue from '@/views/SignupPage.vue'
import LoginPageVue from '@/views/LoginPage.vue'


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
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {path: 'component',
      component: () => import('@/views/Component.vue')}
    ]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPageVue,
  },
{
  path: '/login',
  name: 'Login',
  component: LoginPageVue,
}
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router