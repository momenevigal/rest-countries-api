<template>
  <!-- Navigation bar component -->
  <nav
    class="flex justify-between items-center py-[30px] px-[16px] bg-[white] dark:bg-dark-blue
    shadow-[0_2px_4px_rgba(0,0,0,0.06)] sm:px-[40px] lg:px-[81px] lg:py-[24px]"
  >
    <h1
      class="text-[0.875rem] text-very-dark-blue-b font-extrabold sm:text-[1.5rem] dark:text-white"
      data-test="navigation-heading"
    >
      Where in the world?
    </h1>

    <DarkModeButton />
  </nav>
</template>

<script setup lang="ts">
import DarkModeButton from '@/components/buttons/DarkModeButton.vue';
</script>
