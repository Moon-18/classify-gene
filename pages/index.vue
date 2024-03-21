<template>
  <div class="w-full">
    <h1 class="text-center">分类方法</h1>
    <DescribeTable :info="info" :title="['模型名称', '含义']" />

    <h1 class="text-center">混淆矩阵</h1>
    <DescribeTable :info="standard" :title="['名称', '含义']" />

    <div class="grid grid-cols-2">
      <Matrix v-for="item in matrix" :name="item.name" :data="item.matrix" />
    </div>

    <h1 class="text-center">性能指标</h1>
    <DescribeTable :info="benchmark" :title="['名称', '含义', '公式']" />

    <h1 class="text-center">性能比较</h1>
    <Bar />
  </div>
</template>

<script setup lang="ts">
useSeoMeta(useTdkMap('index'));
const matrix = useData('matrix');
const info = useData('info');
const benchmark = useData('benchmark');
const standard = useData('standard');
</script>

<style scoped></style>
