import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import TabsPage from '@/views/TabsPage.vue'
import SignupPageVue from '@/views/SignupPage.vue'
import LoginPageVue from '@/views/LoginPage.vue'
import NewTrip from '@/views/NewTrip.vue';
import PasswordPage from '@/views/PasswordPage.vue';
import NewPlace from '@/views/NewPlace.vue';
import TripDetails from '@/views/TripDetails.vue';



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
  path: '/login',
  name: 'Login',
  component: LoginPageVue,
},
  {
    path : '/component',
    name: 'Component',
    component: () => import('@/views/Component.vue')
  },
  {
    path : '/new-trip',
    name: 'NewTrip',
    component: NewTrip
  },
  {
  path : '/password',
  name: 'PasswordPage',
  component: PasswordPage
},
{
  path : '/new-place',
  name: 'NewPlace',
  component: () => import('@/views/NewPlace.vue')
},
{
  path : '/trip-details',
  name: 'TripDetails',
  component: () => import('@/views/TripDetails.vue')
}
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
