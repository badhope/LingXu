'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'
import ProphecyTimeline from '@/components/effects/ProphecyTimeline'

interface ProphecyBook {
  id: number
  name: string
  author: string
  era: string
  fulfillment: number
  status: string
  totalPredictions: number
  fulfilled: number
  famous: string[]
  shortName: string
  desc: string
  detail: string
  structure: string[]
  keyPredictions: string[]
  mysteries: string[]
  interpretations: string[]
  color: string
  icon: string
}

interface Prediction {
  id: number
  bookId: number
  bookName: string
  imageNumber: number
  title: string
  content: string
  event: string
  year: string
  fulfilled: boolean
  confidence: number
  detail: string
  evidence: string[]
  color: string
}

const PROPHECY_BOOKS: ProphecyBook[] = [
  {
    id: 1,
    name: '推背图',
    shortName: 'TBT',
    author: '李淳风、袁天罡',
    era: '唐朝贞观年间',
    fulfillment: 98,
    status: '已应验',
    totalPredictions: 60,
    fulfilled: 59,
    famous: ['武则天称帝', '安史之乱', '太平天国', '抗日战争'],
    desc: '中华预言第一奇书，共六十图像，以卦分系之。推算出大唐以后中国两千多年的国运盛衰。',
    detail: '唐太宗李世民为推算大唐国运，下令李淳风和袁天罡编写。李淳风用周易八卦进行推算，没想到一算起来就上了瘾，一发不可收拾，直到袁天罡推他的背，说道："天机不可再泄，还是回去休息吧"，因此这本预言奇书得名《推背图》。',
    structure: ['60幅图像', '每像一卦', '谶曰四句', '颂曰四句', '金圣叹批注'],
    keyPredictions: ['第3像：武则天称帝', '第5像：安史之乱杨贵妃缢死马嵬坡', '第9像：黄巢起义', '第33像：满清入关', '第39像：抗日战争日本投降'],
    mysteries: ['第43像：君非君臣非臣', '第44像：日月丽天群阴慑服', '第45像：金乌隐匿白洋中', '第47像：无王无帝定乾坤'],
    interpretations: ['金圣叹原版批注', '民国版本批注', '近现代学者解读', '民间各种推测'],
    color: '#ef4444',
    icon: '📜'
  },
  {
    id: 2,
    name: '烧饼歌',
    shortName: 'SBG',
    author: '刘伯温',
    era: '明朝洪武年间',
    fulfillment: 95,
    status: '已应验',
    totalPredictions: 40,
    fulfilled: 38,
    famous: ['土木堡之变', '魏忠贤乱政', '满清入关', '辛亥革命'],
    desc: '明太祖朱元璋在内殿吃烧饼，刚咬一口，刘伯温入见。帝问之，刘一语成谶，后世一一应验。',
    detail: '公元1368年某一日的早上，明太祖朱元璋在内殿里吃烧饼，只咬了一口，便听到内监会报刘伯温觐见。太祖心想测试刘伯温一下，于是便以碗盖着只咬了一口的烧饼，再召刘伯温入殿晋见。',
    structure: ['君臣对话体', '一问一答', '诗文形式', '隐喻晦涩'],
    keyPredictions: ['土木堡之变英宗被俘', '魏忠贤阉党乱政', '李自成起义', '吴三桂引清兵入关', '满清二百余年国运'],
    mysteries: ['八千女鬼乱朝纲', '桂花开放好英雄', '黄牛山下有一洞', '四大八方有文星'],
    interpretations: ['明代官方记载', '清代民间传抄', '民国版本增补', '现代历史验证'],
    color: '#f97316',
    icon: '🥞'
  },
  {
    id: 3,
    name: '梅花诗',
    shortName: 'MHS',
    author: '邵雍',
    era: '北宋熙宁年间',
    fulfillment: 92,
    status: '已应验',
    totalPredictions: 10,
    fulfilled: 9,
    famous: ['靖康之耻', '南宋偏安', '朱元璋建国', '文革浩劫'],
    desc: '十首梅花诗预言了从宋到今日的中国历史演变，每一首对应一个朝代。',
    detail: '邵康节先生的梅花诗共十首，每一首预言一个朝代，从宋开始，一直到未来。每首诗都是七言绝句，以梅花为喻，故名梅花诗。邵雍是北宋著名理学家、数学家、道士、诗人。',
    structure: ['十首七言绝句', '每首对应一朝', '以物喻史', '意境深远'],
    keyPredictions: ['第一首：北宋靖康之耻', '第二首：南宋偏安杭州', '第三首：元朝百年统治', '第四首：朱元璋明朝', '第七首：大清灭亡'],
    mysteries: ['第八首：日月当头', '第九首：寰中自有真龙出', '第十首：数点梅花天地春'],
    interpretations: ['皇极经世体系', '周易象数推演', '历代史家验证', '现代学者研究'],
    color: '#eab308',
    icon: '🌸'
  },
  {
    id: 4,
    name: '金陵塔碑文',
    shortName: 'JLT',
    author: '刘伯温',
    era: '明朝建塔',
    fulfillment: 88,
    status: '已应验',
    totalPredictions: 30,
    fulfilled: 26,
    famous: ['日本侵华', '国共内战', '文化大革命', '改革开放'],
    desc: '民国十六年拆除金陵塔时发现，预言了二十世纪以后中国的重大变故。',
    detail: '金陵塔是刘伯温建的，位于南京。民国十六年（公元1927年），国民革命军入南京，士兵拆除金陵塔时，发现一石碑，上刻此碑文。全文共计一百二十字，字字应验。',
    structure: ['七言碑文', '拆字隐喻', '一气呵成', '直截了当'],
    keyPredictions: ['日本侵华战争', '国共内战', '新中国建立', '文化大革命', '改革开放'],
    mysteries: ['红人敬重高人', '日出东胡日落西', '六门闭锁无出入', '二四八，瘟疫死'],
    interpretations: ['民国出土轰动', '石碑原文记载', '亲历者见证', '逐句历史验证'],
    color: '#22c55e',
    icon: '🗼'
  },
  {
    id: 5,
    name: '武侯百年乩',
    shortName: 'WHB',
    author: '诸葛亮',
    era: '三国时期',
    fulfillment: 85,
    status: '进行中',
    totalPredictions: 50,
    fulfilled: 42,
    famous: ['甲午战争', '民国建立', '日军投降', '待：天下大同'],
    desc: '诸葛亮在军中所作乩文，预言了此后百年间的天下大势，最后的预言正在进行中。',
    detail: '此乩文是诸葛亮降乩所作，预言了从清末开始的百年间中国及世界的变化。全文字字珠玑，预言精准。从甲午战争到民国建立，从日军侵华到新中国，历历在目。',
    structure: ['七言长诗', '逐年应验', '逻辑清晰', '时间明确'],
    keyPredictions: ['甲午中日战争', '八国联军侵华', '清朝灭亡民国建立', '八年抗战胜利', '新中国成立'],
    mysteries: ['世界大同终实现', '四亿人民为一家', '蓬瀛小岛除尘尽', '此后平川不可当'],
    interpretations: ['香港术士传承', '民国报刊记载', '逐年应验记录', '当代发展印证'],
    color: '#3b82f6',
    icon: '⚔️'
  },
  {
    id: 6,
    name: '马前课',
    shortName: 'MQK',
    author: '诸葛亮',
    era: '三国时期',
    fulfillment: 82,
    status: '进行中',
    totalPredictions: 14,
    fulfilled: 11,
    famous: ['魏灭蜀', '司马篡魏', '隋统一', '待：拯患救难，圣人出现'],
    desc: '诸葛亮于军中闲暇时所写，共十四课，每一课预言一个朝代，从三国直至未来。',
    detail: '《马前课》是诸葛亮所作的一部预言书，共十四课，每一课预言一个历史时期，从三国开始，直到未来大同世界。马前课的意思是每次出兵前，在马前占卜一课，故名。',
    structure: ['十四课', '每课四句', '每课对应一朝', '极简极精'],
    keyPredictions: ['第一课：魏灭蜀', '第二课：司马篡魏', '第三课：五胡乱华', '第五课：杨坚隋朝统一', '第十课：满清入关'],
    mysteries: ['第十一课：四门乍辟突如其来', '第十二课：拯患救难是唯圣人', '第十三课：贤不遗野天下一家', '第十四课：占得此课易数乃终'],
    interpretations: ['历代官方正史', '诸葛亮文集', '宋明理学解读', '近现代事件印证'],
    color: '#a855f7',
    icon: '🐴'
  },
  {
    id: 7,
    name: '黄蘖禅师诗',
    shortName: 'HCS',
    author: '黄蘖禅师',
    era: '唐朝中期',
    fulfillment: 78,
    status: '进行中',
    totalPredictions: 16,
    fulfilled: 12,
    famous: ['满清入关', '太平天国', '光绪', '待：日月落时江海闭'],
    desc: '唐朝高僧黄蘖禅师所作十四首七言诗，预言了唐至近代的国运兴衰。',
    detail: '黄蘖禅师是唐代著名高僧，与裴休相国相善。裴休记录黄蘖禅师的预言诗，共十四首，预言从唐朝到未来的天下大事。每首诗七言八句，隐晦深奥。',
    structure: ['十四首七言律诗', '每首对应一运', '僧人作偈', '禅意浓厚'],
    keyPredictions: ['唐朝灭亡', '五代十国', '宋元明清', '满清入关', '太平天国'],
    mysteries: ['日月落时江海闭', '云原生相遇风云', '福无双至祸不单行', '中兴事业付麟儿'],
    interpretations: ['裴休相国笔记', '禅门历代传承', '宋明高僧批注', '清代文人考证'],
    color: '#ec4899',
    icon: '🛕'
  },
  {
    id: 8,
    name: '藏头诗',
    shortName: 'CTS',
    author: '李淳风',
    era: '唐朝贞观年间',
    fulfillment: 80,
    status: '已应验',
    totalPredictions: 20,
    fulfilled: 17,
    famous: ['武则天', '安禄山', '黄巢', '崖山之后'],
    desc: '唐太宗与李淳风君臣问答，预言后世兴衰治乱，以藏头诗形式暗藏玄机。',
    detail: '唐太宗问李淳风后世，淳风一一作答，君臣问答，字字珠玑。问答中暗藏玄机，许多谜底藏于诗中，故名藏头诗。从武后乱唐一直预言到后世。',
    structure: ['君臣问答', '逐朝预言', '诗中藏谜', '史实验证'],
    keyPredictions: ['武则天称帝', '安禄山造反', '黄巢起义', '朱温灭唐', '崖山海战宋朝灭亡'],
    mysteries: ['二九一男指太平', '四十年来治国兵', '龙蛇相斗三十年', '一日月照四天下'],
    interpretations: ['旧唐书载', '太平广记收录', '历代史家考证', '预言与史实对照'],
    color: '#06b6d4',
    icon: '🎭'
  }
]

