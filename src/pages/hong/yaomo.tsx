'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Demon {
  id: number
  name: string
  type: string
  tier: string
  power: number
  desc: string
  habitat: string
  weakness: string
  detail: string
  abilities: string[]
  legends: string[]
  victims: string[]
  relatedEvents: string[]
  icon: string
}

interface Ghost {
  id: number
  name: string
  type: string
  dangerLevel: string
  dangerValue: number
  desc: string
  appearance: string
  detail: string
  haunt: string
  exorcism: string[]
  manifestations: string[]
  stories: string[]
  color: string
  icon: string
}

const DEMONS: Demon[] = [
  {
    id: 1,
    name: '蚩尤',
    type: '魔神',
    tier: 'S',
    power: 99,
    desc: '上古魔神，铜头铁额，食沙石子。身兼八十一兄弟，创五兵，战黄帝于涿鹿之野。',
    habitat: '九黎部落',
    weakness: '天道正统',
    detail: '蚩尤，姜姓，炎帝后裔，九黎部落之主。他兄弟八十一人，并兽身人语，铜头铁额，食沙石子。蚩尤在庐山发现铜矿，冶炼青铜，制作五兵：戈、矛、戟、酋矛、夷矛，是为兵主。蚩尤作战勇猛，又有风伯雨师相助，九战九胜黄帝。黄帝被困三年，后来得到九天玄女传授兵法，制作指南车，才在涿鹿之战中击败蚩尤。蚩尤死后，天下复扰乱，黄帝遂画蚩尤形象以威天下，天下咸谓蚩尤不死，八方万邦皆为弭服。后世尊蚩尤为战神，行军打仗都要祭祀。',
    abilities: ['铜头铁额', '呼风唤雨', '制作五兵', '战神附体', '八十一兄弟'],
    legends: ['涿鹿之战', '九战九胜黄帝', '黄帝画蚩尤像威天下'],
    victims: ['无数炎黄部落士兵'],
    relatedEvents: ['炎黄蚩尤大战', '仓颉造字', '黄帝一统华夏'],
    icon: '⚔️'
  },
  {
    id: 2,
    name: '刑天',
    type: '战神',
    tier: 'S',
    power: 95,
    desc: '与帝争神，帝断其首，葬之常羊之山。乃以乳为目，以脐为口，操干戚以舞。',
    habitat: '常羊山',
    weakness: '无首之躯',
    detail: '刑天，上古巨人，与黄帝争神位。黄帝断其首，葬之于常羊之山。刑天失其首，以乳为目，以脐为口，操干戚以舞，永不屈服。陶渊明诗曰：「刑天舞干戚，猛志固常在。」刑天象征着永不屈服的战斗精神，即使失去头颅，也要战斗到底。刑天虽然失败了，但他的精神永存，成为后世无数英雄的榜样。他是真正的不败战神，因为他从未认输。',
    abilities: ['无首复生', '以乳为目', '以脐为口', '操干戚以舞', '永不屈服'],
    legends: ['与帝争神', '断首舞干戚', '常羊山之战'],
    victims: ['无数天兵天将'],
    relatedEvents: ['黄帝封神', '不周山大战', '绝地天通'],
    icon: '🪓'
  },
  {
    id: 3,
    name: '相柳',
    type: '蛇妖',
    tier: 'A',
    power: 88,
    desc: '共工之臣，九首蛇身，自环，食于九土。其所歍所尼，即为源泽，不辛乃苦，百兽莫能处。',
    habitat: '共工台',
    weakness: '大禹',
    detail: '相柳，亦作相繇，共工之臣。九首蛇身，自环，食于九山。其所歍所尼，即为源泽，其味辛且苦，百兽莫能处。禹湮洪水，杀相繇，其血腥臭，不可生谷，其地多水，不可居也。禹湮之，三仞三沮，乃以为池，群帝因是以为台。相柳之血，流毒天下，寸草不生。相柳虽死，余毒千年不绝。',
    abilities: ['九首蛇身', '毒血杀地', '所过成泽', '吞噬九山', '共工重臣'],
    legends: ['助共工为乱', '九首食九山', '禹杀相柳'],
    victims: ['九州生民', '无数山精野兽'],
    relatedEvents: ['共工触山', '大禹治水', '五帝定九州'],
    icon: '🐍'
  },
  {
    id: 4,
    name: '夸父',
    type: '巨人',
    tier: 'A',
    power: 85,
    desc: '夸父不量力，欲追日景，逮之于禺谷。将饮河而不足也，将走大泽，未至，死于此。',
    habitat: '成都载天山',
    weakness: '极度口渴',
    detail: '夸父，炎帝后裔，大荒之中，有山名曰成都载天。有人珥两黄蛇，把两黄蛇，名曰夸父。后土生信，信生夸父。夸父不量力，欲追日影，逐之于隅谷之际。渴欲得饮，赴饮河渭。河渭不足，将走北饮大泽。未至，道渴而死。弃其杖，尸膏肉所浸，生邓林。邓林弥广数千里焉。夸父逐日，虽死犹荣，其志可嘉。',
    abilities: ['逐日而行', '饮尽江河', '杖化邓林', '巨人之力', '奔走如飞'],
    legends: ['夸父逐日', '饮尽河渭', '杖化邓林千里'],
    victims: ['无（自身殒命）'],
    relatedEvents: ['十日并出', '后羿射日', '女娲补天'],
    icon: '☀️'
  },
  {
    id: 5,
    name: '精卫',
    type: '灵鸟',
    tier: 'B',
    power: 65,
    desc: '炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。',
    habitat: '东海',
    weakness: '大海之浩瀚',
    detail: '精卫，炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫。其状如乌，文首，白喙，赤足，名曰精卫，其鸣自詨。常衔西山之木石，以堙于东海。漳水出焉，东流注于河。精卫填海，微木亦可填沧海。虽然渺小，但意志坚定，千年不辍，万年不悔。这种精神，感动了无数后人。',
    abilities: ['衔木填海', '千年不辍', '灵魂不灭', '复仇意志', '永不放弃'],
    legends: ['女娃溺海', '化鸟填海', '微木填沧海'],
    victims: ['自身（女娃）'],
    relatedEvents: ['炎帝神农尝百草', '四海龙王治水', '人类与自然抗争'],
    icon: '🐦'
  },
  {
    id: 6,
    name: '魑魅魍魉',
    type: '山精',
    tier: 'C',
    power: 40,
    desc: '山泽之精，木石之怪。人面兽身，四足，好惑人。生于山阜，出于沟壑之间。',
    habitat: '山林沟壑',
    weakness: '桃木、雄黄、符咒',
    detail: '魑魅魍魉，山泽之精，木石之怪。人面兽身，四足，好惑人。生于山阜，出于沟壑之间，乘阴侮阳，含邪茹毒。夏鼎象物，而民知神奸，故民入川泽山林，不逢不若。螭魅罔两，莫能逢之。魑魅魍魉，虽非大恶，然扰人清梦，迷人道路，坏人心术，亦为害也。古人铸鼎象物，使民知神奸，故能避之。',
    abilities: ['迷惑人心', '幻化无形', '夜中作祟', '声音惑人', '制造幻觉'],
    legends: ['黄帝鼎象百物', '禹铸九鼎辨神奸', '桃木驱邪'],
    victims: ['迷路旅人', '夜行者'],
    relatedEvents: ['黄帝修道', '道教驱邪', '民间方术'],
    icon: '👻'
  },
  {
    id: 7,
    name: '饕餮',
    type: '凶兽',
    tier: 'A',
    power: 90,
    desc: '缙云氏有不才子，贪于饮食，冒于货贿，侵欲崇侈，不可盈厌。天下之民谓之饕餮。',
    habitat: '钩吾山',
    weakness: '暴食无度',
    detail: '饕餮，四凶之一。缙云氏有不才子，贪于饮食，冒于货贿，侵欲崇侈，不可盈厌，聚敛积实，不知纪极，不分孤寡，不恤穷匮。天下之民以比三凶，谓之饕餮。其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿。食入无度，最终食尽其身，故有首无身。饕餮象征着贪婪无度，欲壑难填。',
    abilities: ['吞噬万物', '暴食无度', '铜皮铁骨', '音如婴儿食人', '贪欲无限'],
    legends: ['四凶之一', '缙云氏不才子', '鼎纹饕餮戒贪'],
    victims: ['无数生灵魂魄', '自身身躯'],
    relatedEvents: ['舜流四凶', '三代鼎器纹饰', '戒贪文化'],
    icon: '🐺'
  },
  {
    id: 8,
    name: '穷奇',
    type: '凶兽',
    tier: 'A',
    power: 87,
    desc: '少皞氏有不才子，毁信废忠，崇饰恶言，靖谮庸回，服谗蒐慝，天下之民谓之穷奇。',
    habitat: '邽山',
    weakness: '正直之人',
    detail: '穷奇，四凶之一。少皞氏有不才子，毁信废忠，崇饰恶言，靖谮庸回，服谗蒐慝，以诬盛德，天下之民谓之穷奇。其状如牛，猬毛，音如獆狗，食人。穷奇见人斗则食其直者，闻人忠信则食其鼻，闻人恶逆不善则杀兽往馈之。穷奇象征着颠倒是非，助纣为虐。',
    abilities: ['颠倒是非', '助恶欺善', '飞翔天际', '知人善恶', '奖励奸邪'],
    legends: ['四凶之二', '少皞氏不才子', '食忠信者之鼻'],
    victims: ['正直忠信之士'],
    relatedEvents: ['舜流四凶', '善恶报应', '正邪之辨'],
    icon: '🐂'
  },
  {
    id: 9,
    name: '梼杌',
    type: '凶兽',
    tier: 'A',
    power: 85,
    desc: '颛顼氏有不才子，不可教训，不知话言，告之则顽，舍之则嚚，天下之民谓之梼杌。',
    habitat: '西方荒野',
    weakness: '智慧之道',
    detail: '梼杌，四凶之三。颛顼氏有不才子，不可教训，不知话言，告之则顽，舍之则嚚，傲狠明德，以乱天常，天下之民谓之梼杌。其状如虎而犬毛，长二尺，人面，虎足，猪口牙，尾长一丈八尺。搅乱荒中，名梼杌，一名傲狠，一名难训。梼杌象征着顽固不化，不可教训。',
    abilities: ['不可教训', '桀骜难驯', '勇猛无畏', '顽固不化', '扰乱荒野'],
    legends: ['四凶之三', '颛顼氏不才子', '西方荒中作恶'],
    victims: ['荒野旅人'],
    relatedEvents: ['舜流四凶', '投诸四裔以御魑魅', '顽劣之性难移'],
    icon: '🐯'
  },
  {
    id: 10,
    name: '浑沌',
    type: '凶兽',
    tier: 'A',
    power: 89,
    desc: '帝鸿氏有不才子，掩义隐贼，好行凶慝，天下之民谓之浑沌。',
    habitat: '天山',
    weakness: '开窍七窍（反致其死）',
    detail: '浑沌，四凶之四。帝鸿氏有不才子，掩义隐贼，好行凶慝，丑类恶物，顽嚚不友，是与比周，天下之民谓之浑沌。南海之帝为儵，北海之帝为忽，中央之帝为浑沌。儵与忽时相与遇于浑沌之地，浑沌待之甚善。儵与忽谋报浑沌之德，曰：「人皆有七窍以视听食息，此独无有，尝试凿之。」日凿一窍，七日而浑沌死。浑沌象征着自然无为，反被聪明误。',
    abilities: ['无窍浑然', '中央之帝', '无为而治', '善恶不分', '混沌一体'],
    legends: ['四凶之四', '帝鸿氏不才子', '七日凿窍而死'],
    victims: ['自身（被凿窍而死）'],
    relatedEvents: ['庄子寓言', '舜流四凶', '有为反害无为'],
    icon: '🌀'
  }
]

