<script setup lang="ts">
// 引入 vue-echarts 组件
import VChart, { THEME_KEY } from 'vue-echarts';

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

// 设置黑暗模式主题
// provide(THEME_KEY, 'dark');

// 图表数据
const option = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'OG',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 0.7996323529411765, name: 'OG0000336' },
        { value: 0.12399640522875825, name: 'OG0004904' },
        { value: 0.042175163398692726, name: 'OG0031400' },
        { value: 0.03419607843137254, name: 'OG0049486' },
      ],
    },
  ],
});
// const t = useData('line');
</script>

<template>
  <div>
    <!-- 客户端组件 -->
    <ClientOnly fallback-tag="div" fallback="Loading comments...">
      <VChart class="h-100vh" :option="option" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
