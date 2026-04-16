'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const AUSPICIOUS_TIMES = [
  { name: '子时', range: '23:00-01:00', desc: '夜半，又名子夜、中夜，十二时辰的第一个时辰，阳气初生' },
  { name: '丑时', range: '01:00-03:00', desc: '鸡鸣，又名荒鸡，牛在这时候吃完草，准备耕田' },
  { name: '寅时', range: '03:00-05:00', desc: '平旦，又称黎明、早晨，虎在此时最猛，修行最佳' },
  { name: '卯时', range: '05:00-07:00', desc: '日出，又名日始、破晓，太阳刚露脸，冉冉初升' },
  { name: '辰时', range: '07:00-09:00', desc: '食时，又名早食，古人吃早饭的时间，群龙行雨' },
  { name: '巳时', range: '09:00-11:00', desc: '隅中，又名日禺，临近中午，蛇活跃于草丛中' },
  { name: '午时', range: '11:00-13:00', desc: '日中，又名日正、中午，太阳最烈，阳气鼎盛' },
  { name: '未时', range: '13:00-15:00', desc: '日昳，又名日跌、日央，太阳偏西，羊食草' },
  { name: '申时', range: '15:00-17:00', desc: '哺时，又名日铺、夕食，猴子在这时候啼叫最清亮' },
  { name: '酉时', range: '17:00-19:00', desc: '日入，又名日落、傍晚，鸡开始归巢，阳气渐藏' },
  { name: '戌时', range: '19:00-21:00', desc: '黄昏，又名日夕、日暮，天地昏黄，狗开始守夜' },
  { name: '亥时', range: '21:00-23:00', desc: '人定，又名定昏，夜色已深，人们安歇睡眠，猪熟睡' },
]

export default function XunshiPage() {
  return (
    <SubPageTemplate
      title="择吉寻时"
      subtitle="天时人事 · 日相催迫 · 选吉择时 · 事半功倍"
      icon="⏰"
      colorRgb="251, 191, 36"
    >
      <SubPageSection title="择时之道">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫天有四时，地有四方，人有四体。顺天应人，万事可成。故圣人之将有为也，必以吉日良辰，所以顺天地之心，合阴阳之序。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            时也，命也，运也。同一事也，行于吉时则顺，行于凶时则逆。善寻时者，如顺风扬帆，事半而功倍。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="十二时辰">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {AUSPICIOUS_TIMES.map((time, index) => (
            <motion.div
              key={time.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <h3 style={{ color: '#b89438', marginBottom: '0.5rem' }}>
                {time.name}
              </h3>
              <p style={{
                color: 'rgba(154, 123, 41, 0.5)',
                fontSize: '0.85rem',
                marginBottom: '0.75rem',
              }}>
                {time.range}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}>
                {time.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="择吉原则">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { title: '宜其事宜', desc: '婚嫁选六合日，动土选黄道时，各事宜各有宜忌' },
            { title: '避其冲煞', desc: '太岁莫犯，三煞宜避。凡大事必看与生肖是否相冲' },
            { title: '因人而异', desc: '甲之蜜糖，乙之砒霜。择吉需配合主人生辰八字' },
            { title: '心诚为上', desc: '外寻吉时，内修善心。心正则百邪不侵，福自归之' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: '#b89438', marginBottom: '0.75rem' }}>
                {item.title}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
