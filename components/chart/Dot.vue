<template>
  <div class="w-full h-800px">
    <ClientOnly fallback-tag="div" fallback="Loading Chart">
      <VChart class="chart" :option="option" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import VChart, { THEME_KEY } from 'vue-echarts';
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  BrushComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  BrushComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
  ScatterChart,
  CanvasRenderer,
]);
const { multi, simple, ogs } = useData('dot', 0.1);
const option = {
  title: {
    text: '所有物种在特定正交群分布(去重)',
    subtext: 'SDU',
  },
  grid: {
    left: '3%',
    right: '7%',
    bottom: '7%',
    containLabel: true,
  },
  tooltip: {
    // trigger: 'axis',
    showDelay: 0,
    formatter: function (params: any) {
      return params.seriesName + ' <br/>正交群名称 ' + params.value[0] + '<br/>正交群个数    ' + params.value[1] + '';
    },
    axisPointer: {
      show: true,
      type: 'cross',
      lineStyle: {
        type: 'dashed',
        width: 1,
      },
    },
  },
  toolbox: {
    feature: {
      dataZoom: {},
      brush: {
        type: ['rect', 'polygon', 'clear'],
      },
      saveAsImage: {},
    },
  },
  brush: {},
  legend: {
    data: ['多细胞', '单细胞'],
    left: 'center',
    bottom: 10,
  },
  xAxis: [
    {
      type: 'category',
      scale: true,
      axisLabel: {
        formatter: '正交群 {value}',
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    //   scale: true,
      axisLabel: {
        formatter: '个数 {value}',
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '多细胞',
      type: 'scatter',
      emphasis: {
        focus: 'series',
      },
      // prettier-ignore
      data: multi,
      markArea: {
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderWidth: 1,
          borderType: 'dashed',
        },
        data: [
          [
            {
              name: '多细胞 Data Range',
              xAxis: 'min',
              yAxis: 'min',
            },
            {
              xAxis: 'max',
              yAxis: 'max',
            },
          ],
        ],
      },
      // markPoint: {
      //   data: [
      //     { type: 'max', name: 'Max' },
      //     { type: 'min', name: 'Min' }
      //   ]
      // },
      markLine: {
        lineStyle: {
          type: 'solid',
        },
        // data: [{ type: 'average', name: 'AVG' }, { xAxis: 160 }],
      },
    },
    {
      name: '单细胞',
      type: 'scatter',
      emphasis: {
        focus: 'series',
      },
      // prettier-ignore
      data: simple,
      markArea: {
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderWidth: 1,
          borderType: 'dashed',
        },
        data: [
          [
            {
              name: '单细胞 Data Range',
              xAxis: 'min',
              yAxis: 'min',
            },
            {
              xAxis: 'max',
              yAxis: 'max',
            },
          ],
        ],
      },
      markPoint: {
        data: [
        //   { type: 'max', name: 'Max' },
        //   { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        lineStyle: {
          type: 'solid',
        },
        // data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }],
      },
    },
  ],
};
</script>

<style scoped></style>
