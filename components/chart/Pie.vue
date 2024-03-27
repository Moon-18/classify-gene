<script setup lang="ts">
// 引入 vue-echarts 组件
import VChart, { THEME_KEY } from 'vue-echarts';

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([TooltipComponent, ToolboxComponent, LegendComponent, PieChart, CanvasRenderer]);

const { data } = defineProps<{ data: { name: string; value: number }[] }>();
</script>

<template>
  <div>
    <!-- 客户端组件 -->
    <ClientOnly fallback-tag="div" fallback="Loading Chart">
      <VChart
        class="h-100vh"
        :option="{
          tooltip: {
            trigger: 'item',
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
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
              data,
            },
          ],
        }"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