const GHOSTS: Ghost[] = [
  {
    id: 1,
    name: '缢鬼',
    type: '枉死鬼',
    dangerLevel: '高危',
    dangerValue: 80,
    desc: '自缢而死者，怨气凝结，常觅替死。以红绳为引，勾人魂魄。',
    appearance: '披头散发，舌长三尺，面色青紫，悬于梁间，手中执红绳一条。',
    detail: '缢鬼，自缢而死者，怨气凝结不散，常觅替死之人。其怨气重者，能化形现影，以红绳诱人情志迷乱，自寻短见。其轻者，亦能梦中扰人，使人意志消沉，郁郁寡欢。遇缢鬼者，当以桃木剑斩其绳，以雄黄洒其身，以符咒镇其魂，可解也。然最要者，人心光明，正气凛然，百邪不侵。',
    haunt: '古宅梁间，旧屋悬处，人迹罕至之地',
    exorcism: ['桃木剑斩断红绳', '雄黄洒驱邪', '金光神咒镇煞', '阳气盛者自避之'],
    manifestations: ['夜半闻叹息声', '屋梁见黑影晃动', '无端情绪低落欲轻生', '见红衣女子悬于梁'],
    stories: ['聊斋志异·聂小倩', '子不语·缢鬼觅替', '阅微草堂笔记·旧宅厉鬼'],
    color: '#7f1d1d',
    icon: '🪢'
  },
  {
    id: 2,
    name: '水鬼',
    type: '枉死鬼',
    dangerLevel: '高危',
    dangerValue: 85,
    desc: '溺水而死者，沉于水底，待替死方得超生。善幻形诱人入水。',
    appearance: '周身湿冷，皮肤青肿，十指带泥，眼中流血泪，笑声如裂帛。',
    detail: '水鬼，溺水而死者，沉于江河湖底，怨气凝结不散，非觅得替死之人，不得超生。水鬼善幻形，或为美艳女子，或为迷路孩童，或为金银宝物，诱人近水，然后拖入水底，取替其命。水中阴气重，生人阳气弱，遇之多凶。遇水鬼者，当速离水边，不可回顾，可呼万岁名号，阳气盛者，鬼不敢近。',
    haunt: '江河湖海，深潭暗井，水深处',
    exorcism: ['离水勿回顾', '呼天地君亲师', '黑狗血洒水面', '城隍庙告阴状'],
    manifestations: ['水中见人影立而不沉', '无故闻孩童啼哭声', '水边觉阴风阵阵', '鞋履莫名落水中'],
    stories: ['搜神记·落水替死', '太平广记·河伯娶妇', '子不语·水鬼托生'],
    color: '#0369a1',
    icon: '💧'
  },
  {
    id: 3,
    name: '狐仙',
    type: '精怪',
    dangerLevel: '中性',
    dangerValue: 50,
    desc: '狐修炼千年，化为人形，通人情，晓世事，亦正亦邪。',
    appearance: '或为美艳女子，或为白衣书生，眉宇间有狐媚气，尾骨处常留尾尖。',
    detail: '狐仙，狐狸修炼千年，得天地灵气，化为人形。狐仙善变化，通人情，晓世事，亦正亦邪。其善者，能为人治病，能预知吉凶，能守家护宅；其恶者，能迷人魂魄，能盗取精气，能惑乱人心。狐仙最重恩义，人有恩于狐，狐必报之；人有害于狐，狐亦报之。遇狐仙者，待之以礼，敬而远之，可也。',
    haunt: '古冢荒坟，破庙废寺，深山大泽',
    exorcism: ['待之以礼勿得罪', '黑狗血可破其形', '龙虎山天师符', '正心诚意鬼神钦'],
    manifestations: ['夜半闻女子笑语', '室内有狐臊味', '食物莫名减少', '梦寐中与美人交接'],
    stories: ['聊斋志异·婴宁', '阅微草堂笔记·狐友', '太平广记·狐神'],
    color: '#f97316',
    icon: '🦊'
  },
  {
    id: 4,
    name: '厉鬼',
    type: '恶鬼',
    dangerLevel: '极危',
    dangerValue: 95,
    desc: '横死暴亡，怨气冲天之鬼。杀人害命，无恶不作。',
    appearance: '七窍流血，身形扭曲，面目狰狞，指甲长三寸，带生人血腥气。',
    detail: '厉鬼，横死暴亡，怨气冲天之鬼。其人或遭冤杀，或遇惨祸，含恨而死，怨气不散，化为厉鬼。厉鬼杀人害命，无恶不作，遇之者九死一生。厉鬼之所畏者，道经也，佛像也，大德高僧也，正气浩然之士也。普通符咒，不能治也。遇厉鬼者，当速逃，不可与之敌，然后请高僧大德，作法超度，解其怨结，方得安宁。',
    haunt: '凶宅禁地，杀人流血之地，极阴之处',
    exorcism: ['高僧大德作法超度', '道经千卷镇宅', '佛像开光供奉', '正气浩然之士可敌'],
    manifestations: ['无端闻血腥气', '门窗自行开阖', '夜间见血字于墙', '家人接连暴病身亡'],
    stories: ['搜神记·宋大贤杀鬼', '太平广记·京师凶宅', '聊斋志异·画皮'],
    color: '#dc2626',
    icon: '👹'
  }
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'S': return { color: '#ef4444', name: '灭世级' }
    case 'A': return { color: '#f97316', name: '灾难级' }
    case 'B': return { color: '#eab308', name: '危险级' }
    case 'C': return { color: '#6b7280', name: '普通级' }
    default: return { color: '#6b7280', name: '普通级' }
  }
}

