import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import ParticleField from '@/components/effects/Particles'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'

const MOFA_TIMELINE = [
  {
    year: '太古',
    title: '洪荒纪元',
    event: '巫妖大战，圣人立教，天地灵气充盈',
    type: 'gold',
    secret: '盘古开天，龙凤初劫，道魔之争，封神量劫伏笔',
  },
  {
    year: '公元前2697年',
    title: '人皇轩辕氏',
    event: '黄帝问道广成子，得授九转金丹大道',
    type: 'purple',
    secret: '广成子实为十二金仙，三皇时代是修真最鼎盛时期',
  },
  {
    year: '公元前1046年',
    title: '封神大战',
    event: '武王伐纣，姜子牙封神',
    type: 'red',
    secret: '阐截两教大战，鸿钧亲自出手，修真界第一次大清洗',
  },
  {
    year: '公元前516年',
    title: '老子西出函谷',
    event: '老子著道德经五千言',
    type: 'purple',
    secret: '道祖分神降世，留下人仙两界通道钥匙',
  },
  {
    year: '公元前259-210年',
    title: '祖龙嬴政',
    event: '始皇帝求仙，派遣徐福东渡',
    type: 'gold',
    secret: '人族最后一位有希望破碎虚空的人皇，焚书坑儒实为剿灭诸子百家修真势力',
  },
  {
    year: '公元前134年',
    title: '天人感应',
    event: '董仲舒罢黜百家，独尊儒术',
    type: 'blue',
    secret: '儒家掌握天地气运，截断百家修真传承',
  },
  {
    year: '公元155年',
    title: '黄巾起义',
    event: '张角太平道，苍天已死黄天当立',
    type: 'red',
    secret: '修真界试图干预人间，被天庭联合镇压',
  },
  {
    year: '公元629年',
    title: '唐僧西行',
    event: '玄奘西天取经',
    type: 'gold',
    secret: '道佛博弈，如来布局佛门东传',
  },
  {
    year: '公元907年',
    title: '八仙过海',
    event: '北宋初年，八仙得道飞升',
    type: 'cyan',
    secret: '末法时代前最后一批飞升者，人仙通道开始关闭',
  },
  {
    year: '公元1279年',
    title: '崖山之后',
    event: '陆秀夫负帝蹈海',
    type: 'gray',
    secret: '人族气运断绝，人仙通道彻底关闭，灵气开始衰竭',
  },
  {
    year: '公元1368年',
    title: '武当开派',
    event: '张三丰创立武当',
    type: 'purple',
    secret: '最后一位陆地神仙，隐世至明末',
  },
  {
    year: '公元1644年',
    title: '甲申国难',
    event: '李自成进京，崇祯煤山自缢',
    type: 'red',
    secret: '最后一批修士随南明永历帝退守缅甸，中土修真传承断绝',
  },
  {
    year: '公元1840年',
    title: '鸦片战争',
    event: '西方列强叩开国门',
    type: 'gray',
    secret: '西方共济会魔法势力入侵，东方修真结界被破',
  },
  {
    year: '公元1900年',
    title: '庚子国变',
    event: '义和团扶清灭洋',
    type: 'red',
    secret: '武林残存高手联手对抗西方异能者，全数战死于天津卫',
  },
  {
    year: '公元1912年',
    title: '民国之后',
    event: '仙凡永隔',
    type: 'gray',
    secret: '末法时代降临，灵气枯竭到极致，再无人能成仙',
  },
  {
    year: '公元1937年',
    title: '金陵悲歌',
    event: '南京城破，三十万魂归',
    type: 'red',
    secret: '茅山最后一代掌教燃尽百年修为布下血阵，阻断日军阴阳师召唤邪神',
  },
  {
    year: '公元1949年',
    title: '天翻地覆',
    event: '新中国成立，破旧立新',
    type: 'purple',
    secret: '人间气运否极泰来，封印百年的灵脉开始缓缓复苏',
  },
]