const KEY_PREDICTIONS: Prediction[] = [
  {
    id: 1,
    bookId: 1,
    bookName: '推背图',
    imageNumber: 3,
    title: '武后称帝',
    content: '日月当空，照临下土，扑朔迷离，不文亦武',
    event: '武则天称帝，改唐为周',
    year: '公元690年',
    fulfilled: true,
    confidence: 100,
    detail: '预言武则天称帝。"日月当空"正是武则天给自己造的字"曌"，她自名武曌。扑朔迷离出自木兰诗，暗指女子称帝。',
    evidence: ['旧唐书则天皇后本纪', '资治通鉴记载', '历史事实完全吻合'],
    color: '#ef4444'
  },
  {
    id: 2,
    bookId: 1,
    bookName: '推背图',
    imageNumber: 5,
    title: '安史之乱',
    content: '杨花飞，蜀道难，截断竹萧方见日，更无一史乃平安',
    event: '安禄山造反，杨贵妃缢死马嵬坡',
    year: '公元755年',
    fulfilled: true,
    confidence: 100,
    detail: '预言安史之乱。"杨花飞"指杨贵妃，"蜀道难"指唐玄宗逃蜀。"截断竹萧"是肃宗，"无一史乃安"指史思明被杀后叛乱才平定。',
    evidence: ['新旧唐书安禄山传', '资治通鉴安史之乱', '马嵬坡之变正史记载'],
    color: '#ef4444'
  },
  {
    id: 3,
    bookId: 1,
    bookName: '推背图',
    imageNumber: 39,
    title: '抗战胜利',
    content: '鸟无足，山有月，旭初升，人都哭。十二月中气不和，南山有雀北山罗，一朝听得金鸡叫，大海沉沉日已过',
    event: '日本侵华战争，日本战败投降',
    year: '公元1945年',
    fulfilled: true,
    confidence: 100,
    detail: '预言日本侵华及战败。"鸟无足山有月"是岛字，"旭初升"指日本。"十二月中"指七七卢沟桥事变。"金鸡叫"指1945年乙酉鸡年日本投降。',
    evidence: ['八年抗日战争史实', '1945年日本投降', '金圣叹早在清初就如此批注'],
    color: '#ef4444'
  },
  {
    id: 4,
    bookId: 2,
    bookName: '烧饼歌',
    imageNumber: 8,
    title: '阉党乱政',
    content: '八千女鬼乱朝纲',
    event: '魏忠贤阉党乱政',
    year: '公元1620-1627年',
    fulfilled: true,
    confidence: 98,
    detail: '"八千女鬼"四个字合起来就是"魏"字，预言魏忠贤专权乱政。',
    evidence: ['明史魏忠贤传', '明朝宦官专权史实', '崇祯帝清算阉党'],
    color: '#f97316'
  },
  {
    id: 5,
    bookId: 3,
    bookName: '梅花诗',
    imageNumber: 1,
    title: '靖康之耻',
    content: '荡荡天门万古开，几人归去几人来。山河虽好非完璧，不信黄金是祸胎',
    event: '靖康之变，徽钦二帝被俘',
    year: '公元1127年',
    fulfilled: true,
    confidence: 100,
    detail: '预言北宋靖康之耻。"黄金"指女真族建立的金国，金国入侵造成了山河破碎，"非完璧"指半壁江山。',
    evidence: ['宋史徽宗本纪', '三朝北盟会编', '靖康稗史记录'],
    color: '#eab308'
  },
  {
    id: 6,
    bookId: 6,
    bookName: '马前课',
    imageNumber: 4,
    title: '大唐盛世',
    content: '十八男儿，起于太原。动则得解，日月丽天',
    event: '李渊太原起兵，建立唐朝',
    year: '公元618年',
    fulfilled: true,
    confidence: 100,
    detail: '"十八男儿"是李字，预言李渊从太原起兵建立唐朝。"日月丽天"指唐朝的贞观之治、开元盛世。',
    evidence: ['旧唐书记载', '李渊建唐史实', '大唐盛世确证'],
    color: '#a855f7'
  }
]

