<template>
  <div class="w-full">
    <h1 class="text-center">分类方法</h1>
    <DescribeTable :info="info" :title="['模型名称', '含义']" />

    <h1 class="text-center mt-10">混淆矩阵</h1>
    <DescribeTable :info="standard" :title="['名称', '含义']" />

    <div class="grid grid-cols-2 mt-10">
      <Matrix v-for="item in matrix" :name="item.name" :data="item.matrix" :size="cur" />
    </div>

    <h1 class="text-center mt-10">性能指标</h1>
    <DescribeTable :info="benchmark" :title="['名称', '含义', '公式']" />

    <h1 class="text-center mt-10">性能比较</h1>
    <Bar :data="barData" />
    <div
      class="mt-10 bg-white bg-opacity-50 sticky bottom-0px w-full z-999 flex w-full items-center mt-10 p-10 backdrop-filter backdrop-blur-lg"
    >
      <h2 class="text-center w-400px">测试集/总数据集（测试集规模）</h2>
      <div class="w-full">
        <SwitchInput :value="cur" @update="update" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta(useTdkMap('index'));

const cur = ref(0.1);
const update = (num: number) => {
  cur.value = num;
};

const matrix = ref(useData('matrix', cur.value));
const barData = ref(useData('bar', cur.value));
const info = useData('info', cur.value);
const benchmark = ref(useData('benchmark', cur.value));
const standard = useData('standard', cur.value);

watch(cur, () => {
  matrix.value = useData('matrix', cur.value);
  barData.value = useData('bar', cur.value);
  benchmark.value = useData('benchmark', cur.value);
  // console.log('🚀规模改变', cur, matrix.value[0]);
});
</script>

<style scoped></style>
