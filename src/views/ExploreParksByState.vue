<template>
  <div class="explore">
    <h1>Parks in</h1>
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
    <ul>
      <li v-for="park in filteredParks" :key="park.id">
        <a :href="park.url">{{ park.fullName }}</a>
      </li>
    </ul>
  </div>
</template>

// setup function is used to directly define reactive variables, functions, lifecycle hooks
<script setup>
import { ref, onMounted, computed } from 'vue';
import { exploreParks } from '../api/recreationApi';
import { useStateStore } from '../stores/stateStore';
import SelectElement from '../components/SelectElement.vue';
import states from '../data/states.js';

const parks = ref([]);

const loadParks = async () => {
  parks.value = await exploreParks();
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

const filterParksByState = (state) => {
  return parks.value.filter((park) => {
    console.log(park);
    return park.states === state;
  });
}

</script>

<style scoped>
@media (min-width: 1024px) {
  .explore {
    min-width: 50%;
  }
}
</style>
