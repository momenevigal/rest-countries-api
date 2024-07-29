<template>
  <!-- Region filter component -->
  <div class="w-[200px] cursor-pointer">
    <!-- Selected item -->
    <div
      class="bg-white rounded-[5px] md:h-[56px] flex items-center relative text-very-dark-blue-b
      md:text-[0.875rem] text-[0.75rem] shadow-[0_2px_9px_rgba(0,0,0,0.053)] mb-[4px]
      px-[24px] py-[14px] dark:bg-dark-blue dark:text-white"
      data-test="selected-region"
      @click="toggleItemsList()"
    >
      <FilterIcon
        class="absolute right-[19px] top-[50%] translate-y-[-50%] md:w-[12px]
        md:h-[12px] md:right-[22px]"
        :class="isItemsListOpen ? '' : 'rotate-180'"
      />

      {{ selectedItem === '' ? 'Filter by Region' : selectedItem }}
    </div>

    <!-- Filter items container -->
    <div
      v-if="isItemsListOpen"
      class="bg-white shadow-[0_2px_9px_rgba(0,0,0,0.053)] px-[24px] py-[16px] md:py-[18px]
      rounded-[5px] absolute w-[200px] dark:bg-dark-blue dark:text-white"
      data-test="filter-items-wrapper"
    >
      <div
        v-for="item in props.itemsList" 
        :key="item"
        class="text-[0.75rem] mb-[8px] last:mb-0 md:text-[0.875rem]"
        data-test="filter-item"
        @click="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import FilterIcon from '@/components/icons/FilterIcon.vue';

// Define the props interface
interface Props {
  itemsList: string[];
}

// Define the emits interface
interface Emits {
  (event: 'region-filter', value: string): void;
}

// Props declaration
const props = defineProps<Props>();  // Using props here

// Emits declaration
const emit = defineEmits<Emits>();

// Initialize Vuex store
const store = useStore();

// Reactive variables
const selectedItem = ref<string>('');
const isItemsListOpen = ref<boolean>(false);

// Methods
const selectItem = (newSelectedItem: string) => {
  selectedItem.value = newSelectedItem;
  emit('region-filter', selectedItem.value);
  isItemsListOpen.value = false;
};

const toggleItemsList = () => {
  isItemsListOpen.value = !isItemsListOpen.value;
};

// On component mount, set the selected item based on the current region
onMounted(() => {
  if (store.state.countries.currentRegion === 'all') return;
  selectedItem.value = store.state.countries.currentRegion;
});
</script>