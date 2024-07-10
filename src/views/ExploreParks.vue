<template>
  <div class="explore">
    <h1>Parks in</h1>
    <ul>
      <li v-for="park in parks" :key="park.id">
        {{ park.fullName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { exploreParks } from '../api/recreationApi';

export default {
  name: 'ExploreParks',
  setup() {
    const parks = ref([]);

    const loadParks = async () => {
      parks.value = await exploreParks();
    };

    onMounted(() => {
      loadParks();
    });

    return { parks };
  }
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>

<style>
@media (min-width: 1024px) {
  .explore {
    min-width: 50%;
  }
}
</style>
