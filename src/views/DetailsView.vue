<template>
  <div>
    <header>
      <NavigationBar />
    </header>

    <main class="xlg:w-[70%] xlg:mx-auto">
      <section class="pl-[28px] pt-[40px] pb-[64px] lg:pl-[80px] lg:py-[80px]">
        <RouterLink
          to="/"
          class="flex justify-center items-center shadow-[0_0_7px_0_rgba(0,0,0,0.3)]
          py-[6px] w-[104px] dark:text-white dark:bg-dark-blue rounded-[2px]
          lg:rounded-[10px] lg:py-[10px] lg:w-[136px] dark:shadow-none"
          data-test="back-homepage-button"
        >
          <ArrowIcon class="mr-[8px] lg:w-[20px] lg:h-[20px]" />
          Back
        </RouterLink>
      </section>

      <section
        class="px-[28px] pb-[60px] sm:px-[15%] md:flex md:justify-around
        md:px-[28px] md:items-center md:pb-0 lg:justify-between lg:px-[80px]
        dark:text-white"
      >
        <div
          class="bg-no-repeat bg-cover bg-center w-[100%] h-[229px] rounded-[5px] mb-[44px]
          md:w-[560px] md:h-[300px] md:mb-0 md:mr-[60px] lg:h-[401px] lg:mr-[120px]
          lg:rounded-[10px]"
          :style="`background-image: url(${countryDetails.flag});`"
        />

        <article>
          <h1
            class="font-nunito font-extrabold text-[1.375rem] mb-[16px] sm:mb-[23px]
            lg:text-[2rem]"
            data-test="country-details-name"
          >
            {{ countryDetails.name }}
          </h1>

          <div class="mb-[34px] font-nunito text-[0.875rem] sm:flex lg:text-[1rem] lg:mb-[68px]">
            <div class="mb-[32px] sm:mb-0 sm:mr-[117px] lg:mr-[141px]">
              <p
                class="mb-[10px]"
                data-test="country-details-native-name"
              >
                <span class="font-semibold">Native Name:</span>
                {{ countryDetails.nativeName }}
              </p>

              <p
                class="mb-[10px]"
                data-test="country-details-population"
              >
                <span class="font-semibold">Population:</span>
                {{ countryDetails.population.toLocaleString() }}
              </p>

              <p
                class="mb-[10px]"
                data-test="country-details-region"
              >
                <span class="font-semibold">Region:</span> {{ countryDetails.region }}
              </p>

              <p
                class="mb-[10px]"
                data-test="country-details-sub-region"
              >
                <span class="font-semibold">Sub Region:</span>
                {{ countryDetails.subRegion }}
              </p>

              <p data-test="country-details-capital">
                <span class="font-semibold">Capital:</span>
                {{ countryDetails.capital }}
              </p>
            </div>

            <div>
              <p
                class="mb-[10px]"
                data-test="country-details-top-level-domain"
              >
                <span class="font-semibold">Top Level Domain:</span>
                {{ countryDetails.topLevelDomain }}
              </p>

              <p
                class="mb-[10px]"
                data-test="country-details-currencies"
              >
                <span class="font-semibold">Currencies:</span>
                {{ countryDetails.currencies }}
              </p>

              <p>
                <span class="font-semibold">Languages: </span>
                <span
                  v-for="lang in countryDetails.languages"
                  :key="lang"
                  data-test="country-details-language"
                >
                  {{ lang }},
                </span>
              </p>
            </div>
          </div>
          
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { Country } from "@/interfaces/Country";


const store = useStore();

const countryDetails = computed(() => {
  const currentCountry = store.getters['countries/getCurrentCountry'] as Country;
 
  
  return {
    name: currentCountry.name.common,
    nativeName: Object.values(currentCountry.name.nativeName)[0]?.common || '',
    population: currentCountry.population,
    region: currentCountry.region,
    subRegion: currentCountry.subregion,
    capital: currentCountry.capital[0] || 'N/A',
    flag: currentCountry.flags.svg,
    topLevelDomain: currentCountry.tld[0] || '',
    currencies: Object.values(currentCountry.currencies)[0]?.name || '',
    languages: Object.values(currentCountry.languages),
    bordersCountries: currentCountry.borders || [],
  };
});
</script>
