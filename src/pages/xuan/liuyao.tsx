/**
 * 灵墟 - 玄学模块 - 六爻占卜（完整版）
 * 六爻排盘 + 64卦解读 + 动爻分析 + 历史记录
 */

'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

// 64卦数据
const GUA_64: Record<string, { name: string; xiang: string; ci: string; jie: string }> = {
  '111111': { name: '乾', xiang: '天行健，君子以自强不息', ci: '元亨利贞', jie: '大吉之卦，刚健进取，诸事顺遂。事业有成，前途光明。' },
  '000000': { name: '坤', xiang: '地势坤，君子以厚德载物', ci: '元亨利牝马之贞', jie: '柔顺包容，厚德载物。宜守不宜攻，稳步发展。' },
  '010001': { name: '屯', xiang: '云雷屯，君子以经纶', ci: '元亨利贞，勿用有攸往', jie: '万事开头难，需耐心积累。初生之物，待时而动。' },
  '100010': { name: '蒙', xiang: '山下出泉，蒙', ci: '亨，匪我求童蒙', jie: '启蒙教化，学习成长。宜虚心求教，循序渐进。' },
  '010111': { name: '需', xiang: '云上于天，需', ci: '有孚光亨贞吉', jie: '等待时机，不可急躁。耐心守候，终有所得。' },
  '111010': { name: '讼', xiang: '天与水违行，讼', ci: '有孚窒惕中吉', jie: '争讼不利，宜和解。退一步海阔天空。' },
  '000010': { name: '师', xiang: '地中有水，师', ci: '贞丈人吉无咎', jie: '统领有方，纪律严明。宜团结协作，共克时艰。' },
  '010000': { name: '比', xiang: '地上有水，比', ci: '吉原筮元永贞无咎', jie: '亲比和谐，团结互助。贵人相助，事业顺遂。' },
  '110111': { name: '小畜', xiang: '风行天上，小畜', ci: '亨密云不雨', jie: '积蓄力量，待时而发。小有阻碍，终将突破。' },
  '111011': { name: '履', xiang: '上天下泽，履', ci: '履虎尾不咥人亨', jie: '谨慎行事，如履薄冰。小心翼翼，终能化险为夷。' },
  '000111': { name: '泰', xiang: '天地交泰', ci: '小往大来吉亨', jie: '天地交泰，万事亨通。顺势而为，大有可为。' },
  '111000': { name: '否', xiang: '天地不交否', ci: '否之匪人', jie: '天地不交，诸事阻滞。宜守不宜进，等待转机。' },
  '111101': { name: '同人', xiang: '天与火同人', ci: '同人于野亨', jie: '志同道合，团结协作。贵人相助，共创大业。' },
  '101111': { name: '大有', xiang: '火在天上大有', ci: '元亨', jie: '光明普照，大有收获。事业兴旺，财源广进。' },
  '000100': { name: '谦', xiang: '地中有山谦', ci: '亨君子有终', jie: '谦虚谨慎，德行高尚。低调行事，终获成功。' },
  '001000': { name: '豫', xiang: '雷出地奋豫', ci: '利建侯行师', jie: '欢乐愉悦，顺势而为。把握机遇，大有作为。' },
  '011001': { name: '随', xiang: '泽中有雷随', ci: '元亨利贞无咎', jie: '随机应变，顺势而为。灵活机动，无往不利。' },
  '100110': { name: '蛊', xiang: '山下有风蛊', ci: '元亨利涉大川', jie: '整治弊病，拨乱反正。革故鼎新，开创新局。' },
  '000011': { name: '临', xiang: '泽上有地临', ci: '元亨利贞', jie: '君临天下，大展宏图。机会来临，积极把握。' },
  '110000': { name: '观', xiang: '风行地上观', ci: '盥而不荐有孚颙若', jie: '观察形势，审时度势。以德服人，感化众生。' },
  '101001': { name: '噬嗑', xiang: '雷电噬嗑', ci: '亨利用狱', jie: '明辨是非，断案公正。解决问题，排除障碍。' },
  '100101': { name: '贲', xiang: '山下有火贲', ci: '亨小利有攸往', jie: '文饰美化，外表光鲜。内有实质，外有文采。' },
  '100000': { name: '剥', xiang: '山附于地剥', ci: '不利有攸往', jie: '剥落衰退，宜守不宜进。韬光养晦，等待时机。' },
  '000001': { name: '复', xiang: '雷在地中复', ci: '亨出入无疾', jie: '一阳来复，万物更新。转机出现，东山再起。' },
  '111001': { name: '无妄', xiang: '天下雷行无妄', ci: '元亨利贞', jie: '真诚无妄，顺应天道。诚实守信，天助自助。' },
  '100111': { name: '大畜', xiang: '天在山中大畜', ci: '利贞不家食吉', jie: '积蓄力量，厚积薄发。养精蓄锐，待时而动。' },
  '100001': { name: '颐', xiang: '山下有雷颐', ci: '贞吉观颐自求口实', jie: '养生之道，谨言慎行。修身养性，健康长寿。' },
  '011110': { name: '大过', xiang: '泽灭木大过', ci: '栋桡利有攸往亨', jie: '负担过重，需要调整。量力而行，适度而为。' },
  '010010': { name: '坎', xiang: '水洊至坎', ci: '习坎有孚维心亨', jie: '险难重重，需有信心。保持冷静，终能脱险。' },
  '101101': { name: '离', xiang: '明两作离', ci: '利贞亨畜牝牛吉', jie: '光明灿烂，前途光明。宜守正道，避免过激。' },
  '011100': { name: '咸', xiang: '山上有泽咸', ci: '亨利贞取女吉', jie: '感应相通，心心相印。情投意合，婚姻美满。' },
  '001110': { name: '恒', xiang: '雷风恒', ci: '亨无咎利贞', jie: '持之以恒，始终如一。坚持不懈，终有所成。' },
  '111100': { name: '遁', xiang: '天下有山遁', ci: '亨小利贞', jie: '退避三舍，以退为进。识时务者，明哲保身。' },
  '001111': { name: '大壮', xiang: '雷在天上大壮', ci: '利贞', jie: '阳气旺盛，势力壮大。刚健有力，大有作为。' },
  '101000': { name: '晋', xiang: '明出地上晋', ci: '康侯用锡马蕃庶', jie: '光明上升，事业进步。积极进取，前途光明。' },
  '000101': { name: '明夷', xiang: '明入地中明夷', ci: '利艰贞', jie: '光明受损，韬光养晦。守正待时，等待黎明。' },
  '110101': { name: '家人', xiang: '风自火出家人', ci: '利女贞', jie: '家庭和睦，齐家有道。家和万事兴。' },
  '101011': { name: '睽', xiang: '火泽睽', ci: '小事吉', jie: '意见相左，求同存异。化解分歧，达成共识。' },
  '010100': { name: '蹇', xiang: '山上有水蹇', ci: '利西南不利东北', jie: '困难重重，需要援助。贵人相助，共渡难关。' },
  '001010': { name: '解', xiang: '雷雨作解', ci: '利西南无所往', jie: '困难解除，柳暗花明。抓住机遇，迎接新生。' },
  '100011': { name: '损', xiang: '山下有泽损', ci: '有孚元吉无咎', jie: '减损多余，以补不足。取舍有度，得失平衡。' },
  '110001': { name: '益', xiang: '风雷益', ci: '利有攸往利涉大川', jie: '利益增长，大有收益。积极进取，事业兴旺。' },
  '011111': { name: '夬', xiang: '泽上于天夬', ci: '扬于王庭孚号', jie: '果断决策，排除小人。刚正不阿，事业有成。' },
  '111110': { name: '姤', xiang: '天下有风姤', ci: '女壮勿用取女', jie: '邂逅相遇，缘分使然。把握机会，谨慎处理。' },
  '011000': { name: '萃', xiang: '泽上于地萃', ci: '亨利贞用大牲吉', jie: '聚集人才，共创大业。团结一致，事业兴旺。' },
  '000110': { name: '升', xiang: '地中生木升', ci: '元亨用见大人', jie: '步步高升，前程似锦。积极进取，大展宏图。' },
  '011010': { name: '困', xiang: '泽无水困', ci: '亨贞大人吉无咎', jie: '困顿之中，坚守正道。守得云开见月明。' },
  '010110': { name: '井', xiang: '木上有水井', ci: '改邑不改井', jie: '资源丰富，滋养万物。保持本心，不受外扰。' },
  '011101': { name: '革', xiang: '泽中有火革', ci: '己日乃孚元亨利贞', jie: '变革创新，除旧布新。顺应时势，开创新局。' },
  '101110': { name: '鼎', xiang: '木上有火鼎', ci: '元吉亨', jie: '鼎新革故，事业有成。名声远扬，受人敬重。' },
  '001001': { name: '震', xiang: '洊雷震', ci: '亨震来虩虩', jie: '震动变革，警醒自我。居安思危，未雨绸缪。' },
  '100100': { name: '艮', xiang: '兼山艮', ci: '艮其背不获其身', jie: '静止不动，适可而止。稳如泰山，以静制动。' },
  '110100': { name: '渐', xiang: '山上有木渐', ci: '女归吉利贞', jie: '循序渐进，稳步发展。脚踏实地，终有所成。' },
  '001011': { name: '归妹', xiang: '泽上有雷归妹', ci: '征凶无攸利', jie: '急于求成，反而不利。耐心等待，水到渠成。' },
  '001101': { name: '丰', xiang: '雷电皆至丰', ci: '亨王假之勿忧', jie: '丰盛富足，鼎盛时期。居安思危，保持警惕。' },
  '101100': { name: '旅', xiang: '山上有火旅', ci: '小亨旅贞吉', jie: '旅途劳顿，需要谨慎。漂泊在外，注意安全。' },
  '110110': { name: '巽', xiang: '随风巽', ci: '小亨利有攸往', jie: '顺势而为，灵活变通。随风而动，无往不利。' },
  '011011': { name: '兑', xiang: '丽泽兑', ci: '亨利贞', jie: '喜悦和谐，人际关系良好。心情愉悦，万事顺心。' },
  '110010': { name: '涣', xiang: '风行水上涣', ci: '亨王假有庙', jie: '涣散分离，需要团结。凝聚力量，共克时艰。' },
  '010011': { name: '节', xiang: '泽上有水节', ci: '亨苦节不可贞', jie: '节制有度，恰到好处。过犹不及，适度为宜。' },
  '110011': { name: '中孚', xiang: '泽上有风中孚', ci: '豚鱼吉利涉大川', jie: '诚信为本，感化他人。以诚待人，无往不利。' },
  '001100': { name: '小过', xiang: '山上有雷小过', ci: '亨利贞可小事', jie: '小有过失，无伤大雅。谨慎行事，避免大错。' },
  '010101': { name: '既济', xiang: '水在火上既济', ci: '亨小利贞', jie: '功成名就，大局已定。保持谨慎，防止逆转。' },
  '101010': { name: '未济', xiang: '火在水上未济', ci: '亨小狐汔济', jie: '尚未完成，需要努力。继续前进，终将成功。' }
}

