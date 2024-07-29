import { Module } from 'vuex';
import { Country } from '@/interfaces/Country';

export interface CountriesState {
  allCountries: Country[];
  currentCountry: Country | null;
  currentRegion: string;
}

// Define the root state interface
interface RootState {
  countries: CountriesState;
}

const countriesStore: Module<CountriesState, RootState> = {
  namespaced: true,

  state: () => ({
    allCountries: [],
    currentCountry: null,
    currentRegion: 'all',
  }),

  getters: {
    getCountriesByRegion: (state) => {
      if (state.currentRegion === 'all') return state.allCountries;
      return state.allCountries.filter((country) => country.region === state.currentRegion);
    },
    getCountriesByName: () => (arr: Country[], countryName: string) => arr.filter((country) => {
      const regexCountryName = new RegExp(`${countryName}`, 'i');
      const result = country.name.common.match(regexCountryName);
      return (result && result.index === 0);
    }),
    getAllCountriesNames: (state) => state.allCountries.map(
      (country) => country.name.common.toLowerCase(),
    ),
    getCurrentCountry:(state) => {
      return state.currentCountry;
    }
  },
  
  actions: {
    async loadAllCountries({ commit }) {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags');
        const data = await response.json();
        commit('setAllCountries', data);
      } catch {
        commit('setAllCountries', []);
      }
    },
    async loadNewCurrentCountry({ commit }, countryName: string) {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const [data] = await response.json();
        commit('setCurrentCountry', data);
      } catch {
        commit('setCurrentCountry', {});
      }
    },
    setFilterRegion({ commit }, newRegion: string) {
      commit('setCurrentRegion', newRegion);
    },
  },

  
  mutations: {
    setAllCountries(state, countries: Country[]) {
      state.allCountries = countries;
    },
    setCurrentCountry(state, country: Country | null) {
      state.currentCountry = country;
    },
    setCurrentRegion(state, region: string) {
      state.currentRegion = region;
    },
  },
};

export default countriesStore;
