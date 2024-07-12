<template>
	<div class="passport">
		<div class="passport__loading" v-if="loading">Loading...</div>
		<ul v-for="location in stampLocations" :key="location.id">
			<li>{{ location.label }}</li>
		</ul>
	</div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { exploreStampLocations } from '../api/recreationApi';
  
  // initialize reactive properties
  const loading = ref(false);
	const stampLocations = ref([]);
  
  // make api call
  const loadPassportStampLocations = async () => {
    loading.value = true;
    stampLocations.value = await exploreStampLocations();
    loading.value = false;
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
}
</style>
  