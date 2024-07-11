// Creates a Pinia store to manage the selected state.
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore('state', () => {
  const selectedState = ref('');

  const setSelectedState = (state) => {
    selectedState.value = state;
  };

  return { selectedState, setSelectedState };
});