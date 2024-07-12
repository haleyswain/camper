<template>
  <div class="explore">
    <h1>Parks in {{ selectedState }}</h1>
    <SelectElement
      :items="states"
      labelField="name"
      valueField="abbreviation"
      keyField="abbreviation"
      selectId="state-select"
      label="Select a state:"
      :initialValue="selectedState"
      :onSelectedChange="handleStateChange"
    />
    <div v-if="loading" class="explore__loading">Loading...</div>
    <ul>
      <li v-for="park in filteredParks" :key="park.id">
        <a :href="park.url">{{ park.fullName }}</a>
      </li>
    </ul>
    <div v-if="error" class="explore__error">
      Error loading parks: {{ error }}
    </div>
  </div>
</template>

// setup function is used to directly define reactive variables, functions, lifecycle hooks
<script setup>
import { ref, computed } from 'vue';
import { exploreParks } from '../api/recreationApi';
import { useStateStore } from '../stores/stateStore';
import SelectElement from '../components/SelectElement.vue';
import states from '../data/states.js';

// initialize reactive properties
const parks = ref([]);
const loading = ref(false);
const error = ref(null);

// make api call
const loadParks = async () => {
  loading.value = true;
  error.value = null; // Reset error state
  try {
    parks.value = await exploreParks();
  } catch (err) {
    error.value = err.message || 'Failed to load parks';
  } finally {
    loading.value = false;
  }
};

const stateStore = useStateStore();

const selectedState = computed({
  get: () => stateStore.selectedState,
  set: (value) => stateStore.setSelectedState(value)
});

const filteredParks = computed(() => {
  return parks.value.filter((park) => park.states.includes(selectedState.value));
});

const handleStateChange = (newValue) => {
  loadParks();
  selectedState.value = newValue;
  filterParksByState(newValue);
};

const filterParksByState = (state) => parks.value.filter((park) => park.states.includes(state));
</script>

<style lang="scss" scoped>
.explore {
  min-width: 50%;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color:black;
  &__loading {
    color: white;
    font-weight: 400;
  }
  &__error {
    color: white;
    font-size: 24px;
  }
}
</style>
