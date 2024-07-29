<template>
  <div>
    <header>
      <NavigationBar />
    </header>

    <main>

      <section
        class="mx-[16px] mt-[24px] mb-[32px] sm:mx-[80px] md:mt-[48px] md:flex md:justify-between
        md:items-center md:mb-[48px]"
      >
        <SearchBar
          class="mb-[40px] md:mb-0"
          @searched-country="handleSearchedCountry"
        />

        <RegionFilter
          :items-list="['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']"
          @region-filter="handleRegionFilter"
        />
      </section>

      <section
        class="grid gap-y-[40px] grid-cols-1 justify-evenly md:justify-between
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 md:mx-[80px] lg:gap-y-[75px]
        pb-[65px] lg:pb-[45px]"
      >
        <CountryCard
          v-for="country in filteredCountries"
          :key="country.name.common"
          class="justify-self-center"
          :card-data="{
            name: country.name.common,
            population: country.population,
            region: country.region, 
            capital: country.capital[0],
            flag: country.flags.svg,
          }"
          @country-clicked="handleCountryClicked"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import { useRouter } from 'vue-router';
import NavigationBar from '@/components/NavigationBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import RegionFilter from '@/components/RegionFilter.vue';
import CountryCard from '@/components/cards/CountryCard.vue';

const store = useStore();


const router = useRouter();

const getCountriesByRegion = computed(() => store.getters['countries/getCountriesByRegion']);
const getCountriesByName = (arr: any[], countryName: string) => store.getters['countries/getCountriesByName'](arr, countryName);

const setFilterRegion = (region: string) => store.dispatch('countries/setFilterRegion', region);
const loadAllCountries = () => store.dispatch('countries/loadAllCountries');

const searchedCountryName = ref<string>('');

const handleSearchedCountry = (searchValue: string) => {
  searchedCountryName.value = searchValue;
};

const handleRegionFilter = (region: string) => {
  setFilterRegion(region);
};

/* Redirect user to clicked country card's details page */
const handleCountryClicked = (countryName: string) => router.push(
  { name: 'details', params: { country: countryName } },
);

const filteredCountries = computed(() => {
  const countriesByRegion = getCountriesByRegion.value;
  return getCountriesByName(countriesByRegion, searchedCountryName.value);
});

onMounted(() => {
  loadAllCountries();
});
</script>