'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function ChaodaiPage() {
  const dynasties = [
    {
      name: '夏',
      era: '约前2070-前1600',
      years: 470,
      kings: 17,
      founder: '大禹',
      capital: '阳城',
      territory: '黄河中游',
      population: '约200万',
      destiny: 45,
      achievement: 70,
      feature: '治水定九州，世袭制开端',
      fall: '夏桀无道，成汤革命',
      majorEvent: '大禹治水、太康失国、少康中兴',
      color: '#78716c',
      icon: '🏔️'
    },
    {
      name: '商',
      era: '前1600-前1046',
      years: 554,
      kings: 31,
      founder: '成汤',
      capital: '殷',
      territory: '黄河中下游',
      population: '约400万',
      destiny: 55,
      achievement: 80,
      feature: '玄鸟生商，甲骨文、青铜器',
      fall: '纣王暴虐，武王伐纣',
      majorEvent: '景亳之命、盘庚迁殷、武丁中兴',
      color: '#a8a29e',
      icon: '🀄'
    },
    {
      name: '周',
      era: '前1046-前256',
      years: 790,
      kings: 36,
      founder: '姬发',
      capital: '镐京、洛邑',
      territory: '华夏全境',
      population: '约1500万',
      destiny: 95,
      achievement: 95,
      feature: '周礼治天下，八百年最长',
      fall: '礼崩乐坏，秦灭西周',
      majorEvent: '武王伐纣、周公制礼、春秋五霸、战国七雄',
      color: '#fbbf24',
      icon: '☯️'
    },
    {
      name: '秦',
      era: '前221-前207',
      years: 14,
      kings: 3,
      founder: '嬴政',
      capital: '咸阳',
      territory: '天下一统',
      population: '约2500万',
      destiny: 20,
      achievement: 100,
      feature: '千古一帝，郡县制大一统',
      fall: '严刑峻法，二世而亡',
      majorEvent: '灭六国、书同文、筑长城、陈胜吴广起义',
      color: '#1e293b',
      icon: '⚔️'
    },
    {
      name: '汉',
      era: '前202-220',
      years: 422,
      kings: 29,
      founder: '刘邦',
      capital: '长安、洛阳',
      territory: '609万平方公里',
      population: '约6500万',
      destiny: 90,
      achievement: 98,
      feature: '汉民族定名，虽远必诛',
      fall: '宦官外戚，黄巾起义',
      majorEvent: '文景之治、汉武盛世、昭宣中兴、光武中兴',
      color: '#ef4444',
      icon: '🇨🇳'
    },
    {
      name: '晋',
      era: '266-420',
      years: 154,
      kings: 15,
      founder: '司马炎',
      capital: '洛阳、建康',
      territory: '543万平方公里',
      population: '约3500万',
      destiny: 30,
      achievement: 40,
      feature: '三国归一统，门阀政治',
      fall: '八王之乱，五胡乱华',
      majorEvent: '太康之治、永嘉之乱、衣冠南渡',
      color: '#6b7280',
      icon: '🏛️'
    },
    {
      name: '隋',
      era: '581-618',
      years: 37,
      kings: 3,
      founder: '杨坚',
      capital: '大兴',
      territory: '467万平方公里',
      population: '约5000万',
      destiny: 35,
      achievement: 85,
      feature: '开皇之治，大运河',
      fall: '穷兵黩武，民变频发',
      majorEvent: '灭陈、开科举、修运河、三征高句丽',
      color: '#475569',
      icon: '🚣'
    },
    {
      name: '唐',
      era: '618-907',
      years: 289,
      kings: 21,
      founder: '李渊',
      capital: '长安',
      territory: '1237万平方公里',
      population: '约8000万',
      destiny: 85,
      achievement: 100,
      feature: '盛唐气象，万国来朝',
      fall: '安史之乱，藩镇割据',
      majorEvent: '贞观之治、永徽之治、开元盛世、安史之乱',
      color: '#f59e0b',
      icon: '🐉'
    },
    {
      name: '宋',
      era: '960-1279',
      years: 319,
      kings: 18,
      founder: '赵匡胤',
      capital: '开封、临安',
      territory: '280万平方公里',
      population: '约1.2亿',
      destiny: 60,
      achievement: 92,
      feature: '文化造极，商品经济',
      fall: '重文轻武，蒙元南侵',
      majorEvent: '陈桥兵变、澶渊之盟、王安石变法、崖山海战',
      color: '#3b82f6',
      icon: '🎋'
    },
    {
      name: '元',
      era: '1271-1368',
      years: 97,
      kings: 11,
      founder: '忽必烈',
      capital: '大都',
      territory: '1372万平方公里',
      population: '约9000万',
      destiny: 40,
      achievement: 65,
      feature: '世界帝国，行省制度',
      fall: '民族压迫，红巾起义',
      majorEvent: '崖山灭宋、四等人制、马可波罗来华',
      color: '#1e3a8a',
      icon: '🐴'
    },
    {
      name: '明',
      era: '1368-1644',
      years: 276,
      kings: 16,
      founder: '朱元璋',
      capital: '南京、北京',
      territory: '997万平方公里',
      population: '约2亿',
      destiny: 70,
      achievement: 88,
      feature: '天子守国门，君王死社稷',
      fall: '内忧外患，闯王进京',
      majorEvent: '洪武之治、永乐盛世、仁宣之治、土木堡之变',
      color: '#dc2626',
      icon: '☀️'
    },
    {
      name: '清',
      era: '1636-1912',
      years: 276,
      kings: 12,
      founder: '皇太极',
      capital: '北京',
      territory: '1316万平方公里',
      population: '约4.5亿',
      destiny: 55,
      achievement: 75,
      feature: '康乾盛世，版图奠定',
      fall: '闭关锁国，辛亥革命',
      majorEvent: '康乾盛世、鸦片战争、洋务运动、辛亥革命',
      color: '#fcd34d',
      icon: '🌊'
    }
  ]

  const eraDivision = [
    { name: '上古三代', dynasties: ['夏', '商', '周'], years: 1814, color: '#78716c', feature: '分封制，礼乐文明' },
    { name: '秦汉', dynasties: ['秦', '汉'], years: 436, color: '#ef4444', feature: '大一统，汉民族形成' },
    { name: '魏晋南北朝', dynasties: ['晋'], years: 361, color: '#6b7280', feature: '大分裂，民族融合' },
    { name: '隋唐', dynasties: ['隋', '唐'], years: 326, color: '#f59e0b', feature: '盛世顶峰，世界性帝国' },
    { name: '宋辽金元', dynasties: ['宋', '元'], years: 408, color: '#3b82f6', feature: '民族政权并立' },
    { name: '明清', dynasties: ['明', '清'], years: 552, color: '#dc2626', feature: '专制顶峰，近代前夜' }
  ]

  const historicalCycle = [
    { phase: '大乱之后', feature: '人口锐减，土地荒芜，人心思定', color: '#475569' },
    { phase: '休养生息', feature: '轻徭薄赋，无为而治，经济恢复', color: '#22c55e' },
    { phase: '盛世顶峰', feature: '户口滋盛，仓库盈积，武功赫赫', color: '#f59e0b' },
    { phase: '盛极而衰', feature: '土地兼并，吏治腐败，矛盾积累', color: '#f97316' },
    { phase: '内忧外患', feature: '农民起义，藩镇割据，边患频仍', color: '#ef4444' },
    { phase: '王朝灭亡', feature: '土崩瓦解，群雄逐鹿，胜者为王', color: '#7f1d1d' }
  ]

  const emperorsRanking = [
    { name: '秦始皇 嬴政', dynasty: '秦', score: 98, feat: '统一六国，建立帝制', color: '#1e293b' },
    { name: '汉武帝 刘彻', dynasty: '汉', score: 97, feat: '独尊儒术，开疆拓土', color: '#ef4444' },
    { name: '唐太宗 李世民', dynasty: '唐', score: 97, feat: '贞观之治，天可汗', color: '#f59e0b' },
    { name: '隋文帝 杨坚', dynasty: '隋', score: 92, feat: '统一分裂，开科举制', color: '#475569' },
    { name: '宋太祖 赵匡胤', dynasty: '宋', score: 88, feat: '终结五代，文人政治', color: '#3b82f6' },
    { name: '明太祖 朱元璋', dynasty: '明', score: 88, feat: '驱逐鞑虏，恢复中华', color: '#dc2626' },
    { name: '汉武帝 刘邦', dynasty: '汉', score: 85, feat: '布衣天子，汉家基业', color: '#ef4444' },
    { name: '康熙 玄烨', dynasty: '清', score: 85, feat: '平定三藩，统一台湾', color: '#fcd34d' }
  ]

  function getDestinyColor(years: number) {
    if (years >= 300) return { color: '#22c55e', label: '长命王朝' }
    if (years >= 200) return { color: '#06b6d4', label: '稳定王朝' }
    if (years >= 100) return { color: '#f59e0b', label: '中等王朝' }
    return { color: '#ef4444', label: '短命王朝' }
  }

  return (
    <SubPageTemplate
      title="王朝更迭"
      subtitle="三皇五帝 · 夏商周秦 · 汉唐宋明 · 天命轮回"
      icon="👑"
      colorRgb="250, 204, 21"
    >
      <SubPageSection title="中华国运总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '主要王朝', count: '12', color: '#facc15', icon: '👑', desc: '夏商周到元明清' },
              { label: '总计历时', count: '约4000', unit: '年', color: '#ef4444', icon: '⏳', desc: '从夏朝到辛亥革命' },
              { label: '历代帝王', count: '197', color: '#a855f7', icon: '🏛️', desc: '正史记载正统帝王' },
              { label: '治乱循环', count: '6', color: '#06b6d4', icon: '🔄', desc: '六次大统一周期' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={i === 1 ? {
                    scale: [1, 1.05, 1],
                    boxShadow: ['none', `0 0 30px ${stat.color}`, 'none']
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)`,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.color }}>
                  {stat.count}{stat.unit || ''}
                </div>
                <div style={{ fontSize: '1rem', color: '#b89438', margin: '0.25rem 0' }}>{stat.label}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.8rem' }}>{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="王朝分期总览">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          {eraDivision.map((era, index) => (
            <motion.div
              key={era.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                borderLeft: `4px solid ${era.color}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: era.color, fontSize: '1.1rem' }}>{era.name}</h3>
                <span style={{
                  padding: '0.15rem 0.6rem',
                  borderRadius: '12px',
                  background: era.color + '20',
                  color: era.color,
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {era.years}年
                </span>
              </div>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(180, 180, 190, 0.7)',
                marginBottom: '0.75rem'
              }}>
                {era.feature}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {era.dynasties.map(d => (
                  <span key={d} style={{
                    padding: '0.1rem 0.5rem',
                    borderRadius: '6px',
                    background: era.color + '15',
                    color: era.color,
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="十二王朝气运详解">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem'
        }}>
          {dynasties.map((dynasty, index) => (
            <motion.div
              key={dynasty.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                border: `2px solid ${dynasty.color}40`,
                borderTop: `3px solid ${dynasty.color}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <motion.div
                    animate={dynasty.achievement >= 95 ? {
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${dynasty.color}, ${dynasty.color}66)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}
                  >
                    {dynasty.icon}
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: dynasty.color
                    }}>
                      {dynasty.name}
                    </h3>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.05rem 0.4rem',
                      borderRadius: '10px',
                      background: getDestinyColor(dynasty.years).color + '25',
                      color: getDestinyColor(dynasty.years).color
                    }}>
                      {getDestinyColor(dynasty.years).label}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: dynasty.achievement >= 90 ? '#fbbf24' : dynasty.achievement >= 80 ? '#a855f7' : '#6b7280'
                  }}>
                    {dynasty.achievement}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    功绩值
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '0.7rem',
                color: dynasty.color + '90',
                marginBottom: '0.5rem',
                textAlign: 'center',
                padding: '0.3rem',
                background: dynasty.color + '10',
                borderRadius: '4px'
              }}>
                📅 {dynasty.era} · {dynasty.years}年 · {dynasty.kings}帝
              </div>

              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.8)',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                「{dynasty.feature}」
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.68rem' }}>
                <div>
                  <span style={{ color: 'rgba(250, 204, 21, 0.6)' }}>👤</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.2rem' }}>{dynasty.founder}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(239, 68, 68, 0.6)' }}>🏛️</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.2rem' }}>{dynasty.capital}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(34, 197, 94, 0.6)' }}>👥</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.2rem' }}>{dynasty.population}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(6, 182, 212, 0.6)' }}>🗺️</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.2rem' }}>{dynasty.territory}</span>
                </div>
              </div>

              <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.6rem' }}>
                    <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>国运</span>
                    <span style={{ color: '#22c55e' }}>{dynasty.destiny}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(180, 180, 190, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dynasty.destiny}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                      style={{ height: '100%', background: '#22c55e' }}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.6rem' }}>
                    <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>文治武功</span>
                    <span style={{ color: '#f59e0b' }}>{dynasty.achievement}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(180, 180, 190, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dynasty.achievement}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.4, duration: 0.8 }}
                      style={{ height: '100%', background: '#f59e0b' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                <div style={{ marginBottom: '0.4rem' }}>
                  <span style={{ color: 'rgba(239, 68, 68, 0.7)', fontSize: '0.65rem' }}>💀 覆灭：</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.65rem' }}>{dynasty.fall}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '0.65rem' }}>📜 大事件：</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.65rem' }}>{dynasty.majorEvent}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="历代帝王TOP8">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem'
          }}>
            {emperorsRanking.map((emperor, index) => (
              <motion.div
                key={emperor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${emperor.color}15, transparent)`,
                  border: `1px solid ${emperor.color}30`,
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: index < 3 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  boxShadow: `0 2px 10px ${index < 3 ? '#fbbf24' : '#6b7280'}50`
                }}>
                  {index + 1}
                </div>
                <h4 style={{ color: emperor.color, marginBottom: '0.3rem', fontSize: '0.95rem' }}>
                  {emperor.name}
                </h4>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                  marginBottom: '0.5rem'
                }}>
                  {emperor.dynasty}朝
                </div>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.8)',
                  marginBottom: '0.5rem'
                }}>
                  {emperor.feat}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: emperor.score >= 95 ? '#fbbf24' : emperor.score >= 90 ? '#a855f7' : '#06b6d4'
                  }}>
                    {emperor.score}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', marginLeft: '0.25rem' }}>
                    分
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="历史周期律">
        <InfoCard>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #facc15, #f59e0b, #ef4444, transparent)',
              opacity: 0.3
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              {historicalCycle.map((cycle, index) => (
                <motion.div
                  key={cycle.phase}
                  initial={{ opacity: 0, y: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  style={{
                    padding: '1rem 0.75rem',
                    borderRadius: '12px',
                    background: `linear-gradient(180deg, ${cycle.color}20, transparent)`,
                    borderTop: `3px solid ${cycle.color}`,
                    textAlign: 'center'
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${cycle.color}, ${cycle.color}66)`,
                      margin: '0 auto 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <h4 style={{ color: cycle.color, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    {cycle.phase}
                  </h4>
                  <p style={{
                    fontSize: '0.7rem',
                    color: 'rgba(180, 180, 190, 0.7)',
                    lineHeight: 1.6
                  }}>
                    {cycle.feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="廿五史通鉴">
        <div className="xian-submodule-card" style={{
          background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08), transparent)',
          border: '1px solid rgba(250, 204, 21, 0.25)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.15rem',
              color: 'rgba(180, 180, 190, 0.85)',
              lineHeight: 2.2,
              fontStyle: 'italic'
            }}
          >
            「夏曰岁，商曰祀，周曰年，唐虞曰载。<br/>
            古今多少事，都付笑谈中。<br/>
            是非成败转头空，青山依旧在，几度夕阳红。」
          </motion.p>
          <div style={{ marginTop: '1.5rem', color: '#facc15', fontSize: '0.9rem' }}>
            —— 廿五史 · 司马光
          </div>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
