'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function MixinPage() {
  const gossips = [
    {
      title: '大禹三过家门而不入的真相',
      truth: '🟡 真伪存疑',
      confidence: 45,
      sources: ['《竹书纪年》', '野史杂记', '民间传说'],
      desc: '正史记载大禹治水公而忘私，但野史称其在台桑遇到涂山氏，生了启。所谓"三过家门"，实则是在外有情人，不敢回家。舜帝后来也因此事对大禹产生不满。',
      explosion: '启的出生时间正好在大禹治水期间，说明并非没有回家！'
    },
    {
      title: '范蠡与西施的最终结局',
      truth: '🟢 大概率真',
      confidence: 75,
      sources: ['《越绝书》', '《吴越春秋》', '史记拾遗'],
      desc: '正史记载西施被沉江，但诸多史料证明范蠡带西施泛舟五湖，定居陶地，改名陶朱公，成为一代商圣。西施终得善终。',
      explosion: '山东定陶确有范蠡墓，当地世代供奉西施娘娘庙'
    },
    {
      title: '秦始皇私生子之谜',
      truth: '🔴 大概率假',
      confidence: 80,
      sources: ['《史记·吕不韦列传》', '汉代抹黑宣传'],
      desc: '史记记载秦始皇是吕不韦之子，但从时间推算漏洞百出。子楚在位三年，嬴政十三岁继位，如果是早产儿，不可能健康成长且精力过人。这是汉代为了抹黑秦朝合法性的政治宣传。',
      explosion: '秦昭王不可能让血统不明的王孙继承王位！'
    },
    {
      title: '玄武门之变的真相',
      truth: '🟢 正史掩盖',
      confidence: 90,
      sources: ['《旧唐书》', '《新唐书》', '敦煌残卷'],
      desc: '李世民不仅是自卫，而是蓄谋已久。李建成并非史书记载那般昏庸无能，而是一位合格的储君。李世民亲手射杀大哥，尉迟恭杀四弟，然后软禁父皇，开创了盛世的血色开端。',
      explosion: '李世民篡改史书第一人，开创了帝王干预修史的恶例'
    },
    {
      title: '杨贵妃真的死在马嵬坡吗？',
      truth: '🟡 真伪存疑',
      confidence: 55,
      sources: ['《旧唐书》', '《新唐书》', '日本传说'],
      desc: '正史记载杨贵妃被缢死，但诸多疑点：尸体失踪，香囊犹在。日本山口县有杨贵妃墓，称其逃到日本，终老于此。鉴真东渡时，是否带了一位特殊的乘客？',
      explosion: '日本山口县百万人自称是杨贵妃后裔！'
    },
    {
      title: '建文帝下落之谜',
      truth: '🟢 没有自焚',
      confidence: 85,
      sources: ['《明实录》', '《明史稿》', '胡濙密奏'],
      desc: '建文帝没有自焚，而是从地道逃出，隐居西南。朱棣派胡濙暗访二十余年，终在永乐二十一年夜得到确切消息。二人深夜密谈至四更，朱棣从此放下心结。',
      explosion: '胡濙回来时朱棣已经就寝，破例连夜召见，肯定不是死讯'
    }
  ]

  const getTruthStyle = (truth: string) => {
    if (truth.includes('真') || truth.includes('正')) return { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)' }
    if (truth.includes('假')) return { color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)' }
    return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
  }

  return (
    <SubPageTemplate
      title="秘闻轶事"
      subtitle="不为人知 · 宫闱秘事 · 野史杂谈 · 历史真相"
      icon="🎭"
      colorRgb="255, 170, 102"
    >
      <SubPageSection title="八卦总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '正史掩盖', count: '2件', color: '#4ade80', icon: '✅' },
              { label: '真伪存疑', count: '2件', color: '#fbbf24', icon: '❓' },
              { label: '以讹传讹', count: '1件', color: '#f87171', icon: '❌' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="野史档案库">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {gossips.map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -3 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    ...getTruthStyle(item.truth)
                  }}>
                    {item.truth}
                  </span>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#f59e0b',
                    marginTop: '0.75rem'
                  }}>
                    {item.title}
                  </h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>可信度</div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: getTruthStyle(item.truth).color
                  }}>
                    {item.confidence}%
                  </div>
                </div>
              </div>

              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                marginBottom: '1rem'
              }}>
                {item.desc}
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: '8px',
                  borderLeft: '3px solid #fb923c',
                  marginBottom: '1rem'
                }}
              >
                <span style={{ color: '#fb923c', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  💥 石破天惊：
                </span>
                <span style={{ color: 'rgba(251, 191, 36, 0.9)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                  {item.explosion}
                </span>
              </motion.div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  📚 史料来源：
                </span>
                {item.sources.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 170, 102, 0.1)',
                    color: 'rgba(255, 170, 102, 0.8)'
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="史官曰">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.35rem',
                color: '#f59e0b',
                fontStyle: 'italic',
                lineHeight: 2
              }}
            >
              孔子作春秋，乱臣贼子惧<br />
              然而春秋笔法，微言大义<br />
              真相往往隐藏在字里行间<br />
              尽信书则不如无书
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
