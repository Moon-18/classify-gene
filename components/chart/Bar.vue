<template>
  
  <ClientOnly fallback-tag="div" fallback="Loading Chart">
    <VChart
      class="chart"
      :option="{
        title: {
          // text: '各种机器学习算法性能比较',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
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
      }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import VChart, { THEME_KEY } from 'vue-echarts';
import { BarChart } from 'echarts/charts';
import { TitleComponent, ToolboxComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TitleComponent, ToolboxComponent, TooltipComponent, LegendComponent, GridComponent, BarChart, CanvasRenderer]);
const { data } = defineProps<{
  data: {
    yAxisData: string[];
    series: {
      name: string;
      type: string;
      data: number[];
    }[];
  };
}>();
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
