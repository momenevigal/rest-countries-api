<template>
  <router-view v-slot="{ Component }">
    <Component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'; 
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  if (store.state.countries.allCountries.length !== 0) return;
  console.log("app mounted");
   store.dispatch('countries/loadAllCountries');
  // store.dispatch('loadAllCountries');
});
</script>
