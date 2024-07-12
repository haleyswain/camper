<template>
	<div class="passport">
		<div class="passport__loading" v-if="loading">Loading...</div>
		<ul v-for="location in stampLocations" :key="location.id">
			<li>{{ location.label }}</li>
		</ul>
		<div v-if="error" class="passport__error">
      Error loading passport stamp locations: {{ error }}
    </div>
	</div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { exploreStampLocations } from '../api/recreationApi';
  
  // initialize reactive properties
  const loading = ref(false);
	const stampLocations = ref([]);
	const error = ref(false);
  
  // make api call
	const loadPassportStampLocations = async () => {
  loading.value = true;
  error.value = null;
  try {
    stampLocations.value = await exploreStampLocations();
  } catch (err) {
    error.value = err.message || 'Failed to load stamp locations';
  } finally {
    loading.value = false;
  }
};
  onMounted(async () => {
    await loadPassportStampLocations();
  })
  </script>
  
<style lang="scss" scoped>
.passport {
	color: white;
	margin:auto;
	background: black;
	&__loading {
		font-size: 24px;
	}
	&__error {
		font-size: 24px;
	}
}
</style>
  