<script lang="ts" setup>
const { data, name } = defineProps<{ data: number[][]; name: string }>();
// console.log(data, name, '🚀');

// 引入 vue-echarts 组件
import VChart from 'vue-echarts';

import { use } from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TooltipComponent, GridComponent, VisualMapComponent, HeatmapChart, CanvasRenderer]);

const hours = ['true', 'false'];

const days = ['negative', 'positive'];
// 图表数据
const option = ref({
  tooltip: {
    position: 'top',
  },
  grid: {
    height: '50%',
    top: '10%',
  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 500,
    calculable: true,
    show: false,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%',
  },
  series: [
    {
      name: '预测值',
      type: 'heatmap',
      data: data,
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
const t = useData('bar');
</script>

<template>
  <div class="inline-block">
    <h2>{{ name }}</h2>
    <ClientOnly fallback-tag="div" fallback="Loading comments...">
      <VChart class="h-300px w-full" :option="option" />
    </ClientOnly>
  </div>
</template>
