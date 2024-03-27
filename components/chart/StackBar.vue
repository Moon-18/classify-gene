<template>
  <ClientOnly fallback-tag="div" fallback="Loading Chart">
    <!-- // xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, -->
    <VChart
      class="chart"
      :option="{
        legend: { selectedMode: false },
        grid: { left: 100, right: 100, top: 50, bottom: 50 },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        yAxis: { type: 'value' },
        xAxis: { type: 'category', data: stackbar.xAxisData },
        series: stackbar.series,
      }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import VChart, { THEME_KEY } from 'vue-echarts';
import { BarChart } from 'echarts/charts';
import { LegendComponent, GridComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([LegendComponent, GridComponent, BarChart, CanvasRenderer, ToolboxComponent]);

const stackbar = useData('stackbar', 0.1);
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
