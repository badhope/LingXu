/**
 * 灵墟 - 玄学模块 - 易经页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YijingPage() {
  const [selectedGua, setSelectedGua] = useState<number | null>(null)
  
  const hexagrams = [
    { num: 1, name: '乾', meaning: '元亨利贞', desc: '纯阳至刚，象征天，代表创造力和领导力。运势极强，万事亨通。' },
    { num: 2, name: '坤', meaning: '元亨利牝马之贞', desc: '纯阴至柔，象征地，代表包容和顺从。宜稳守待机。' },
    { num: 3, name: '屯', meaning: '元亨利贞，勿用有攸往', desc: '事物初创，艰难困顿。但前途光明，需要耐心等待。' },
    { num: 4, name: '蒙', meaning: '亨，匪我求童蒙，童蒙求我', desc: '蒙昧无知，需要教导。学习使人进步。' },
    { num: 5, name: '需', meaning: '有孚，光亨，贞吉', desc: '需要等待，不可冒进。耐心等待会有收获。' },
    { num: 6, name: '讼', meaning: '有孚，窒惕，中吉终凶', desc: '争讼纠纷，宜和解。以和为贵，避免诉讼。' },
    { num: 7, name: '师', meaning: '贞，丈人吉，无咎', desc: '统兵作战，需有德高望重者带领。' },
    { num: 8, name: '比', meaning: '吉，原筮，元永贞', desc: '亲比辅助，团结一致。选对盟友很重要。' },
    { num: 9, name: '小畜', meaning: '亨，密云不雨，自我西郊', desc: '小有积蓄，力量尚弱。宜蓄积力量，待时而动。' },
    { num: 10, name: '履', meaning: '履虎尾，不咥人，亨', desc: '履行道义，小心谨慎。虽有风险，但能化险为夷。' },
    { num: 11, name: '泰', meaning: '小往大来，吉亨', desc: '天地交泰，阴阳调和。运势极佳，诸事顺利。' },
    { num: 12, name: '否', meaning: '否之匪人，不利君子贞', desc: '天地不交，闭塞不通。运势不佳，宜守正待时。' },
    { num: 13, name: '同人', meaning: '同人于野，亨', desc: '与人和同，团结协作。人际关系良好，事业有成。' },
    { num: 14, name: '大有', meaning: '元亨', desc: '大有所获，财富丰盛。运势强盛，事业发达。' },
    { num: 15, name: '谦', meaning: '亨，君子有终', desc: '谦虚待人，德才兼备。谦虚使人进步，终有成就。' },
    { num: 16, name: '豫', meaning: '利建侯行师', desc: '安乐愉悦，顺势而为。宜积极行动，建功立业。' },
    { num: 17, name: '随', meaning: '元亨利贞，无咎', desc: '随顺时机，从善如流。把握机遇，必有收获。' },
    { num: 18, name: '蛊', meaning: '元亨，利涉大川', desc: '整治积弊，革新进取。革故鼎新，开创未来。' },
    { num: 19, name: '临', meaning: '元亨利贞，至于八月有凶', desc: '居高临下，领导众人。运势极佳，但需警惕盛极而衰。' },
    { num: 20, name: '观', meaning: '盥而不荐，有孚颙若', desc: '观察时机，审慎行事。静观其变，谋定后动。' },
    { num: 21, name: '噬嗑', meaning: '亨，利用狱', desc: '咬合决断，执法严明。解决问题，排除障碍。' },
    { num: 22, name: '贲', meaning: '亨，小利有攸往', desc: '文饰美化，文采斐然。注重形象，礼仪周全。' },
    { num: 23, name: '剥', meaning: '不利有攸往', desc: '剥落衰败，运势低迷。宜守不宜进，静待转机。' },
    { num: 24, name: '复', meaning: '亨，出入无疾', desc: '阳气回复，否极泰来。运势回升，前景光明。' },
    { num: 25, name: '无妄', meaning: '元亨利贞，其匪正有眚', desc: '不妄为，守正道。诚实无欺，必有福报。' },
    { num: 26, name: '大畜', meaning: '利贞，不家食吉', desc: '大有积蓄，力量充沛。宜积极进取，成就大业。' },
    { num: 27, name: '颐', meaning: '贞吉，观颐，自求口实', desc: '颐养身心，修养德行。自力更生，丰衣足食。' },
    { num: 28, name: '大过', meaning: '栋桡，利有攸往，亨', desc: '过犹不及，需要平衡。虽有风险，但可冒险一试。' },
    { num: 29, name: '坎', meaning: '习坎，有孚维心亨', desc: '重险重重，困境重重。但坚守诚信，终能脱险。' },
    { num: 30, name: '离', meaning: '利贞，亨，畜牝牛吉', desc: '光明磊落，依附正道。运势光明，事业有成。' },
    { num: 31, name: '咸', meaning: '亨，利贞，取女吉', desc: '感应交合，阴阳调和。人际关系和谐，婚姻美满。' },
    { num: 32, name: '恒', meaning: '亨，无咎，利贞', desc: '持之以恒，坚定不移。坚持就是胜利，终有成就。' },
    { num: 33, name: '遁', meaning: '亨，小利贞', desc: '退避隐居，保存实力。适时而退，明哲保身。' },
    { num: 34, name: '大壮', meaning: '利贞', desc: '力量强盛，声势浩大。宜保持正道，不可恃强凌弱。' },
    { num: 35, name: '晋', meaning: '康侯用锡马蕃庶，昼日三接', desc: '晋升进步，事业发展。运势上升，前程似锦。' },
    { num: 36, name: '明夷', meaning: '利艰贞', desc: '光明被伤，处境艰难。宜韬光养晦，守正待时。' },
    { num: 37, name: '家人', meaning: '利女贞', desc: '家庭和睦，家风端正。家庭幸福，事业稳固。' },
    { num: 38, name: '睽', meaning: '小事吉', desc: '睽违不和，意见分歧。求同存异，小事可成。' },
    { num: 39, name: '蹇', meaning: '利西南，不利东北', desc: '艰难险阻，进退维谷。宜选择正确方向，寻求帮助。' },
    { num: 40, name: '解', meaning: '利西南，无所往', desc: '解除困难，摆脱困境。运势好转，问题解决。' },
    { num: 41, name: '损', meaning: '有孚，元吉，无咎', desc: '减损损益，吃亏是福。适当牺牲，必有回报。' },
    { num: 42, name: '益', meaning: '利有攸往，利涉大川', desc: '增益获益，运势极佳。宜积极行动，大有可为。' },
    { num: 43, name: '夬', meaning: '扬于王庭，孚号有厉', desc: '决断果决，清除小人。宜果断行动，除恶务尽。' },
    { num: 44, name: '姤', meaning: '女壮，勿用取女', desc: '相遇相逢，际遇无常。宜谨慎行事，防患未然。' },
    { num: 45, name: '萃', meaning: '亨，王假有庙', desc: '聚集汇聚，群英荟萃。人脉广泛，事业兴旺。' },
    { num: 46, name: '升', meaning: '元亨，用见大人', desc: '上升升腾，步步高升。运势极佳，前程似锦。' },
    { num: 47, name: '困', meaning: '亨，贞大人吉，无咎', desc: '穷困潦倒，处境艰难。但坚守正道，终能脱困。' },
    { num: 48, name: '井', meaning: '改邑不改井，无丧无得', desc: '井水养人，恒常不变。坚守岗位，默默奉献。' },
    { num: 49, name: '革', meaning: '巳日乃孚，元亨利贞', desc: '革命变革，除旧布新。适时变革，开创新局。' },
    { num: 50, name: '鼎', meaning: '元吉，亨', desc: '鼎新稳固，政权稳固。运势极佳，事业鼎盛。' },
    { num: 51, name: '震', meaning: '亨，震来虩虩，笑言哑哑', desc: '震动惊雷，警钟长鸣。虽有惊恐，但能转危为安。' },
    { num: 52, name: '艮', meaning: '艮其背，不获其身', desc: '静止不动，适可而止。宜知止不殆，量力而行。' },
    { num: 53, name: '渐', meaning: '女归吉，利贞', desc: '渐进有序，循序渐进。稳步前进，终有成就。' },
    { num: 54, name: '归妹', meaning: '征凶，无攸利', desc: '嫁妹出嫁，婚姻大事。宜谨慎行事，不可急躁。' },
    { num: 55, name: '丰', meaning: '亨，王假之，勿忧', desc: '丰盛壮大，事业辉煌。运势极佳，硕果累累。' },
    { num: 56, name: '旅', meaning: '小亨，旅贞吉', desc: '旅行在外，漂泊不定。宜守正安分，寻求安定。' },
    { num: 57, name: '巽', meaning: '小亨，利有攸往', desc: '巽顺谦逊，顺势而为。宜灵活应变，把握机遇。' },
    { num: 58, name: '兑', meaning: '亨，利贞', desc: '喜悦和乐，人际关系和谐。心情愉快，诸事顺利。' },
    { num: 59, name: '涣', meaning: '亨，王假有庙', desc: '涣散离散，需要凝聚。宜团结众人，共渡难关。' },
    { num: 60, name: '节', meaning: '亨，苦节不可贞', desc: '节制约束，适度为宜。过犹不及，把握分寸。' },
    { num: 61, name: '中孚', meaning: '豚鱼吉，利涉大川', desc: '诚信中实，言而有信。诚信为本，必有福报。' },
    { num: 62, name: '小过', meaning: '亨，利贞，可小事', desc: '小有过越，无伤大雅。小事可成，大事需慎。' },
    { num: 63, name: '既济', meaning: '亨小，利贞，初吉终乱', desc: '既成已济，功成名就。但需警惕，防止功亏一篑。' },
    { num: 64, name: '未济', meaning: '亨，小狐汔济，濡其尾', desc: '未成未济，事业未竟。坚持到底，终能成功。' },
  ]

  const selected = selectedGua !== null ? hexagrams[selectedGua] : null

  return (
    <Layout title="易经">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>☰</div>
          <h1 className={styles.title}>易经六十四卦</h1>
          <p className={styles.subtitle}>变易之道，万物之源</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六十四卦图</h2>
          <p className={styles.sectionDesc}>
            点击卦象查看详细解读。易经是中华文化的源头，蕴含着深邃的哲学思想。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem', marginTop: '1.5rem' }}>
            {hexagrams.map((gua, i) => (
              <div 
                key={gua.num} 
                onClick={() => setSelectedGua(i)}
                className={styles.card}
                style={{ 
                  cursor: 'pointer',
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  borderColor: selectedGua === i ? '#c9a227' : 'rgba(201, 162, 39, 0.15)',
                  background: selectedGua === i ? 'rgba(201, 162, 39, 0.1)' : 'rgba(26, 26, 46, 0.5)'
                }}
              >
                <div style={{ fontSize: '1.5rem', color: '#c9a227', marginBottom: '0.25rem' }}>{gua.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>{gua.num}</div>
              </div>
            ))}
          </div>
        </section>

        {selected && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{selected.name}卦 详解</h2>
            <div className={styles.toolBox}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '4rem', color: '#c9a227', marginBottom: '1rem' }}>{selected.name}</div>
                <div style={{ fontSize: '1.25rem', color: '#e8d48b' }}>第{selected.num}卦</div>
              </div>
              <div className={styles.resultBox}>
                <h3 className={styles.resultTitle}>卦辞</h3>
                <div className={styles.resultContent}>{selected.meaning}</div>
              </div>
              <div className={styles.infoBox} style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>卦象解读</h4>
                <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>{selected.desc}</p>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八卦基础</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {[
              { symbol: '☰', name: '乾', element: '天', meaning: '刚健' },
              { symbol: '☱', name: '兑', element: '泽', meaning: '喜悦' },
              { symbol: '☲', name: '离', element: '火', meaning: '光明' },
              { symbol: '☳', name: '震', element: '雷', meaning: '震动' },
              { symbol: '☴', name: '巽', element: '风', meaning: '入' },
              { symbol: '☵', name: '坎', element: '水', meaning: '险陷' },
              { symbol: '☶', name: '艮', element: '山', meaning: '静止' },
              { symbol: '☷', name: '坤', element: '地', meaning: '柔顺' },
            ].map((bagua) => (
              <div key={bagua.name} className={styles.card} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', color: '#c9a227', marginBottom: '0.5rem' }}>{bagua.symbol}</div>
                <div style={{ color: '#e8d48b', fontWeight: 500 }}>{bagua.name}</div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>{bagua.element} · {bagua.meaning}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
