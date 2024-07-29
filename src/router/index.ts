import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import { useStore } from 'vuex';

// Define the routes with type annotations
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/details/:country',
    name: 'details',
    component: DetailsView,
    beforeEnter: async(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => { 

      const store = useStore()
      const countries = store.getters['countries/getAllCountriesNames'];

      // If user enters the path directly, load all countries
      if (countries.length === 0) {
        await store.dispatch('countries/loadAllCountries');
      }

      let canEnter = false;

      for (let i = 0; i < store.getters['countries/getAllCountriesNames'].length; i += 1) {
        if (to.params.country === store.getters['countries/getAllCountriesNames'][i]) {
          canEnter = true;
          break;
        }
      }

      if (canEnter) {
        await  store.dispatch('countries/loadNewCurrentCountry', to.params.country as string);
        next();
      } else {
        next({ name: 'home' });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*', // Added '*' to catch all unmatched paths
    redirect: { name: 'home' },
  },
];

// Create the router instance with the routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