export default function YaomoPage() {
  const [filteredDemons, setFilteredDemons] = useState(DEMONS)
  const [expandedDemon, setExpandedDemon] = useState<number | null>(null)
  const [filteredGhosts, setFilteredGhosts] = useState(GHOSTS)
  const [expandedGhost, setExpandedGhost] = useState<number | null>(null)

  const handleDemonFilter = useCallback((data: typeof DEMONS) => {
    setFilteredDemons(data)
  }, [])

  const handleGhostFilter = useCallback((data: typeof GHOSTS) => {
    setFilteredGhosts(data)
  }, [])

  const demonFilters = {
    searchKeys: ['name', 'type', 'desc', 'habitat', 'weakness', 'detail', 'abilities', 'legends'],
    filterKeys: {
      tier: [...new Set(DEMONS.map(d => d.tier))],
      type: [...new Set(DEMONS.map(d => d.type))],
    },
    sortOptions: [
      { key: 'power', label: '实力排序' },
      { key: 'name', label: '妖魔名称' },
    ],
  }

  const ghostFilters = {
    searchKeys: ['name', 'type', 'desc', 'appearance', 'haunt', 'detail', 'manifestations'],
    filterKeys: {
      dangerLevel: [...new Set(GHOSTS.map(g => g.dangerLevel))],
      type: [...new Set(GHOSTS.map(g => g.type))],
    },
    sortOptions: [
      { key: 'dangerValue', label: '危险度排序' },
      { key: 'name', label: '鬼魅名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="妖魔鬼怪"
      subtitle="魑魅魍魉 · 山精水怪 · 上古魔神 · 六道众生"
      icon="👹"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="四凶出世">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {DEMONS.slice(6, 10).map((demon, i) => (
              <motion.div
                key={demon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '14px',
                    background: getTierColor(demon.tier).color,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.25rem',
                    boxShadow: `0 0 30px ${getTierColor(demon.tier).color}66`
                  }}
                >
                  {demon.icon}
                </motion.div>
                <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: getTierColor(demon.tier).color }}>{demon.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)' }}>{demon.type} · {getTierColor(demon.tier).name}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="上古妖魔">
        <FilterBar
          data={DEMONS}
          onFiltered={handleDemonFilter}
          options={demonFilters}
          placeholder="搜索妖魔名称、类型、能力、传说..."
        />
        
        <div style={{ marginTop: '1.5rem' }}>
          <AnimatePresence>
            {filteredDemons.map((demon) => (
              <motion.div key={demon.id} layout style={{ marginBottom: '1rem' }}>
                <InfoCard
                  title={demon.name}
                  subtitle={`${demon.type} · ${getTierColor(demon.tier).name} · 栖息于${demon.habitat}`}
                  glowColor={getTierColor(demon.tier).color.replace('#', '')}
                  glowIntensity={demon.power >= 90 ? 90 : 60}
                  onClick={() => setExpandedDemon(expandedDemon === demon.id ? null : demon.id)}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem', alignItems: 'start' }}>
                    <motion.div
                      animate={demon.tier === 'S' ? {
                        scale: [1, 1.15, 1],
                        boxShadow: [`0 0 15px ${getTierColor(demon.tier).color}00`, `0 0 40px ${getTierColor(demon.tier).color}`, `0 0 15px ${getTierColor(demon.tier).color}00`]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '10px',
                        background: getTierColor(demon.tier).color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.75rem'
                      }}
                    >
                      {demon.icon}
                    </motion.div>
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>妖力指数</div>
                          <ProgressBar value={demon.power} color={getTierColor(demon.tier).color} height={6} />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.9)' }}>
                          弱点：{demon.weakness}
                        </div>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: 0 }}>
                        {demon.desc}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedDemon === demon.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${getTierColor(demon.tier).color}33`,
                          marginTop: '1rem',
                          paddingTop: '1rem'
                        }}>
                          <p style={{ 
                            color: 'rgba(180, 180, 190, 0.9)', 
                            fontSize: '0.9rem',
                            lineHeight: 1.8,
                            marginBottom: '1rem',
                            textIndent: '2em'
                          }}>
                            {demon.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: getTierColor(demon.tier).color, fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                ⚡ 妖魔能力
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {demon.abilities.map((a, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: `${getTierColor(demon.tier).color}20`,
                                    color: getTierColor(demon.tier).color
                                  }}>
                                    {a}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📖 相关传说
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {demon.legends.map((l, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(184, 148, 56, 0.15)',
                                    color: '#b89438'
                                  }}>
                                    {l}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '0.75rem',
                    color: `${getTierColor(demon.tier).color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedDemon === demon.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </div>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="鬼魅精怪">
        <FilterBar
          data={GHOSTS}
          onFiltered={handleGhostFilter}
          options={ghostFilters}
          placeholder="搜索鬼魅名称、作祟方式、出没地点..."
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <AnimatePresence>
            {filteredGhosts.map((ghost) => (
              <motion.div key={ghost.id} layout>
                <InfoCard
                  title={ghost.name}
                  subtitle={`${ghost.type} · ${ghost.dangerLevel}`}
                  glowColor={ghost.color.replace('#', '')}
                  glowIntensity={ghost.dangerValue >= 90 ? 90 : 60}
                  onClick={() => setExpandedGhost(expandedGhost === ghost.id ? null : ghost.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <motion.div
                      animate={{
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '10px',
                        background: ghost.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.75rem',
                        flexShrink: 0
                      }}
                    >
                      {ghost.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '12px', 
                          fontSize: '0.75rem',
                          background: ghost.color,
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {ghost.dangerLevel}
                        </span>
                        <div style={{ flex: 1, marginLeft: '1rem' }}>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>危险度</div>
                          <ProgressBar value={ghost.dangerValue} color={ghost.color} height={6} />
                        </div>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                        {ghost.desc}
                      </p>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                        📍 出没：{ghost.haunt}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedGhost === ghost.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${ghost.color}33`,
                          marginTop: '1rem',
                          paddingTop: '1rem'
                        }}>
                          <p style={{ 
                            color: 'rgba(180, 180, 190, 0.9)', 
                            fontSize: '0.9rem',
                            lineHeight: 1.8,
                            marginBottom: '1rem',
                            textIndent: '2em'
                          }}>
                            {ghost.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: ghost.color, fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                👻 作祟征兆
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {ghost.manifestations.map((m, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: `${ghost.color}20`,
                                    color: ghost.color
                                  }}>
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                ✝️ 驱邪之法
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {ghost.exorcism.map((e, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {e}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '0.75rem',
                    color: `${ghost.color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedGhost === ghost.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </div>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
