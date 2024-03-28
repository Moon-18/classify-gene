<template>
  <div class="w-full h-800px">
    <ClientOnly fallback-tag="div" fallback="Loading Chart">
      <VChart class="chart" :option="option" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TooltipComponent, TitleComponent, ToolboxComponent, GridComponent, DataZoomComponent, LineChart, CanvasRenderer]);

const totalLine = useData('totalLine', 0.1).total;
const n = totalLine.length;
const xAxisData: string[] = [];
const seriesData: number[] = [];

function padWithLeadingZeros(number: number, length: number = 7): string {
  return number.toString().padStart(length, '0');
}

for (let i = 0; i < n; i++) {
  xAxisData.push(`OG${padWithLeadingZeros(i)}`);
  seriesData.push(totalLine[i]);
}
console.log(xAxisData.length,'111');

const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt: any) {
      return [pt[0], '10%'];
    },
  },
  title: {
    left: 'center',
    text: '不同生物在同一正交群的总量',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
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
    boundaryGap: [0, '100%'],
    max: 21000,
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 0.2,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: 'Total',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)',
      },
      areaStyle: {
        color: 'rgb(255, 158, 68)',
      },
      data: seriesData,
    },
  ],
};
</script>

<style scoped></style>
