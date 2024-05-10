import r1 from './report/report-0.1.json';
import r2 from './report/report-0.2.json';
import r3 from './report/report-0.3.json';
import r4 from './report/report-0.4.json';
import r5 from './report/report-0.5.json';
import r6 from './report/report-0.6.json';
import r7 from './report/report-0.7.json';
import r8 from './report/report-0.8.json';
import r9 from './report/report-0.9.json';
import importance from './impotance.json';
import totalOg from './total.json';

const reports = [r1, r2, r3, r4, r5, r6, r7, r8, r9];

// console.log(reports);
function transformMatrix(matrix: number[][]): number[][] {
  const result: number[][] = [];
  const [[a, b], [c, d]] = matrix;
  result.push([0, 1, a], [1, 1, b], [0, 0, c], [1, 0, d]);
  return result;
}

function unique2DArray(arr: any[][]): any[][] {
  const set = new Set(arr.map((item) => JSON.stringify(item) as string));
  return Array.from(set).map((item) => JSON.parse(item));
}

type DataType = {
  matrix: { name: string; matrix: number[][] }[];
  bar: { yAxisData: string[]; series: { name: string; type: string; data: number[] }[] };
  info: { name: string; text: string }[];
  benchmark: { name: string; text: string; formula: string }[];
  standard: { name: string; text: string }[];
  meaning: { name: string; text: string; gene: string }[];
  stackbar: {
    xAxisData: number[];
    series: {
      name: string;
      type: string;
      stack: string;
      barWidth: string;
      label: {
        show: boolean;
      };
      data: number[];
    }[];
  };
  pie: { name: string; value: number }[];
  lineData: {
    series: {
      name: string;
      type: string;
      color: string;
      data: number[];
    }[];
    xAxisData: string[];
  };
  dot: {
    multi: (string | number)[][];
    simple: (string | number)[][];
    ogs: string[];
  };
  totalLine: {
    total: number[];
  };
};

