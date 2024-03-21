import report from './report.json';
function transformMatrix(matrix: number[][]): number[][] {
  const result: number[][] = [];

  // for (let i = 0; i < matrix.length; i++) {
  //   for (let j = 0; j < matrix[i].length; j++) {
  //     result.push([i, j, matrix[i][j]]);
  //   }
  // }
  const [[a, b], [c, d]] = matrix;
  result.push([0, 1, a], [1, 1, b], [0, 0, c], [1, 0, d]);
  // for (let i = 0; i < matrix.length; i++) {
  //   for (let j = matrix[i].length - 1; j >= 0; j--) {
  //     result.push([i, j, matrix[i][j]]);
  //   }
  // }
  return result;
}

type DataType = {
  matrix: { name: string; matrix: number[][] }[];
  bar: { yAxisData: string[]; series: { name: string; type: string; data: number[] }[] };
  info: { name: string; text: string }[];
  benchmark: { name: string; text: string; formula: string }[];
  standard: { name: string; text: string }[];
  meaning: { name: string; text: string; gene: string }[];
};

export function useData<T extends keyof DataType>(type: T): DataType[T] {
  const { data } = report;
  const nameArr = data.map((el) => el.name);
  if (type === 'bar') {
    const accuracy = { name: 'accuracy', type: 'bar', data: data.map((el) => el.accuracy) };
    const precision = { name: 'precision', type: 'bar', data: data.map((el) => el.precision) };
    const recall = { name: 'recall', type: 'bar', data: data.map((el) => el.recall) };
    const f1_score = { name: 'f1_score', type: 'bar', data: data.map((el) => el.f1_score) };
    const auc = { name: 'auc', type: 'bar', data: data.map((el) => el.auc) };
    return { yAxisData: nameArr, series: [accuracy, precision, recall, f1_score, auc] } as DataType[T];
  } else if (type === 'matrix') {
    const matrixArr = data.map((el) => ({ name: el.name, matrix: transformMatrix(el.matrix) }));
    return matrixArr as DataType[T];
  } else if (type === 'info') {
    return [
      {
        name: 'DecisionTreeClassifier',
        text: '决策树是一种基于树结构的分类模型，它通过对数据的分裂来构建一棵树，每个节点代表一个特征，每个分支代表一个特征值，最终的叶子节点代表一个类别。',
      },
      {
        name: `KNeighborsClassifier`,
        text: 'K 近邻算法是一种基于实例的学习方法，它通过计算待分类样本与训练集中所有样本的距离，选取距离最近的 K 个样本作为邻居，然后根据邻居的标签来预测待分类样本的标签。',
      },
      {
        name: `GaussianNB`,
        text: '高斯朴素贝叶斯算法是一种基于贝叶斯定理和特征独立假设的分类算法，它假设不同类别的特征值服从高斯分布',
      },
      {
        name: `MLPClassifier`,
        text: 'MLP 是一种基于神经网络的分类算法，它由多个神经元组成，每个神经元接收输入信号并产生输出信号，然后将输出信号传递给下一层神经元进行处理，最终输出分类结果。',
      },
      {
        name: `SVC`,
        text: 'SVM 是一种基于最大间隔分类的算法，它通过将不同类别的数据点分隔开来构建分类模型,在二维空间中，它可以使用超平面将不同类别的数据点分隔开来。在更高维的空间中，它可以使用超平面或超曲面将不同类别的数据点分隔开来。',
      },
      {
        name: `RandomForestClassifier`,
        text: '随机森林是一种基于决策树的集成学习算法，它通过随机选择特征和样本来构建多个决策树，并将它们组合成一个更加稳健的分类模型。',
      },
      {
        name: 'RNN',
        text: '决策树是一种基于树结构的分类模型，它通过对数据的分裂来构建一棵树，每个节点代表一个特征，每个分支代表一个特征值，最终的叶子节点代表一个类别。',
      },
      {
        name: 'CNN',
        text: '决策树是一种基于树结构的分类模型，它通过对数据的分裂来构建一棵树，每个节点代表一个特征，每个分支代表一个特征值，最终的叶子节点代表一个类别。',
      },
    ] as DataType[T];
  } else if (type === 'benchmark') {
    return [
      {
        name: `正确率或者准确率（Precision）`,
        text: '又称为查准率，表示在模型识别为正类的样本中，真正为正类的样本所占的比例。一般情况下，查准率越高，说明模型的效果越好。',
        formula: 'Precision = TP/(TP+FP)',
      },
      {
        name: `精确率`,
        text: '精确率是最常用的分类性能指标。可以用来表示模型的精度，即模型识别正确的个数/样本的总个数。一般情况下，模型的精度越高，说明模型的效果越好。',
        formula: 'Accuracy = (TP+TN)/(TP+FN+FP+TN)',
      },
      {
        name: `召回率（Recall）或Sensitivity（敏感指标，True Positive Rate，TPR）或查全率`,
        text: '又称为查全率，召回率表现出在实际正样本中，分类器能预测出多少。表示的是，模型正确识别出为正类的样本的数量占总的正类样本数量的比值。一般情况下，Recall越高，说明有更多的正类样本被模型预测正确，模型的效果越好。',
        formula: 'Recall = TP/(TP+FN)',
      },
      {
        name: `Fβ_Score`,
        text: '物理意义就是将正确率和召回率的一种加权平均，在合并的过程中，召回率的权重是正确率的β倍。',
        formula:
          '比较常用的是F1分数（F1 Score），是统计学中用来衡量二分类模型精确度的一种指标。F1_Score：数学定义为 F1分数（F1-Score），又称为平衡 F分数（Balanced Score），它被定义为正确率和召回率的调和平均数。',
      },
      {
        name: `ROC（Receiver Operating Characteristic）曲线`,
        text: '以真阳性率（True Positive Rate，TPR）为纵坐标，假阳性率（False Positive Rate，FPR）为横坐标，绘制了在不同分类阈值下的真阳性率和假阳性率之间的折衷关系',
        formula: '-',
      },
      {
        name: 'AUC（Area Under the Curve）',
        text: 'ROC曲线下的面积，表示模型在不同阈值下的性能',
        formula:
          '微积分法：绘制出ROC曲线后，用微积分思想得到曲线下面积。概率法：AUC的另一层含义是：一个正、负样本对，将正样本预测为正的概率比将负样本预测为正的概率大的可能性。总样本对数为ab个，将正样本预测为正的概率大于负样本预测为正的概率的对子记作1，累计求和记作c，那么AUC就是c/(ab)。',
      },
    ] as DataType[T];
  } else if (type === 'standard') {
    return [
      {
        name: 'TF / PN',
        text: 'TF(机器判断的对不对,T 对 F 不对) PN (机器判断是不是,P 是 N 不是)',
      },
      { name: 'True Positive(TP)', text: '真正类。样本的真实类别是正类，并且模型识别的结果也是正类。' },
      { name: 'True Negative(TN)', text: '真负类。样本的真实类别是负类，并且模型将其识别为负类。' },
      { name: 'False Positive(FP)', text: '假正类。样本的真实类别是负类，但是模型将其识别为正类' },
      { name: 'False Negative(FN)', text: '假负类。样本的真实类别是正类，但是模型将其识别为负类' },
      {
        name: '混淆矩阵',
        text: '混淆矩阵是对分类问题的预测结果的总结。使用计数值汇总正确和不正确预测的数量，并按每个类进行细分，这种对结果的分解克服了仅使用分类准确率所带来的局限性\n矩阵的行表示真实值，矩阵的列表示预测值',
      },
    ] as DataType[T];
  } else if (type === 'meaning') {
    return [
      {
        name: 'OG0000336',
        text: '含义是...',
        gene: '对应的基因组是a',
      },
      { name: 'OG0004904', text: '含义是...', gene: '对应的基因组是b' },
      { name: 'OG0031400', text: '含义是...', gene: '对应的基因组是c' },
      { name: 'OG0049486', text: '含义是...', gene: '对应的基因组d' },
    ] as DataType[T];
  }
  throw new Error();
}
