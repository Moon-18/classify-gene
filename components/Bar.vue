<template>
  <ClientOnly fallback-tag="div" fallback="Loading comments...">
    <VChart class="chart" :option="option" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import VChart, { THEME_KEY } from 'vue-echarts';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TitleComponent, TooltipComponent, LegendComponent, GridComponent, BarChart, CanvasRenderer]);
// provide(THEME_KEY, 'dark');
const data = useData('bar');
const option = ref({
  title: {
    // text: '各种机器学习算法性能比较',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    position: 'top',
    max: 1,
    min: 0,
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: 'category',
    data: data?.yAxisData, // 各种机器学习算法
  },
  series: [
    // 各种指标对应的一系列 算法的值
    ...(data?.series || []),
  ],
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