const CULTIVATORS = [
  {
    name: '广成子',
    dynasty: '上古',
    realm: '金仙',
    ability: '十二金仙之首',
    desc: '居崆峒山，授黄帝至道，开人族修真先河',
    secret: '封神后肉身成圣，隐居火云洞不出',
    color: COLORS.gold,
    image: '👑',
  },
  {
    name: '老子李耳',
    dynasty: '春秋',
    realm: '太上道祖',
    ability: '一气化三清',
    desc: '著道德经，西出函谷化胡为佛',
    secret: '道祖分身降世，分宝岩分宝之人',
    color: COLORS.purple,
    image: '📜',
  },
  {
    name: '庄子',
    dynasty: '战国',
    realm: '南华真人',
    ability: '逍遥游，蝶梦醒觉',
    desc: '天地与我并生，万物与我为一',
    secret: '梦醒已至化神，只在一念之间',
    color: COLORS.blue,
    image: '🦋',
  },
  {
    name: '鬼谷子',
    dynasty: '战国',
    realm: '陆地神仙',
    ability: '通天彻地，百家皆通',
    desc: '隐于鬼谷，弟子五百，左右天下',
    secret: '纵横家皆其棋子，观量劫演化',
    color: COLORS.gray200,
    image: '🎲',
  },
  {
    name: '徐福',
    dynasty: '秦',
    realm: '地仙',
    ability: '长生不老术',
    desc: '始皇帝御医，率三千童男女东渡',
    secret: '于东瀛寻得不死药，至今仍在',
    color: COLORS.cyan,
    image: '⛵',
  },
  {
    name: '张良',
    dynasty: '汉',
    realm: '凌虚真人',
    ability: '黄石公天书',
    desc: '运筹帷幄，决胜千里，功成身退',
    secret: '赤松子点化，从游于蓬莱',
    color: COLORS.teal,
    image: '⚔️',
  },
  {
    name: '张道陵天师',
    dynasty: '东汉',
    realm: '正一教主',
    ability: '斩妖除魔，太上亲传',
    desc: '创五斗米道，青城山降伏六大魔王',
    secret: '太上老君亲授天师剑，阳神飞升',
    color: COLORS.purple,
    image: '⚡',
  },
  {
    name: '左慈',
    dynasty: '三国',
    realm: '地仙',
    ability: '遁甲天书，幻化万千',
    desc: '戏曹操于铜雀台，杯酒掷杯化鸟',
    secret: '南华老仙弟子，于天柱山飞升',
    color: COLORS.amber,
    image: '🃏',
  },
  {
    name: '葛洪',
    dynasty: '晋',
    realm: '丹仙',
    ability: '金丹大道',
    desc: '著抱朴子，炼丹术集大成者',
    secret: '罗浮山炼丹飞升，留尸解仙',
    color: COLORS.red,
    image: '⚗️',
  },
  {
    name: '许逊真君',
    dynasty: '晋',
    realm: '净明教主',
    ability: '斩蛟治水',
    desc: '西山十二真君之首，拔宅飞升',
    secret: '全家四十二口鸡犬升天',
    color: COLORS.teal,
    image: '🐉',
  },
  {
    name: '陶弘景',
    dynasty: '梁',
    realm: '山中宰相',
    ability: '儒释道三教合流',
    desc: '隐居茅山，朝廷大事辄咨询之',
    secret: '上清派实际开创者',
    color: COLORS.green,
    image: '🏔️',
  },
  {
    name: '吕洞宾',
    dynasty: '唐',
    realm: '纯阳真人',
    ability: '黄粱一梦，剑法通神',
    desc: '八仙之首，三醉岳阳楼度化世人',
    secret: '东华帝君转世，剑仙第一',
    color: COLORS.gold,
    image: '⚔️',
  },
  {
    name: '陈抟老祖',
    dynasty: '宋',
    realm: '睡仙',
    ability: '蛰龙功，一睡百年',
    desc: '华山弈棋赢宋太祖，高卧云台',
    secret: '与赵匡胤对局定大宋三百年气运',
    color: COLORS.blue,
    image: '💤',
  },
  {
    name: '张三丰',
    dynasty: '明',
    realm: '武当祖师',
    ability: '太极内家拳',
    desc: '武当开派，活了七百余岁',
    secret: '明初已达化神，至今仍在世间游戏',
    color: COLORS.cyan,
    image: '☯️',
  },
  {
    name: '张至顺',
    dynasty: '当代',
    realm: '陆地神仙',
    feat: '终南山隐修70年，留传炁体源流',
    secret: '清末最后一代全真龙门派真传，肉身成圣',
    image: '🧓',
  },
  {
    name: '南怀瑾先生',
    dynasty: '当代',
    realm: '大成就者',
    ability: '儒释道三教贯通',
    desc: '天下苍生为念，弘扬传统文化，接引无数后学',
    secret: '当世维摩诘，游戏人间度化有缘',
    color: COLORS.amber,
  },
  {
    name: '虚云老和尚',
    dynasty: '近代',
    realm: '禅宗泰斗',
    ability: '一身继五宗法脉',
    desc: '一百二十岁世寿，重振禅宗，度人无量',
    secret: '证得三昧，菩萨再来',
    color: COLORS.gray200,
  },
  {
    name: '来果禅师',
    dynasty: '近代',
    realm: '禅宗大德',
    ability: '参话头开悟',
    desc: '高旻寺方丈，禅门泰斗',
    secret: '七世比丘再来，度化僧俗无数',
    color: COLORS.gray600,
  },
  {
    name: '印光大师',
    dynasty: '近代',
    realm: '净土宗十三祖',
    ability: '大势至菩萨化身',
    desc: '弘扬净土，老实念佛',
    secret: '大势至菩萨分灵降世',
    color: COLORS.amber,
  },
  {
    name: '弘一大师',
    dynasty: '近代',
    realm: '律宗十一祖',
    ability: '才子成佛',
    desc: '半世风流半世僧，绚丽至极归于平淡',
    secret: '悲欣交集，见佛接引',
    color: COLORS.purple,
  },
]

