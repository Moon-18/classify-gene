<script lang="ts" setup>
const { data, name, size } = defineProps<{ data: number[][]; name: string; size: number }>();

// 引入 vue-echarts 组件
import VChart from 'vue-echarts';

import { use } from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import { TooltipComponent, ToolboxComponent, GridComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TooltipComponent, ToolboxComponent, GridComponent, VisualMapComponent, HeatmapChart, CanvasRenderer]);
</script>

<template>
  <div class="inline-block">
    <h2>{{ name }}</h2>
    <ClientOnly fallback-tag="div" fallback="Loading Chart">
      <VChart
        class="h-300px w-full"
        :option="{
          tooltip: {
            position: 'top',
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            height: '50%',
            top: '10%',
          },
          xAxis: {
            type: 'category',
            data: ['true', 'false'],
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: 'category',
            data: ['negative', 'positive'],
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            min: 0,
            max: 500 * size,
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
        }"
      />
    </ClientOnly>
  </div>
</template>
