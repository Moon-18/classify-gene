<template>
  <div class="w-full h-full">
    <!-- <h2>{{ name }}</h2> -->
    <ClientOnly fallback-tag="div" fallback="Loading Chart">
      <VChart class="h-900px w-full" :option="option" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent, LineChart, CanvasRenderer]);
const { series, xAxisData } = useData('lineData', 0.1);
// console.log(xAxisData, '横坐标');

const option = ref({
  title: {
    // text: 'Stacked Line',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['单细胞', '多细胞'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData,
  },
  yAxis: {
    type: 'value',
  },
  series: series,
});
</script>

<style scoped></style>