export default function YucePage() {
  const [filteredBooks, setFilteredBooks] = useState(PROPHECY_BOOKS)
  const [expandedBook, setExpandedBook] = useState<number | null>(null)
  const [filteredPredictions, setFilteredPredictions] = useState(KEY_PREDICTIONS)
  const [expandedPrediction, setExpandedPrediction] = useState<number | null>(null)

  const handleBookFilter = useCallback((data: typeof PROPHECY_BOOKS) => {
    setFilteredBooks(data)
  }, [])

  const handlePredictionFilter = useCallback((data: typeof KEY_PREDICTIONS) => {
    setFilteredPredictions(data)
  }, [])

  const bookFilters = {
    searchKeys: ['name', 'author', 'era', 'desc', 'detail', 'famous', 'keyPredictions'],
    filterKeys: {
      era: [...new Set(PROPHECY_BOOKS.map(b => b.era.split('朝')[0] + '朝'))],
      status: [...new Set(PROPHECY_BOOKS.map(b => b.status))],
    },
    sortOptions: [
      { key: 'fulfillment', label: '应验率' },
      { key: 'id', label: '成书年代' },
      { key: 'name', label: '书籍名称' },
    ],
  }

  const predictionFilters = {
    searchKeys: ['title', 'content', 'event', 'year', 'detail', 'bookName'],
    filterKeys: {
      bookName: [...new Set(KEY_PREDICTIONS.map(p => p.bookName))],
      fulfilled: ['已应验', '待验证'],
    },
    sortOptions: [
      { key: 'confidence', label: '可信度' },
      { key: 'id', label: '时间顺序' },
    ],
  }

  return (
    <SubPageTemplate
      title="预言奇书"
      subtitle="推背图说 · 烧饼歌诀 · 千年国运 · 一一应验"
      icon="🔮"
      colorRgb="239, 68, 68"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '3rem',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(8, 8, 20, 0.98) 100%)',
        }}
      >
        <h3 style={{
          fontSize: '1.5rem',
          color: '#a855f7',
          fontFamily: '"Noto Serif SC", serif',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          🔮 古今预言时间轴
        </h3>
        <ProphecyTimeline />
      </motion.div>

      <SubPageSection title="预言应验总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '预言奇书', value: '8部', icon: '📚', color: '#ef4444' },
              { label: '预言总数', value: '230+', icon: '📜', color: '#f97316' },
              { label: '已应验', value: '90%+', icon: '✅', color: '#22c55e' },
              { label: '时间跨度', value: '2000年', icon: '⏳', color: '#3b82f6' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: stat.color,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: `0 0 25px ${stat.color}66`
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="八大奇书">
        <FilterBar
          data={PROPHECY_BOOKS}
          onFiltered={handleBookFilter}
          options={bookFilters}
          placeholder="搜索书名、作者、预言、内容..."
        />

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredBooks.map((book, index) => (
              <motion.div key={book.id} layout>
                <InfoCard
                  title={`${book.name} (${book.shortName})`}
                  subtitle={`${book.era} · ${book.author}`}
                  glowColor={book.color.replace('#', '')}
                  onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${book.color}, ${book.color}88)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      flexShrink: 0,
                      boxShadow: `0 0 25px ${book.color}44`
                    }}>
                      {book.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', color: book.color, fontWeight: 'bold' }}>应验率</span>
                            <span style={{ fontSize: '0.75rem', color: book.color, fontWeight: 'bold' }}>{book.fulfillment}%</span>
                          </div>
                          <ProgressBar value={book.fulfillment / 100} color={book.color} height={6} />
                        </div>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: book.status === '已应验' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                          color: book.status === '已应验' ? '#22c55e' : '#eab308'
                        }}>
                          {book.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                        <span>共{book.totalPredictions}象</span>
                        <span>已应验{book.fulfilled}象</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.85)', marginTop: '0.5rem', marginBottom: 0 }}>
                        {book.desc}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedBook === book.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                          <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.85)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            {book.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', color: book.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>🎯 著名预言</div>
                              {book.famous.map((f, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {f}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: book.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>📖 体例结构</div>
                              {book.structure.map((s, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {s}</div>
                              ))}
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', color: book.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>❓ 未解之谜</div>
                              {book.mysteries.map((m, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {m}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: book.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>🔍 传世版本</div>
                              {book.interpretations.map((v, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {v}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="经典预言应验实例">
        <FilterBar
          data={KEY_PREDICTIONS}
          onFiltered={handlePredictionFilter}
          options={predictionFilters}
          placeholder="搜索预言内容、事件、年代..."
        />

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredPredictions.map((prediction) => (
              <motion.div key={prediction.id} layout>
                <InfoCard
                  title={`${prediction.bookName}第${prediction.imageNumber || ''}象: ${prediction.title}`}
                  subtitle={`${prediction.event} · ${prediction.year}`}
                  glowColor={prediction.color.replace('#', '')}
                  onClick={() => setExpandedPrediction(expandedPrediction === prediction.id ? null : prediction.id)}
                >
                  <div style={{
                    padding: '0.75rem',
                    background: `${prediction.color}11`,
                    borderRadius: '8px',
                    borderLeft: `3px solid ${prediction.color}`,
                    marginBottom: '0.75rem',
                    fontStyle: 'italic'
                  }}>
                    <p style={{ fontSize: '0.85rem', color: prediction.color, margin: 0, lineHeight: 1.6 }}>
                      "{prediction.content}"
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: prediction.color }}>可信度</span>
                        <ProgressBar value={prediction.confidence / 100} color={prediction.color} height={4} />
                        <span style={{ fontSize: '0.75rem', color: prediction.color, fontWeight: 'bold' }}>{prediction.confidence}%</span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: prediction.fulfilled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                      color: prediction.fulfilled ? '#22c55e' : '#eab308'
                    }}>
                      {prediction.fulfilled ? '已应验' : '待验证'}
                    </span>
                  </div>

                  <AnimatePresence>
                    {expandedPrediction === prediction.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.85)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                            {prediction.detail}
                          </p>
                          <div>
                            <div style={{ fontWeight: 'bold', color: prediction.color, marginBottom: '0.5rem', fontSize: '0.75rem' }}>📜 历史证据</div>
                            {prediction.evidence.map((e, i) => (
                              <div key={i} style={{ fontSize: '0.72rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {e}</div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
