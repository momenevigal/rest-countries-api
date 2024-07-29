
import { createStore } from "vuex";
import countriesStore, { CountriesState } from './countriesStore';

// Define the root state type
export interface State {
  countries: CountriesState;
}

// Create the Vuex store instance
export default createStore<State>({
  modules: {
    countries: countriesStore,
  },
});
