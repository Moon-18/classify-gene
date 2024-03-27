<template>
  <div class="flex items-center flex-col">
    <input
      type="range"
      class="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="updateValue"
    />
    <div class="flex justify-between text-sm w-full">
      <span v-for="n in Math.floor((max - min) / step) + 1" :key="n">
        {{ (min + (n - 1) * step).toFixed(1) }}
      </span>
    </div>
    <!-- <div class="ml-1">{{ value }}</div> -->
  </div>
</template>

<script setup lang="ts">
defineProps({
  min: { type: Number, default: 0.1 },
  max: { type: Number, default: 0.9 },
  step: { type: Number, default: 0.1 },
  value: { type: Number, required: true },
});
const emit = defineEmits<{ (e: 'update', value: number): void }>();
const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const n = target.value;
  emit('update', Number(n));
};
</script>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  @apply w-4 h-4 bg-blue-500 rounded-full appearance-none;
}

input[type='range']::-moz-range-thumb {
  @apply w-4 h-4 bg-blue-500 rounded-full appearance-none;
}

input[type='range']::-ms-thumb {
  @apply w-4 h-4 bg-blue-500 rounded-full appearance-none;
}
</style>
