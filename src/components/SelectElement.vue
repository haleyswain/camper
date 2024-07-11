// a generic reusable component. versatile and flexible select element that 
can be used across different parts of the application with minimal configuration
<template>
  <div>
    <label :for="selectId">{{ label }}</label>
    <select :id="selectId" v-model="selectedValue">
      <option v-for="item in items" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <p>Selected Value: {{ selectedValue }}</p>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

// Define props
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  keyField: {
    type: String,
    default: 'value'
  },
  initialValue: {
    type: [String, Number, Object],
    default: ''
  },
  selectId: {
    type: String,
    default: 'select'
  },
  label: {
    type: String,
    default: 'Select an option:'
  },
  onSelectedChange: {
    type: Function,
    required: true
  }
});

// Reactive state
const selectedValue = ref(props.initialValue);

// Watch for changes in selectedValue and call the callback prop
watch(selectedValue, (newVal) => {
  props.onSelectedChange(newVal);
});
</script>

<style scoped>
  label {
    margin-right: 10px;
  }

  select {
    margin: 10px 0;
    padding: 5px;
  }

  p {
    margin-top: 10px;
  }
</style>