export function useData<T extends keyof DataType>(type: T, test_size: number): DataType[T] {
  const index = (Math.floor(test_size * 10) % 10) - 1; // 提取小数点后第一位数字

  const { data } = reports[index];
  const nameArr = data.map((el) => el.name);

  // 获取所有重要因素 og0 og1 og2...
  const getOgs = () => {
    const allReason = new Set<string>();
    const reasons = reports.map((el) => el.reason);
    reasons.forEach((e) => e.forEach((el) => el.score >= 0.05 && allReason.add(el.name)));
    return [...allReason].sort();
  };

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
        text: 'RNN（循环神经网络）是一种处理时间序列数据的深度学习模型。在分类问题中，RNN通过捕捉输入数据的时间依赖关系来实现高效分类。RNN在每个时间步接收输入向量，并根据前一时间步的隐藏状态计算输出向量。通过更新隐藏状态，RNN能够保留历史信息，从而在处理序列数据时表现出优越的性能。',
      },
      {
        name: 'CNN',
        text: 'CNN（卷积神经网络）是一种深度学习模型，适用于处理网格结构数据，如图像。在分类问题中，CNN通过卷积层提取局部特征，ReLU激活函数学习复杂特征，池化层降低空间尺寸，最后全连接层将特征映射到输出类别。',
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
        name: 'OG0000043 细胞色素P450家族',
        gene: ' 在生物体中，细胞色素P450酶参与多种代谢途径，这些途径可能在单细胞和多细胞真菌中存在差异。例如，多细胞真菌在发育和形态建成中可能需要特定的激素或信号分子，这些分子的合成或降解可能涉及P450酶。因此，这类酶的表达水平和活性可能影响真菌的生长形态和适应性',
      },
      {
        name: 'OG0000336 可能影响异戊烯和固醇途径的调节',
        gene: '固醇类分子在真菌细胞膜结构和信号传导中起重要作用，特别是在细胞间的相互作用和多细胞结构的维持中尤为关键。这可能解释了该基因家族在多细胞与单细胞真菌分类中的重要性',
      },
      {
        name: 'OG0000896 真菌特有的转录因子',
        gene: '在基因表达调控中，转录因子发挥着核心功能，独特的转录因子可能对真菌的生长和分化产生影响。在多细胞真菌中，这些转录因子可能参与调控形态发育和细胞间的通信，而在单细胞形态中，它们可能更侧重于响应环境压力或调节代谢平衡。',
      },
      {
        name: 'OG0001225 异柠檬酸酶',
        gene: '异柠檬酸酶参与次级代谢，这在真菌中通常与防御机制、竞争以及环境适应相关。在多细胞真菌中，这种酶可能更重要，因为多细胞结构需要额外的防御机制来保护其较为复杂的结构。相反，在单细胞真菌中，这类代谢途径可能更简化',
      },
      {
        name: 'OG0003369 α-L-阿拉伯糖苷酶活性',
        gene: ' 这类酶的活性在解构植物源性材料中特别重要，可能在多细胞真菌中更为显著，因为这些真菌可能依赖于更复杂的营养获取策略和外部环境的适应。而在单细胞真菌中，对这种酶的依赖可能相对较少。',
      },
      {
        name: 'OG0004956 几丁质合成酶',
        gene: '在多细胞真菌中，细胞壁的完整性对于维持组织结构和功能至关重要，而几丁质对于真菌细胞壁格外重要，因此几丁质合成酶发挥了关键作用。在单细胞真菌中，虽然几丁质同样重要，但其在生理和环境适应上的作用可能有所不同',
      },
      {
        name: 'OG0007128 乌头醇-细胞色素c还原酶复合体组成部分',
        gene: '这个基因家族在能量代谢过程中起着关键角色，并参与了线粒体的呼吸链。在多细胞真菌中，由于其组织复杂性和能量需求高，这一复合体的功能可能更为重要。单细胞真菌虽然同样需要能量代谢，但其能量和生理需求可能与多细胞形态有所不同',
      },
      {
        name: 'OG000165和OG0006989 没有注释信息',
        gene: '可能代表新的生物学功能，需要进一步通过蛋白质结构进行验证',
      },
    ] as DataType[T];
  } else if (type === 'stackbar') {
    // 第一步,横轴是 所有有占比的基因
    const allReasonArr = getOgs();
    // console.log(allReasonArr, '🔥');

    const allOgIndex = new Set<number>();
    const reasons = reports.map((el) => el.reason);
    reasons.forEach((e) => e.forEach((el) => el.score >= 0.05 && allOgIndex.add(el.index)));

    // 第二步,填上
    const series = allReasonArr.sort().map((og) => {
      // 对于每一个og,找到每一个测试集的含量,没有 这个测试集就是0
      const data = reasons.map((e) => {
        for (const { name, score } of e) {
          if (og === name) return score.toFixed(2);
        }
        return 0;
      });
      return {
        name: og,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
        },
        data,
      };
    });
    return {
      xAxisData: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      series: series,
    } as DataType[T];
  } else if (type === 'pie') {
    return reports[index].reason.map((e) => ({ name: e.name, value: e.score })) as DataType[T];
  } else if (type === 'lineData') {
    const series: {
      name: string;
      type: string;
      color: string;
      data: number[];
    }[] = [];
    const ls = importance.labels;
    const os = importance.ogs;
    os.forEach((e, index) => {
      const label = ls[index];
      series.push({
        name: label === 0 ? '单细胞' : '多细胞',
        type: 'line',
        color: label === 0 ? 'rgba(128, 176, 249,0.5)' : 'rgba(161, 202, 112,0.5)',
        data: e,
      });
    });
    return { xAxisData: getOgs(), series } as DataType[T];
  } else if (type === 'dot') {
    const ogs = getOgs();
    const multi: (string | number)[][] = [];
    const simple: (string | number)[][] = [];
    const ls = importance.labels;
    const os = importance.ogs;

    ls.forEach((e, index) => {
      if (e === 0) {
        // 单细胞
        const arr = os[index];
        for (const og of ogs) {
          for (const value of arr) {
            simple.push([og, value]);
          }
        }
      } else {
        // 多细胞
        const arr = os[index];
        for (const og of ogs) {
          for (const value of arr) {
            multi.push([og, value]);
          }
        }
      }
    });
    // console.log(multi.length, unique2DArray(multi).length, '去重长度');
    return {
      multi: unique2DArray(multi),
      simple: unique2DArray(simple),
      ogs,
    } as DataType[T];
  } else if (type === 'totalLine') {
    return { total: totalOg.total } as DataType[T];
  }
  // 我想得到这些列的值
  throw new Error();
}
