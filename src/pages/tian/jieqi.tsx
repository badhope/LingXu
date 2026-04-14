/**
 * 灵墟 - 天部模块 - 二十四节气
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

const JIEQI_DATA = [
  {
    name: '立春',
    icon: '🌱',
    solar: '2月3-5日',
    lunar: '正月节',
    desc: '东风解冻，蛰虫始振，鱼陟负冰',
    hou: ['东风解冻', '蛰虫始振', '鱼陟负冰']
  },
  {
    name: '雨水',
    icon: '💧',
    solar: '2月18-20日',
    lunar: '正月中',
    desc: '獭祭鱼，鸿雁来，草木萌动',
    hou: ['獭祭鱼', '鸿雁来', '草木萌动']
  },
  {
    name: '惊蛰',
    icon: '⚡',
    solar: '3月5-7日',
    lunar: '二月节',
    desc: '桃始华，仓庚鸣，鹰化为鸠',
    hou: ['桃始华', '仓庚鸣', '鹰化为鸠']
  },
  {
    name: '春分',
    icon: '☀️',
    solar: '3月20-22日',
    lunar: '二月中',
    desc: '玄鸟至，雷乃发声，始电',
    hou: ['玄鸟至', '雷乃发声', '始电']
  },
  {
    name: '清明',
    icon: '🌿',
    solar: '4月4-6日',
    lunar: '三月节',
    desc: '桐始华，田鼠化为鴽，虹始见',
    hou: ['桐始华', '田鼠化为鴽', '虹始见']
  },
  {
    name: '谷雨',
    icon: '🌧️',
    solar: '4月19-21日',
    lunar: '三月中',
    desc: '萍始生，鸣鸠拂其羽，戴胜降于桑',
    hou: ['萍始生', '鸣鸠拂其羽', '戴胜降于桑']
  },
  {
    name: '立夏',
    icon: '🌻',
    solar: '5月5-7日',
    lunar: '四月节',
    desc: '蝼蝈鸣，蚯蚓出，王瓜生',
    hou: ['蝼蝈鸣', '蚯蚓出', '王瓜生']
  },
  {
    name: '小满',
    icon: '🌾',
    solar: '5月20-22日',
    lunar: '四月中',
    desc: '苦菜秀，靡草死，麦秋至',
    hou: ['苦菜秀', '靡草死', '麦秋至']
  },
  {
    name: '芒种',
    icon: '🌾',
    solar: '6月5-7日',
    lunar: '五月节',
    desc: '螳螂生，鵙始鸣，反舌无声',
    hou: ['螳螂生', '鵙始鸣', '反舌无声']
  },
  {
    name: '夏至',
    icon: '🌞',
    solar: '6月21-22日',
    lunar: '五月中',
    desc: '鹿角解，蝉始鸣，半夏生',
    hou: ['鹿角解', '蝉始鸣', '半夏生']
  },
  {
    name: '小暑',
    icon: '🔥',
    solar: '7月6-8日',
    lunar: '六月节',
    desc: '温风至，蟋蟀居宇，鹰始鸷',
    hou: ['温风至', '蟋蟀居宇', '鹰始鸷']
  },
  {
    name: '大暑',
    icon: '☀️',
    solar: '7月22-24日',
    lunar: '六月中',
    desc: '腐草为萤，土润溽暑，大雨时行',
    hou: ['腐草为萤', '土润溽暑', '大雨时行']
  },
  {
    name: '立秋',
    icon: '🍂',
    solar: '8月7-9日',
    lunar: '七月节',
    desc: '凉风至，白露降，寒蝉鸣',
    hou: ['凉风至', '白露降', '寒蝉鸣']
  },
  {
    name: '处暑',
    icon: '🍁',
    solar: '8月22-24日',
    lunar: '七月中',
    desc: '鹰乃祭鸟，天地始肃，禾乃登',
    hou: ['鹰乃祭鸟', '天地始肃', '禾乃登']
  },
  {
    name: '白露',
    icon: '💎',
    solar: '9月7-9日',
    lunar: '八月节',
    desc: '鸿雁来，玄鸟归，群鸟养羞',
    hou: ['鸿雁来', '玄鸟归', '群鸟养羞']
  },
  {
    name: '秋分',
    icon: '🌙',
    solar: '9月22-24日',
    lunar: '八月中',
    desc: '雷始收声，蛰虫坯户，水始涸',
    hou: ['雷始收声', '蛰虫坯户', '水始涸']
  },
  {
    name: '寒露',
    icon: '💧',
    solar: '10月8-9日',
    lunar: '九月节',
    desc: '鸿雁来宾，雀入大水为蛤，菊有黄华',
    hou: ['鸿雁来宾', '雀入大水为蛤', '菊有黄华']
  },
  {
    name: '霜降',
    icon: '❄️',
    solar: '10月23-24日',
    lunar: '九月中',
    desc: '豺乃祭兽，草木黄落，蛰虫咸俯',
    hou: ['豺乃祭兽', '草木黄落', '蛰虫咸俯']
  },
  {
    name: '立冬',
    icon: '⛄',
    solar: '11月7-8日',
    lunar: '十月节',
    desc: '水始冰，地始冻，雉入大水为蜃',
    hou: ['水始冰', '地始冻', '雉入大水为蜃']
  },
  {
    name: '小雪',
    icon: '❄️',
    solar: '11月22-23日',
    lunar: '十月中',
    desc: '虹藏不见，天气上升，闭塞而成冬',
    hou: ['虹藏不见', '天气上升', '闭塞而成冬']
  },
  {
    name: '大雪',
    icon: '🌨️',
    solar: '12月6-8日',
    lunar: '十一月节',
    desc: '鹖鴠不鸣，虎始交，荔挺出',
    hou: ['鹖鴠不鸣', '虎始交', '荔挺出']
  },
  {
    name: '冬至',
    icon: '🌑',
    solar: '12月21-23日',
    lunar: '十一月中',
    desc: '蚯蚓结，麋角解，水泉动',
    hou: ['蚯蚓结', '麋角解', '水泉动']
  },
  {
    name: '小寒',
    icon: '🌨️',
    solar: '1月5-7日',
    lunar: '十二月节',
    desc: '雁北乡，鹊始巢，雉始雊',
    hou: ['雁北乡', '鹊始巢', '雉始雊']
  },
  {
    name: '大寒',
    icon: '🥶',
    solar: '1月20-21日',
    lunar: '十二月中',
    desc: '鸡始乳，征鸟厉疾，水泽腹坚',
    hou: ['鸡始乳', '征鸟厉疾', '水泽腹坚']
  }
]

export default function JieqiPage() {
  return (
    <Layout title="二十四节气">
      <PageBackground colorRgb="102, 204, 255">
        
        <div className="xian-cloud-bg"></div>
        
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🌙</div>
            <h1 className={styles.title}>二十四节气</h1>
            <p className={styles.subtitle}>天人合一</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 天部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              春雨惊春清谷天
              <br />
              夏满芒夏暑相连
              <br />
              秋处露秋寒霜降
              <br />
              冬雪雪冬小大寒
            </p>
          </motion.div>

          <motion.div 
            className={`${styles.section} ${styles.animateFadeInUp} ${styles.animateDelay4}`}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>壹</span>
              <div className={styles.sectionTitleWrap}>
                <h2 className={styles.sectionTitle}>节气总览</h2>
                <p className={styles.sectionSubtitle}>二十四气 · 七十二候</p>
              </div>
            </div>

            <div className={styles.featureBox}>
              <h3>何为二十四节气</h3>
              <p>
                <strong>二十四节气</strong>，是干支历中表示自然节律变化以及确立"十二月建"的特定节令。
                它最初是依据斗转星移制定，北斗七星循环旋转，斗柄绕东、南、西、北旋转一圈，为一周期，谓之一"岁"。
              </p>
              <p>
                在国际气象界，二十四节气被誉为"<strong>中国的第五大发明</strong>"。
                2016年11月30日，二十四节气被正式列入联合国教科文组织人类非物质文化遗产代表作名录。
              </p>
              <p>
                "节"为气之开始，"气"为气之终结。一年二十四节气，依次为：
                立春、雨水、惊蛰、春分、清明、谷雨、立夏、小满、芒种、夏至、小暑、大暑、
                立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至、小寒、大寒。
              </p>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.section} ${styles.magicCircleHover} ${styles.animateFadeInUp} ${styles.animateDelay5}`}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>贰</span>
              <div className={styles.sectionTitleWrap}>
                <h2 className={styles.sectionTitle}>二十四气</h2>
                <p className={styles.sectionSubtitle}>每节气三候，每候五日</p>
              </div>
            </div>

            <div className={styles.cardGrid}>
              {JIEQI_DATA.map((jieqi, index) => (
                <motion.div
                  key={jieqi.name}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.03 }}
                >
                  <div className={styles.cardIcon}>{jieqi.icon}</div>
                  <h3 className={styles.cardName}>{jieqi.name}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>{jieqi.solar}</span>
                    <span className={styles.metaItem}>{jieqi.lunar}</span>
                  </div>
                  <p className={styles.cardDesc}>{jieqi.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.section} ${styles.animateFadeInUp} ${styles.animateDelay6}`}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>叁</span>
              <div className={styles.sectionTitleWrap}>
                <h2 className={styles.sectionTitle}>四季分属</h2>
                <p className={styles.sectionSubtitle}>春夏秋冬各六气</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <span style={{ fontSize: '2rem' }}>🌱</span>
                  <h3 style={{ color: '#34d399', margin: '0.5rem 0', letterSpacing: '0.2em', fontFamily: 'Noto Serif SC' }}>春</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>孟春 · 仲春 · 季春</p>
                </div>
                <div className={styles.listGrid}>
                  {JIEQI_DATA.slice(0, 6).map(jieqi => (
                    <div key={jieqi.name} className={styles.listItem}>
                      <span className={styles.listItemIcon}>{jieqi.icon}</span>
                      <span className={styles.listItemText}>{jieqi.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <span style={{ fontSize: '2rem' }}>☀️</span>
                  <h3 style={{ color: '#f87171', margin: '0.5rem 0', letterSpacing: '0.2em', fontFamily: 'Noto Serif SC' }}>夏</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>孟夏 · 仲夏 · 季夏</p>
                </div>
                <div className={styles.listGrid}>
                  {JIEQI_DATA.slice(6, 12).map(jieqi => (
                    <div key={jieqi.name} className={styles.listItem}>
                      <span className={styles.listItemIcon}>{jieqi.icon}</span>
                      <span className={styles.listItemText}>{jieqi.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(234, 179, 8, 0.3)' }}>
                  <span style={{ fontSize: '2rem' }}>🍂</span>
                  <h3 style={{ color: '#fbbf24', margin: '0.5rem 0', letterSpacing: '0.2em', fontFamily: 'Noto Serif SC' }}>秋</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>孟秋 · 仲秋 · 季秋</p>
                </div>
                <div className={styles.listGrid}>
                  {JIEQI_DATA.slice(12, 18).map(jieqi => (
                    <div key={jieqi.name} className={styles.listItem}>
                      <span className={styles.listItemIcon}>{jieqi.icon}</span>
                      <span className={styles.listItemText}>{jieqi.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <span style={{ fontSize: '2rem' }}>❄️</span>
                  <h3 style={{ color: '#60a5fa', margin: '0.5rem 0', letterSpacing: '0.2em', fontFamily: 'Noto Serif SC' }}>冬</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>孟冬 · 仲冬 · 季冬</p>
                </div>
                <div className={styles.listGrid}>
                  {JIEQI_DATA.slice(18, 24).map(jieqi => (
                    <div key={jieqi.name} className={styles.listItem}>
                      <span className={styles.listItemIcon}>{jieqi.icon}</span>
                      <span className={styles.listItemText}>{jieqi.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
