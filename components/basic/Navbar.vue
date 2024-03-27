<template>
  <nav
    class="bg-opacity-50 bg-white sticky top-0 w-full z-999 backdrop-filter backdrop-blur-lg"
    :class="{ 'shadow-lg': isScroll || ishover }"
    @mouseover="ishover = true"
    @mouseleave="ishover = false"
  >
    <div class="w-1200px mx-auto flex items-center justify-between py-4">
      <div class="flex items-center">
        <ClientOnly>
          <template #fallback>
            <!-- <span class="text-24px font-semibold">机器学习在基因分类中的应用</span> -->
          </template>
          <VChart class="h-30px w-312px" :option="option" />
        </ClientOnly>
      </div>
      <ul class="flex">
        <li><NuxtLink class="px-4 py-2 text-gray-400 hover:text-gray-900" to="/">机器学习性能比较</NuxtLink></li>
        <li><NuxtLink class="px-4 py-2 text-gray-400 hover:text-gray-900" to="/meaning">生物学意义</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import VChart, { THEME_KEY } from 'vue-echarts';
import { GraphicComponent, type GraphicComponentOption } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([GraphicComponent, CanvasRenderer]);
const option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '机器学习在基因分类中的应用',
          fontSize: 24,
          fontWeight: '500',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1,
        },
        keyframeAnimation: {
          duration: 2000,
          loop: false,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0],
              },
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent',
              },
            },
            {
              percent: 1,
              style: {
                fill: 'black',
              },
            },
          ],
        },
      },
    ],
  },
};
const { isScroll } = useScroll();
const ishover = ref(false);
</script>

<style scoped></style>
