import ComingSoonTemplate from '@/components/layout/ComingSoonTemplate'

export default function WeiLaiPage() {
  return (
    <ComingSoonTemplate
      title="未来 sci-fi"
      subtitle="赛博修仙，机械飞升，星河证道，正在开发中..."
      icon="🚀"
      colorRgb="34, 211, 238"
      parentPath="/home"
      features={[
        '赛博朋克 - 义体金丹，神经功法',
        '星际文明 - 星河拓荒，仙帝联邦',
        '维度战争 - 高维入侵，时空乱流',
        '科技飞升 - AI悟道，量子修真',
      ]}
    />
  )
}