const CAVE_HEAVEN = [
  {
    name: '昆仑山',
    location: '青海',
    tier: '十大洞天之首',
    desc: '万山之祖，西王母瑶池所在',
    secret: '当年阐教大本营，元始天尊道场',
    color: COLORS.purple,
  },
  {
    name: '崆峒山',
    location: '甘肃',
    tier: '十二福地',
    desc: '黄帝问道处，人皇帝师归隐地',
    secret: '人皇修仙起点，广成子道场',
    color: COLORS.amber,
  },
  {
    name: '终南山',
    location: '陕西',
    tier: '洞天之冠',
    desc: '老子讲经处，历代隐士云集',
    secret: '尹喜观紫气东来，得授道德经',
    color: COLORS.teal,
  },
  {
    name: '武当山',
    location: '湖北',
    tier: '太岳太和山',
    desc: '真武大帝道场，太极拳发源地',
    secret: '至今仍有隐世修士闭关',
    color: COLORS.cyan,
  },
  {
    name: '青城山',
    location: '四川',
    tier: '第五洞天',
    desc: '天师道发源地，青城天下幽',
    secret: '张道陵大战八部鬼帅处',
    color: COLORS.green,
  },
  {
    name: '龙虎山',
    location: '江西',
    tier: '三十二福地',
    desc: '历代天师道场，正一教祖庭',
    secret: '天师府下镇压着千年妖物',
    color: COLORS.red,
  },
  {
    name: '茅山',
    location: '江苏',
    tier: '第八洞天',
    desc: '上清派祖庭，画符驱邪圣地',
    secret: '真正的画符驱邪真法已失传',
    color: COLORS.blue,
  },
  {
    name: '峨眉山',
    location: '四川',
    tier: '第七洞天',
    desc: '普贤菩萨道场，峨眉天下秀',
    secret: '白娘子盗仙草处',
    color: COLORS.gold,
  },
  {
    name: '普陀山',
    location: '浙江',
    tier: '南海圣地',
    desc: '观音菩萨道场，海天佛国',
    secret: '紫竹林菩萨显圣处',
    color: COLORS.blue,
  },
  {
    name: '嵩山',
    location: '河南',
    tier: '中岳',
    desc: '少林寺祖庭，天下武功出少林',
    secret: '七十二绝技实为修真法门',
    color: COLORS.amber,
  },
]

const TYPE_COLORS: Record<string, string> = {
  gold: COLORS.gold,
  purple: COLORS.purple,
  red: COLORS.red,
  blue: COLORS.blue,
  cyan: COLORS.cyan,
  gray: COLORS.gray400,
}

