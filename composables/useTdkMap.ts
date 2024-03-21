interface Tdk {
  title: string;
  description: string;
  keywords: string;
}
const tdkMap = new Map<string, Tdk>([
  [
    'index',
    {
      title: '机器学习',
      description: '机器学习评测指标,不同模型的表现,对比',
      keywords: '机器学习,评测指标,不同模型的表现,对比',
    },
  ],
  [
    'meaning',
    {
      title: '生物学意义',
      description: '机器学习模型在生物信息的关键特征,具体意义',
      keywords: '机器学习模型在生物信息的关键特征,具体意义',
    },
  ],
]);

export function useTdkMap(page: string) {
  return tdkMap.get(page) || { title: 'sdu', description: 'sdu', keywords: 'sdu,gene' };
}
