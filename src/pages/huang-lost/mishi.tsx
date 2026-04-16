'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function MishiPage() {
  const mysteries = [
    {
      era: '混沌时期',
      year: '无量量劫前',
      title: '盘古开天真相',
      mystery: '为何盘古要开天？',
      desc: '混沌之中，盘古为何要手持盘古斧劈开混沌？是使命使然，还是另有隐情？开天之后身化万物，是自愿还是被迫？三千魔神为何要阻止开天？',
      theories: ['大道阴谋论', '魔神内战说', '轮回转世论'],
      credibility: 15
    },
    {
      era: '龙汉初劫',
      year: '开天第一劫',
      title: '三族覆灭之谜',
      mystery: '龙凤麒麟三族为何同归于尽？',
      desc: '洪荒初年，三族称霸。为何鼎盛之时突然爆发灭族大战？是魔祖罗睺挑唆，还是天道平衡使然？三族始祖最终结局如何？',
      theories: ['罗睺算计说', '气运耗尽论', '域外天魔入侵'],
      credibility: 35
    },
    {
      era: '巫妖大战',
      year: '太古',
      title: '后羿射日真相',
      mystery: '十只金乌为何同时出现在人间？',
      desc: '帝俊十子本该轮流巡天，为何十日同出？是疏忽大意，还是有人暗中算计？大巫后羿为何能射杀天神？妖族为何不阻止？',
      theories: ['准提道人算计', '十二祖巫阴谋', '后土轮回后手'],
      credibility: 45
    },
    {
      era: '封神之战',
      year: '商末',
      title: '通天教主的愤怒',
      mystery: '为何只有截教损失惨重？',
      desc: '封神榜三教共立，为何最后只有截教弟子死伤无数？四大圣人为何联手对付通天？鸿钧老祖为何偏袒太上老君和元始天尊？',
      theories: ['天道偏心论', '截教教义太左', '通天是试验品'],
      credibility: 60
    },
    {
      era: '西游之路',
      year: '唐初',
      title: '真假美猴王',
      mystery: '被打死的究竟是谁？',
      desc: '六耳猕猴与孙悟空一般无二，无人能分辨。如来指认的六耳猕猴真的是冒牌货吗？为何被一棒打死之后，如来说"善哉善哉"？',
      theories: ['真悟空被打死', '二心分裂说', '悟空自导自演'],
      credibility: 80
    },
    {
      era: '近代',
      year: '未知',
      title: '末法时代之谜',
      mystery: '神仙为何都消失了？',
      desc: '为何近代再也不见神仙踪影？是举界飞升离开了地球，还是躲进了洞天福地？灵气为何突然枯竭？',
      theories: ['灵气枯竭论', '多维宇宙迁移', '我们被遗弃了'],
      credibility: 25
    }
  ]

  const getCredibilityColor = (cred: number) => {
    if (cred >= 70) return '#4ade80'
    if (cred >= 40) return '#fbbf24'
    return '#f87171'
  }

  return (
    <SubPageTemplate
      title="失落秘史"
      subtitle="上古秘辛 · 鲜为人知 · 历史迷雾 · 真相何在"
      icon="🗿"
      colorRgb="168, 162, 158"
    >
      <SubPageSection title="迷雾总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '未解之谜', value: '6大悬案', icon: '❓' },
              { label: '假说猜想', value: '18种', icon: '💭' },
              { label: '历史断层', value: '7处', icon: '🕳️' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#b89438' }}>{stat.value}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="历史时间轴">
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '40px',
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'linear-gradient(180deg, #a8a29e 0%, #57534e 50%, #292524 100%)'
          }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {mysteries.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{ position: 'relative', paddingLeft: '80px' }}
              >
                <motion.div
                  animate={{ 
                    boxShadow: ['0 0 0 rgba(168, 162, 158, 0)', '0 0 20px rgba(168, 162, 158, 0.5)', '0 0 0 rgba(168, 162, 158, 0)']
                  }}
                  transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    left: '22px',
                    top: '0',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a8a29e, #57534e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    zIndex: 10
                  }}
                >
                  🕵️
                </motion.div>

                <div className="xian-submodule-card">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(168, 162, 158, 0.2)',
                        color: '#a8a29e'
                      }}>
                        {item.era} · {item.year}
                      </span>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#b89438',
                        marginTop: '0.5rem'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        color: '#f87171',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        marginTop: '0.25rem'
                      }}>
                        ❓ {item.mystery}
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '0.7rem',
                        color: 'rgba(180, 180, 190, 0.5)',
                        marginBottom: '0.25rem'
                      }}>
                        可信度
                      </div>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: getCredibilityColor(item.credibility)
                      }}>
                        {item.credibility}%
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

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(180, 180, 190, 0.5)'
                    }}>
                      📌 主流猜想：
                    </span>
                    {item.theories.map((t, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        background: 'rgba(168, 162, 158, 0.15)',
                        color: 'rgba(180, 180, 190, 0.7)'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SubPageSection>

      <SubPageSection title="史家箴言">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.35rem',
                color: '#78716c',
                fontStyle: 'italic',
                lineHeight: 2
              }}
            >
              历史是任人打扮的小姑娘<br />
              所有的正史，不过是胜利者书写的谎言<br />
              真相永远掌握在少数人手中<br />
              有些秘密，注定要永远埋藏
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
