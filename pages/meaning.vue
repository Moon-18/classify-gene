<template>
  <div>
    <h1 class="text-center my-10">基于决策树的关键特征分析</h1>
    <div class="text-gray-500 text-xl indent">
      决策树算法的可解释性较好，主要是因为其生成的模型可以被直观地解释和理解。决策树通过数据特征来对每一个样本进行划分，生成一棵树形结构。这个树形结构可以被视为一系列简单的判断规则，可以帮助人们理解模型是如何做出决策的。
    </div>
    <div class="text-gray-500 text-xl indent">
      相比之下，其他传统机器学习算法生成的模型通常更复杂，难以被直观地解释和理解，即便使用sklearn分析在分类过程中发挥关键作用的特征，这些信息也不具有生物学意义上的可解释性。例如，SVM生成的模型是一个超平面，随机森林生成的模型是一组决策树的集合，KNN算法的模型本质上是一组训练数据集中的实例点，而不是一个明确的模型或规则。神将网络算法相比传统机器学习算法更加黑盒，可解释性也较差。
    </div>
    <div class="text-gray-500 text-xl indent mb-10px">基于以上原因，本文使用可视化方式分析决策树算法获得的关键特征。</div>
    <TotalLine />

    <h1 class="text-center my-10">不同规模下数据集关键特征</h1>
    <div class="bg-white w-full z-999 flex w-full items-center my-10 p-10">
      <h2 class="text-center w-400px">测试集/总数据集（测试集规模）</h2>
      <div class="w-full">
        <SwitchInput :value="cur" @update="update" />
      </div>
    </div>
    <Pie :data="pie" />
    <StackBar />

    <h1 class="text-center my-10">所有物种在关键特征正交群上的分布</h1>
    <LineData />
    <Dot />

    <h1 class="text-center my-10">关键特征对应生物学意义</h1>
    <DescribeTable :info="meaning" :title="['基因家族', '生物学含义']" />
  </div>
</template>

<script setup lang="ts">
useSeoMeta(useTdkMap('meaning'));

const cur = ref(0.1);
const pie = ref(useData('pie', cur.value));

const update = (num: number) => {
  cur.value = num;
  pie.value = useData('pie', cur.value);
};

const descStr =
  '决策树算法的可解释性较好，主要是因为其生成的模型可以被直观地解释和理解。决策树通过数据特征来对每一个样本进行划分，生成一棵树形结构。这个树形结构可以被视为一系列简单的判断规则，可以帮助人们理解模型是如何做出决策的。\n相比之下，其他传统机器学习算法生成的模型通常更复杂，难以被直观地解释和理解，即便使用sklearn分析在分类过程中发挥关键作用的特征，这些信息也不具有生物学意义上的可解释性。例如，SVM生成的模型是一个超平面，随机森林生成的模型是一组决策树的集合，KNN算法的模型本质上是一组训练数据集中的实例点，而不是一个明确的模型或规则。神将网络算法相比传统机器学习算法更加黑盒，可解释性也较差。\n基于以上原因，本文使用可视化方式分析决策树算法获得的关键特征';
const meaning = useData('meaning', cur.value);
</script>

<style scoped></style>
