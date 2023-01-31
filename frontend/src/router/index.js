import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import PropertyListView from '../views/properties/PropertyListView.vue'
import PropertyDetailView from '../views/properties/PropertyDetailView.vue'
import PropertyCreateView from '../views/properties/PropertyCreateView.vue'

const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: SignUpView
  },
  {
    path: '/properties',
    children: [
      {
        path: '',
        name: 'propertyList',
        component: PropertyListView
      },
      {
        path: '/properties/:id',
        name: 'propertyDetail',
        component: PropertyDetailView
      },
      {
        path: '/properties/new',
        name: 'propertyCreate',
        component: PropertyCreateView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/sign-in', '/sign-up'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('accessToken');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/sign-in');
  } else {
    next();
  }
});

export default router
