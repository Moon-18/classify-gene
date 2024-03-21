<template>
  <div class="relative inline-block" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
    <slot></slot>
    <transition name="fade">
      <div
        v-if="showTooltip"
        class="w-full h-full absolute top-0 left-0 z-20 px-2 py-1 text-xs text-white bg-pink-200 text-center rounded-md"
        :class="tooltipClass"
      >
        {{ tooltipText }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { tooltipText } = defineProps<{ tooltipText: string }>();
const showTooltip = ref(false);

const tooltipClass = {
  'transition transition-all transform -translate-y-full': true,
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
