<template>
  <!-- Dark mode button component -->
  <button
    class="flex justify-center items-center text-[0.75rem] font-semibold text-very-dark-blue-b
    sm:text-[0.85rem] lg:text-[1rem] dark:text-white"
    data-test="dark-mode-button"
    @click="toggleDarkMode"
  >
    <MoonIcon class="w-[16px] h-[16px] mr-[8px] lg:w-[20px] lg:h-[20px]" />
    Dark Mode
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';

/* Dark mode active status */
const isDarkModeActive = ref<boolean>(false);

const setRootDarkModeClass = () => {
  if (isDarkModeActive.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/* Update current dark mode status */
const updateDarkModeStatus = () => {
  const storedDarkMode = localStorage.getItem('darkMode');
  isDarkModeActive.value = storedDarkMode === 'true';
  setRootDarkModeClass();
};

const toggleDarkMode = () => {
  console.log("Dark mode has been toggled");
  isDarkModeActive.value = !isDarkModeActive.value;
  localStorage.setItem('darkMode', isDarkModeActive.value.toString());
  setRootDarkModeClass();
};

onMounted(updateDarkModeStatus);
</script>