const YAO_NAMES = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻']

interface LiuyaoResult {
  yao: number[]          // 6爻 (6=老阴, 7=少阳, 8=少阴, 9=老阳)
  benGua: string         // 本卦二进制
  bianGua: string        // 变卦二进制
  benGuaName: string
  bianGuaName: string
  dongYao: number[]      // 动爻位置
  guaInfo: { name: string; xiang: string; ci: string; jie: string }
  bianGuaInfo?: { name: string; xiang: string; ci: string; jie: string }
}

export default function LiuyaoPage() {
  const [yaoResults, setYaoResults] = useState<number[]>([])
  const [result, setResult] = useState<LiuyaoResult | null>(null)
  const [history, setHistory] = useState<LiuyaoResult[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // 加载历史记录
  useEffect(() => {
    const saved = localStorage.getItem('liuyao_history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error('加载历史记录失败')
      }
    }
  }, [])

  // 摇卦
  const castYao = () => {
    if (yaoResults.length >= 6) {
      setYaoResults([])
      setResult(null)
      return
    }

    // 三枚铜钱：字为阴(2)，背为阳(3)
    const coins = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 3 : 2)
    const sum = coins.reduce((a, b) => a + b, 0) // 6,7,8,9
    const newYao = [...yaoResults, sum]
    setYaoResults(newYao)

    if (newYao.length === 6) {
      const liuyaoResult = calculateResult(newYao)
      setResult(liuyaoResult)
      
      // 保存历史
      const newHistory = [liuyaoResult, ...history.slice(0, 9)]
      setHistory(newHistory)
      localStorage.setItem('liuyao_history', JSON.stringify(newHistory))
    }
  }

  // 计算结果
  const calculateResult = (yao: number[]): LiuyaoResult => {
    // 本卦：6,8为阴(0)，7,9为阳(1)
    const benGua = yao.map(y => (y === 7 || y === 9) ? '1' : '0').join('')
    // 变卦：6变阳(1)，9变阴(0)，其他不变
    const bianGua = yao.map(y => {
      if (y === 6) return '1'  // 老阴变阳
      if (y === 9) return '0'  // 老阳变阴
      return (y === 7 || y === 9) ? '1' : '0'
    }).join('')

    // 动爻位置
    const dongYao = yao.map((y, i) => (y === 6 || y === 9) ? i : -1).filter(i => i >= 0)

    const guaInfo = GUA_64[benGua] || { name: '未知', xiang: '', ci: '', jie: '' }
    const bianGuaInfo = benGua !== bianGua ? GUA_64[bianGua] : undefined

    return {
      yao,
      benGua,
      bianGua,
      benGuaName: guaInfo.name,
      bianGuaName: bianGuaInfo?.name || guaInfo.name,
      dongYao,
      guaInfo,
      bianGuaInfo
    }
  }

  // 渲染卦象
  const renderGua = (yao: number[], isBen: boolean = true) => {
    const displayYao = isBen ? yao : yao.map(y => {
      if (y === 6) return 9  // 老阴变阳
      if (y === 9) return 6  // 老阳变阴
      return y
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        {[...displayYao].reverse().map((y, i) => {
          const isYang = y === 7 || y === 9
          const isDong = y === 6 || y === 9
          const yaoName = YAO_NAMES[5 - i]

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: '#666', width: '30px', textAlign: 'right' }}>{yaoName}</span>
              <div style={{
                width: '80px',
                height: '12px',
                display: 'flex',
                justifyContent: 'center',
                gap: '4px'
              }}>
                {isYang ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: isDong ? '#c9a227' : '#e8d48b',
                    borderRadius: '2px'
                  }} />
                ) : (
                  <>
                    <div style={{ width: '35%', height: '100%', background: isDong ? '#c9a227' : '#e8d48b', borderRadius: '2px' }} />
                    <div style={{ width: '35%', height: '100%', background: isDong ? '#c9a227' : '#e8d48b', borderRadius: '2px' }} />
                  </>
                )}
              </div>
              {isDong && <span style={{ fontSize: '0.6rem', color: '#f87171' }}>动</span>}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Layout title="六爻">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>六爻占卜</h1>
          <p className={styles.subtitle}>以钱代蓍，占卜问事</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>摇卦</h2>
          <div className={styles.toolBox} style={{ textAlign: 'center' }}>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>
              心中默念您的问题，依次点击摇卦按钮六次
            </p>

            <button
              className={styles.button}
              onClick={castYao}
              style={{ minWidth: '120px' }}
            >
              {yaoResults.length >= 6 ? '重新开始' : `第 ${yaoResults.length + 1} 次摇卦`}
            </button>

            {yaoResults.length > 0 && yaoResults.length < 6 && (
              <div style={{ marginTop: '2rem' }}>
                <p style={{ color: '#888', marginBottom: '0.5rem' }}>已摇 {yaoResults.length} 次</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {yaoResults.map((y, i) => (
                    <div key={i} style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: y === 6 ? '#f87171' : y === 9 ? '#c9a227' : y === 7 ? '#4ade80' : '#1E90FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: '#0a0a0f'
                    }}>
                      {y === 6 ? '老阴' : y === 7 ? '少阳' : y === 8 ? '少阴' : '老阳'}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {result && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>卦象</h2>
              <div className={styles.resultBox}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: '#c9a227', marginBottom: '1rem', fontSize: '1.5rem' }}>
                      {result.benGuaName}卦
                      <span style={{ fontSize: '0.9rem', color: '#888', marginLeft: '0.5rem' }}>（本卦）</span>
                    </h3>
                    {renderGua(result.yao, true)}
                  </div>

                  {result.bianGuaInfo && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', color: '#c9a227', fontSize: '2rem' }}>→</div>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#c9a227', marginBottom: '1rem', fontSize: '1.5rem' }}>
                          {result.bianGuaName}卦
                          <span style={{ fontSize: '0.9rem', color: '#888', marginLeft: '0.5rem' }}>（变卦）</span>
                        </h3>
                        {renderGua(result.yao, false)}
                      </div>
                    </>
                  )}
                </div>

                {result.dongYao.length > 0 && (
                  <p style={{ textAlign: 'center', color: '#f87171', marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    动爻：{result.dongYao.map(i => YAO_NAMES[i]).join('、')}
                  </p>
                )}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>卦辞解读</h2>
              <div className={styles.resultBox}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{result.benGuaName}卦</h3>
                <p style={{ color: '#e8d48b', marginBottom: '0.5rem' }}><strong>卦辞：</strong>{result.guaInfo.ci}</p>
                <p style={{ color: '#888', marginBottom: '1rem' }}><strong>象曰：</strong>{result.guaInfo.xiang}</p>
                <p style={{ color: '#888', lineHeight: 1.8 }}>{result.guaInfo.jie}</p>

                {result.bianGuaInfo && (
                  <>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(201,162,39,0.2)', margin: '1.5rem 0' }} />
                    <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>变卦：{result.bianGuaName}卦</h3>
                    <p style={{ color: '#e8d48b', marginBottom: '0.5rem' }}><strong>卦辞：</strong>{result.bianGuaInfo.ci}</p>
                    <p style={{ color: '#888', marginBottom: '1rem' }}><strong>象曰：</strong>{result.bianGuaInfo.xiang}</p>
                    <p style={{ color: '#888', lineHeight: 1.8 }}>{result.bianGuaInfo.jie}</p>
                  </>
                )}
              </div>
            </section>
          </>
        )}

        {history.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              占卜历史
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{ marginLeft: '1rem', fontSize: '0.8rem', padding: '0.25rem 0.5rem', background: 'transparent', border: '1px solid #c9a227', color: '#c9a227', borderRadius: '4px', cursor: 'pointer' }}
              >
                {showHistory ? '收起' : '展开'}
              </button>
            </h2>
            {showHistory && (
              <div className={styles.cardGrid}>
                {history.map((h, i) => (
                  <div key={i} className={styles.card} style={{ padding: '1rem', cursor: 'pointer' }} onClick={() => setResult(h)}>
                    <div style={{ color: '#c9a227', marginBottom: '0.5rem' }}>
                      {h.benGuaName}卦 {h.bianGuaName !== h.benGuaName && `→ ${h.bianGuaName}卦`}
                    </div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>
                      动爻：{h.dongYao.length > 0 ? h.dongYao.map(j => YAO_NAMES[j]).join('、') : '无'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六爻说明</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>摇卦方法</h4>
            <ul style={{ color: '#888', lineHeight: 2, paddingLeft: '1.5rem', margin: 0 }}>
              <li>心中默念您要询问的问题</li>
              <li>依次点击摇卦按钮六次</li>
              <li>每次摇卦会得到老阴、老阳、少阴、少阳之一</li>
              <li>老阴和老阳为动爻，会发生变化</li>
              <li>六次摇卦后得到完整卦象</li>
            </ul>
          </div>
          <div className={styles.infoBox} style={{ marginTop: '1rem' }}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>注意事项</h4>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              占卜仅供娱乐参考，不可过于依赖。命运掌握在自己手中，好的运势需要把握，坏的运势可以化解。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
