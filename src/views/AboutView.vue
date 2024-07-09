<template>
  <div>
    <h1>Campgrounds in {{ state }}</h1>
    <ul>
      <li v-for="campground in campgrounds" :key="campground.FacilityID">
        {{ campground.FacilityName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchCampgrounds } from '../api/recreationApi';

export default {
  name: 'Campgrounds',
  setup() {
    const state = 'CA'; // Change this to the desired state
    const campgrounds = ref([]);

    const loadCampgrounds = async () => {
      campgrounds.value = await fetchCampgrounds(state);
    };

    onMounted(() => {
      loadCampgrounds();
    });

    return { state, campgrounds };
  }
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