export default function LiShiPage() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'people' | 'cave'>('timeline')
  const [unfoldedSecrets, setUnfoldedSecrets] = useState<Set<number>>(new Set())

  const toggleSecret = (idx: number) => {
    setUnfoldedSecrets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(idx)) {
        newSet.delete(idx)
      } else {
        newSet.add(idx)
      }
      return newSet
    })
  }

  const tabs = [
    { id: 'timeline', name: '📜 万古时间线', color: COLORS.gold },
    { id: 'people', name: '👤 修真名人录', color: COLORS.purple },
    { id: 'cave', name: '🗻 洞天福地', color: COLORS.cyan },
  ]

  return (
    <>
      <ParticleField type="stars" density={0.6} speed={0.3} />

      <SubPageTemplate
        title="末法秘史"
        subtitle="洪荒至今的历史真相，你所知道的只是冰山一角"
        colorRgb={COLORS.goldRgb}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: SPACING.lg,
            marginBottom: SPACING['4xl'],
            flexWrap: 'wrap',
          }}
        >
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: `${SPACING.md} ${SPACING.xl}`,
                borderRadius: RADIUS.full,
                background: activeTab === tab.id
                  ? alpha(tab.color, 0.2)
                  : alpha(COLORS.gray800, 0.3),
                border: `1px solid ${activeTab === tab.id
                  ? alpha(tab.color, 0.5)
                  : alpha(COLORS.gray600, 0.2)}`,
                color: activeTab === tab.id ? tab.color : COLORS.text.secondary,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {MOFA_TIMELINE.map((event, idx) => {
                const color = TYPE_COLORS[event.type]
                const isUnfolded = unfoldedSecrets.has(idx)

                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => toggleSecret(idx)}
                    style={{
                      display: 'flex',
                      gap: SPACING.xl,
                      paddingBottom: SPACING.xl,
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    {idx !== MOFA_TIMELINE.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: 15,
                        top: 40,
                        width: 2,
                        height: 'calc(100% - 10px)',
                        background: `linear-gradient(180deg, ${color}, transparent)`,
                        opacity: 0.3,
                      }} />
                    )}

                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: RADIUS.full,
                      background: color,
                      boxShadow: `0 0 20px ${alpha(color, 0.5)}`,
                      flexShrink: 0,
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 700,
                    }}>
                      {isUnfolded ? '🔓' : '🔒'}
                    </div>

                    <div style={{ flex: 1, paddingBottom: SPACING.lg }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: SPACING.lg,
                        flexWrap: 'wrap',
                        marginBottom: SPACING.sm,
                      }}>
                        <span style={{
                          fontSize: 13,
                          color,
                          fontWeight: 600,
                          fontFamily: 'monospace',
                        }}>
                          {event.year}
                        </span>
                        <span style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: COLORS.text.primary,
                        }}>
                          {event.title}
                        </span>
                      </div>

                      <div style={{
                        fontSize: 14,
                        color: COLORS.text.secondary,
                        marginBottom: SPACING.md,
                      }}>
                        {event.event}
                      </div>

                      <AnimatePresence>
                        {isUnfolded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{
                              padding: SPACING.lg,
                              borderRadius: RADIUS.md,
                              background: alpha(color, 0.08),
                              border: `1px solid ${alpha(color, 0.2)}`,
                              fontSize: 13,
                              color,
                              fontFamily: 'serif',
                            }}>
                              🔮 揭秘：{event.secret}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === 'people' && (
            <motion.div
              key="people"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: SPACING.xl,
              }}
            >
              {CULTIVATORS.map((person, idx) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{
                    padding: SPACING.xl,
                    borderRadius: RADIUS.xl,
                    background: `linear-gradient(135deg, ${alpha(COLORS.purple, 0.1)}, ${alpha(COLORS.bg.card, 1)})`,
                    border: `1px solid ${alpha(COLORS.purple, 0.2)}`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.lg,
                    marginBottom: SPACING.lg,
                  }}>
                    <div style={{
                      fontSize: 48,
                      filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))',
                    }}>
                      {person.image}
                    </div>
                    <div>
                      <div style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: COLORS.purple,
                      }}>
                        {person.name}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: COLORS.text.muted,
                      }}>
                        {person.dynasty} · {person.realm}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontSize: 13,
                    color: COLORS.gold,
                    marginBottom: SPACING.md,
                  }}>
                    ✨ {person.feat}
                  </div>

                  <div style={{
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    background: alpha(COLORS.purple, 0.08),
                    fontSize: 12,
                    color: COLORS.purple,
                  }}>
                    🔮 {person.secret}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'cave' && (
            <motion.div
              key="cave"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: SPACING.xl,
              }}
            >
              {CAVE_HEAVEN.map((place, idx) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  style={{
                    padding: SPACING.xl,
                    borderRadius: RADIUS.xl,
                    background: `linear-gradient(180deg, ${alpha(place.color, 0.15)}, ${alpha(COLORS.bg.card, 1)})`,
                    border: `1px solid ${alpha(place.color, 0.25)}`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: SPACING.lg,
                  }}>
                    <div>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: place.color,
                      }}>
                        🗻 {place.name}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: COLORS.text.muted,
                        marginTop: SPACING.xs,
                      }}>
                        📍 {place.location}
                      </div>
                    </div>
                    <span style={{
                      padding: `${SPACING.xs} ${SPACING.md}`,
                      borderRadius: RADIUS.full,
                      background: alpha(place.color, 0.15),
                      color: place.color,
                      fontSize: 11,
                    }}>
                      {place.tier}
                    </span>
                  </div>

                  <div style={{
                    fontSize: 14,
                    color: COLORS.text.secondary,
                    marginBottom: SPACING.lg,
                  }}>
                    {place.desc}
                  </div>

                  <div style={{
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    background: alpha(place.color, 0.08),
                    fontSize: 12,
                    color: place.color,
                  }}>
                    🔮 {place.secret}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ marginBottom: SPACING['4xl'], marginTop: SPACING['4xl'] }}
        >
          <h3 style={{
            fontSize: 20,
            color: COLORS.red,
            marginBottom: SPACING.xl,
          }}>
            👤 当代隐修传法者
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: SPACING.lg,
          }}>
            {[
              {
                name: '张至顺道长',
                cover: '黄中宫',
                realm: '陆地神仙',
                ability: '全真龙门派第二十一代',
                desc: '在世104年，毕生清修，留传八部金刚功、炁体源流',
                secret: '清末法脉最后传承人，当代丹道修为天花板',
                color: COLORS.red,
              },
              {
                name: '南怀瑾先生',
                cover: '太湖大学堂',
                realm: '大成就者',
                ability: '儒释道三教贯通',
                desc: '天下苍生为念，弘扬传统文化，接引无数后学',
                secret: '当世维摩诘，游戏人间度化有缘',
                color: COLORS.amber,
              },
              {
                name: '虚云老和尚',
                cover: '云居山',
                realm: '禅宗泰斗',
                ability: '一身继五宗法脉',
                desc: '一百二十岁世寿，重振禅宗，度人无量',
                secret: '证得三昧，菩萨再来',
                color: COLORS.gray200,
              },
            ].map((monk, idx) => (
              <motion.div
                key={monk.name}
                whileHover={{ scale: 1.03, y: -8 }}
                style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.xl,
                  background: `linear-gradient(180deg, ${alpha(monk.color, 0.12)}, ${alpha(COLORS.bg.card, 1)})`,
                  border: `1px solid ${alpha(monk.color, 0.2)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: 36,
                  marginBottom: SPACING.md,
                  filter: `drop-shadow(0 0 10px ${monk.color})`,
                }}>
                  {idx === 0 ? '🧓' : idx === 1 ? '👳' : '👴'}
                </div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: monk.color,
                  marginBottom: SPACING.xs,
                }}>
                  {monk.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.gold,
                  marginBottom: SPACING.md,
                }}>
                  🏔️ {monk.cover} · {monk.realm}
                </div>
                <div style={{
                  fontSize: 13,
                  color: COLORS.text.secondary,
                  marginBottom: SPACING.lg,
                  lineHeight: 1.7,
                }}>
                  {monk.desc}
                </div>
                <div style={{
                  padding: SPACING.md,
                  borderRadius: RADIUS.md,
                  background: alpha(monk.color, 0.08),
                  fontSize: 12,
                  color: monk.color,
                }}>
                  🔮 {monk.secret}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: SPACING['4xl'],
            padding: SPACING.xl,
            borderRadius: RADIUS.lg,
            background: alpha(COLORS.gold, 0.05),
            border: `1px solid ${alpha(COLORS.gold, 0.1)}`,
            textAlign: 'center',
          }}
        >
          <div style={{
            color: alpha(COLORS.gold, 0.7),
            fontSize: 15,
            lineHeight: 2,
            fontFamily: 'serif',
          }}>
            「上古之时，人神杂居，绝地天通之后，仙凡始隔。」
            <br />
            「时至今日，尚有洞天福地留存灵根，只待有缘人。」
          </div>
        </motion.div>
      </SubPageTemplate>
    </>
  )
}
