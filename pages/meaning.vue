<template>
  <div>
    <h1 class="text-center">关键特征</h1>
    <span class="whitespace-pre-line text-gray-500 text-xl indent-md">{{ descStr }}</span>
    <Pie />
    <h1 class="text-center">生物学意义</h1>
    <DescribeTable :info="meaning" :title="['正交群', '生物学意义', '对应基因序列']" />
  </div>
</template>

<script setup lang="ts">
useSeoMeta(useTdkMap('meaning'));
const descStr =
  'DecisionTreeClassifier() 和 RandomForestClassifier() 都能获得关键特征索引和值，因为它们是基于决策树的算法，决策树本身就是一种解释性较好的算法。在决策树中，每个节点都代表一个特征，节点的分裂依据就是该特征的值，因此可以通过查看决策树的结构来获得关键特征的信息。\n\nKNeighborsClassifier()、GaussianNB()、MLPClassifier() 和 SVC() 都不能直接获得关键特征索引和值，因为它们是基于统计学习的算法，无法直接解释每个特征的重要性。但是可以通过一些可视化工具和特征选择方法来辅助分析关键特征。\n\n总的来说，如果需要获得关键特征的信息并且需要算法具有较好的解释性，建议选择基于决策树的算法，如 DecisionTreeClassifier() 和 RandomForestClassifier()。';
const meaning = useData('meaning');
</script>

<style scoped></style>
