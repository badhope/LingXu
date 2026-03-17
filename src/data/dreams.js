export const dreamCategories = [
  { id: 'nature', name: '自然景象', icon: '🌌' },
  { id: 'animals', name: '动物', icon: '🐉' },
  { id: 'people', name: '人物', icon: '👥' },
  { id: 'objects', name: '物品', icon: '🏺' },
  { id: 'actions', name: '行为', icon: '🎯' },
  { id: 'body', name: '身体', icon: '🫀' },
  { id: 'buildings', name: '建筑场所', icon: '🏛️' },
  { id: 'emotions', name: '情感体验', icon: '💫' }
]

export const dreamData = [
  {
    id: 1,
    category: 'nature',
    keywords: ['太阳', '日出', '阳光'],
    title: '梦见太阳',
    content: '梦见太阳，大吉之兆。',
    interpretation: '太阳象征光明、希望、权力和活力。梦见太阳通常预示着好运将至，事业蒸蒸日上，前途光明。',
    meanings: [
      { condition: '梦见旭日东升', meaning: '预示着新的开始，事业将有新的机遇和发展' },
      { condition: '梦见烈日当空', meaning: '表示精力充沛，但要注意避免过于冲动' },
      { condition: '梦见日落西山', meaning: '可能暗示某件事情即将结束，需要做好收尾工作' },
      { condition: '梦见被阳光照耀', meaning: '贵人相助，将得到他人的支持和帮助' }
    ],
    advice: '把握机遇，积极进取，但也要注意劳逸结合。'
  },
  {
    id: 2,
    category: 'nature',
    keywords: ['月亮', '月光'],
    title: '梦见月亮',
    content: '梦见月亮，阴柔之美，主感情之事。',
    interpretation: '月亮代表阴柔、感情、直觉和潜意识。梦见月亮多与情感、家庭、女性相关。',
    meanings: [
      { condition: '梦见满月', meaning: '家庭和睦，感情圆满，事业顺遂' },
      { condition: '梦见新月', meaning: '新的开始，适合开展新计划' },
      { condition: '梦见月食', meaning: '可能会遇到一些小挫折，但很快就会过去' },
      { condition: '梦见水中月', meaning: '虚幻不实，要警惕欺骗和幻觉' }
    ],
    advice: '关注内心感受，处理好人际关系，特别是与家人和爱人的关系。'
  },
  {
    id: 3,
    category: 'nature',
    keywords: ['水', '河流', '大海', '湖泊'],
    title: '梦见水',
    content: '水主财，梦见水多为财运之兆。',
    interpretation: '水在梦中象征财富、情感、生命力和潜意识。水的状态不同，寓意也有所不同。',
    meanings: [
      { condition: '梦见清澈的水', meaning: '财运亨通，心情愉悦，生活顺心' },
      { condition: '梦见浑浊的水', meaning: '可能会遇到一些麻烦或困扰，需要谨慎处理' },
      { condition: '梦见大水滔天', meaning: '事业有大发展，但也要防范风险' },
      { condition: '梦见在水中游泳', meaning: '能够驾驭局面，事业顺利' },
      { condition: '梦见溺水', meaning: '感到压力过大，需要适当放松' }
    ],
    advice: '水能载舟亦能覆舟，把握机遇的同时也要注意风险防范。'
  },
  {
    id: 4,
    category: 'nature',
    keywords: ['火', '火焰', '燃烧'],
    title: '梦见火',
    content: '火主兴旺，亦主灾祸，需看具体情况。',
    interpretation: '火象征热情、能量、变革和净化。梦见火可能是好兆头，也可能预示危险。',
    meanings: [
      { condition: '梦见炉火旺盛', meaning: '家庭兴旺，事业红火，财运亨通' },
      { condition: '梦见大火燃烧', meaning: '可能会有大的变动或转折' },
      { condition: '梦见火灾', meaning: '要小心意外事故，注意安全' },
      { condition: '梦见点火', meaning: '新的开始，主动出击会有收获' },
      { condition: '梦见火被扑灭', meaning: '困难将被克服，危机解除' }
    ],
    advice: '火可以温暖人心，也可能造成伤害，关键在于如何驾驭。'
  },
  {
    id: 5,
    category: 'nature',
    keywords: ['山', '高山', '爬山'],
    title: '梦见山',
    content: '山主阻碍，亦主成就，登高望远。',
    interpretation: '山象征困难、目标、成就和稳定。梦见山通常与事业发展、人生目标相关。',
    meanings: [
      { condition: '梦见攀登高山', meaning: '正在努力克服困难，最终会取得成功' },
      { condition: '梦见站在山顶', meaning: '事业有成，达到人生高峰' },
      { condition: '梦见山崩', meaning: '可能会遇到重大变故，需要做好心理准备' },
      { condition: '梦见山中迷路', meaning: '人生方向迷茫，需要重新审视目标' }
    ],
    advice: '山高人为峰，只要坚持不懈，终能登顶。'
  },
  {
    id: 6,
    category: 'animals',
    keywords: ['龙', '神龙'],
    title: '梦见龙',
    content: '龙为神物，梦见龙大吉大利。',
    interpretation: '龙是中国传统文化中的吉祥象征，代表权力、尊贵、成功和好运。',
    meanings: [
      { condition: '梦见龙飞在天', meaning: '事业腾飞，前途无量' },
      { condition: '梦见龙入水中', meaning: '财运亨通，事业顺利' },
      { condition: '梦见骑龙', meaning: '将获得高位，掌握大权' },
      { condition: '梦见龙吐珠', meaning: '有意外之财，或得到珍贵之物' },
      { condition: '梦见双龙戏珠', meaning: '好事成双，喜事临门' }
    ],
    advice: '龙腾虎跃之时，正是大展宏图之日。'
  },
  {
    id: 7,
    category: 'animals',
    keywords: ['蛇', '大蛇', '小蛇'],
    title: '梦见蛇',
    content: '蛇主变化，亦主是非，需谨慎对待。',
    interpretation: '蛇在梦中有多重含义，可能代表变化、智慧、诱惑或小人。',
    meanings: [
      { condition: '梦见蛇缠身', meaning: '可能会遇到麻烦或有小人作祟' },
      { condition: '梦见蛇入家门', meaning: '财运将至，或家中将有喜事' },
      { condition: '梦见杀蛇', meaning: '能够战胜困难，克服障碍' },
      { condition: '梦见被蛇咬', meaning: '要小心健康问题或他人的伤害' },
      { condition: '梦见蛇蜕皮', meaning: '将会有新的变化和转机' }
    ],
    advice: '蛇性难测，遇事多留心眼，防人之心不可无。'
  },
  {
    id: 8,
    category: 'animals',
    keywords: ['狗', '小狗', '犬'],
    title: '梦见狗',
    content: '狗主忠诚，梦见狗多为吉兆。',
    interpretation: '狗象征忠诚、友谊、保护和警觉。梦见狗通常与人际关系相关。',
    meanings: [
      { condition: '梦见狗朝自己走来', meaning: '将有贵人相助，或结识新朋友' },
      { condition: '梦见狗叫', meaning: '可能会有不好的消息，要提高警惕' },
      { condition: '梦见狗咬', meaning: '要小心与朋友或同事的矛盾' },
      { condition: '梦见养狗', meaning: '家庭和睦，朋友忠诚' },
      { condition: '梦见狗死了', meaning: '可能会失去一个朋友，或友情出现裂痕' }
    ],
    advice: '善待朋友，珍惜情谊，但也要明辨是非。'
  },
  {
    id: 9,
    category: 'animals',
    keywords: ['猫', '小猫'],
    title: '梦见猫',
    content: '猫主灵性，亦主是非，吉凶参半。',
    interpretation: '猫象征灵性、独立、神秘和女性。梦见猫的含义因情况而异。',
    meanings: [
      { condition: '梦见温顺的猫', meaning: '会有好的桃花运，或与女性相处融洽' },
      { condition: '梦见猫叫', meaning: '可能会有是非口舌，要谨言慎行' },
      { condition: '梦见猫抓', meaning: '要小心小人的暗算或流言蜚语' },
      { condition: '梦见黑猫', meaning: '可能会有意外发生，要提高警觉' },
      { condition: '梦见白猫', meaning: '好运将至，可能会有意外收获' }
    ],
    advice: '猫性难驯，处事要圆滑，不要轻易得罪人。'
  },
  {
    id: 10,
    category: 'animals',
    keywords: ['鱼', '金鱼', '鲤鱼'],
    title: '梦见鱼',
    content: '鱼主财，梦见鱼多为财运之兆。',
    interpretation: '鱼与"余"谐音，象征富足、丰收和好运。梦见鱼通常与财运相关。',
    meanings: [
      { condition: '梦见活鱼', meaning: '财运亨通，事业顺利' },
      { condition: '梦见死鱼', meaning: '财运不佳，要小心投资' },
      { condition: '梦见抓鱼', meaning: '通过努力将获得财富' },
      { condition: '梦见鱼跃龙门', meaning: '事业腾飞，功成名就' },
      { condition: '梦见很多鱼', meaning: '大富大贵，财源广进' }
    ],
    advice: '年年有余，把握机会，财富自来。'
  },
  {
    id: 11,
    category: 'animals',
    keywords: ['鸟', '飞鸟', '鸟儿'],
    title: '梦见鸟',
    content: '鸟主消息，亦主自由，吉凶看鸟之种类。',
    interpretation: '鸟象征自由、消息、灵性和希望。不同种类的鸟有不同的寓意。',
    meanings: [
      { condition: '梦见鸟儿飞翔', meaning: '事业顺利，自由自在' },
      { condition: '梦见鸟儿歌唱', meaning: '好消息将至，心情愉悦' },
      { condition: '梦见鸟儿入怀', meaning: '桃花运旺，或有喜事临门' },
      { condition: '梦见凤凰', meaning: '大吉大利，飞黄腾达' },
      { condition: '梦见乌鸦', meaning: '可能会有不好的消息，要提高警惕' }
    ],
    advice: '鸟语花香，人生美好，保持乐观心态。'
  },
  {
    id: 12,
    category: 'animals',
    keywords: ['虎', '老虎', '猛虎'],
    title: '梦见老虎',
    content: '虎主威严，亦主危险，需谨慎应对。',
    interpretation: '老虎象征力量、威严、危险和挑战。梦见老虎可能预示困难或机遇。',
    meanings: [
      { condition: '梦见老虎朝自己走来', meaning: '将面临挑战，但也有机遇' },
      { condition: '梦见被老虎追', meaning: '压力很大，需要寻找解决办法' },
      { condition: '梦见骑虎', meaning: '能够驾驭困难，事业有成' },
      { condition: '梦见虎啸山林', meaning: '声名远扬，事业有成' },
      { condition: '梦见打死老虎', meaning: '能够战胜强敌，克服困难' }
    ],
    advice: '虎口拔牙需要勇气和智慧，遇事要冷静应对。'
  },
  {
    id: 13,
    category: 'people',
    keywords: ['死人', '去世的人', '亡者'],
    title: '梦见死人',
    content: '梦见死人，不必惊恐，多为吉兆。',
    interpretation: '梦见已故之人，可能是思念所致，也可能有特殊寓意。',
    meanings: [
      { condition: '梦见已故亲人', meaning: '可能是思念所致，也可能是有事相告' },
      { condition: '梦见死人复活', meaning: '失去的东西可能会失而复得' },
      { condition: '梦见死人说话', meaning: '要注意倾听他人的建议' },
      { condition: '梦见自己死了', meaning: '旧的生活即将结束，新的生活即将开始' },
      { condition: '梦见棺材', meaning: '升官发财之兆' }
    ],
    advice: '生死有命，富贵在天，珍惜当下，善待身边人。'
  },
  {
    id: 14,
    category: 'people',
    keywords: ['结婚', '婚礼', '新娘', '新郎'],
    title: '梦见结婚',
    content: '梦见结婚，喜庆之兆，但也要看具体情况。',
    interpretation: '结婚象征新的开始、承诺和责任。梦见结婚的含义因人而异。',
    meanings: [
      { condition: '梦见自己结婚', meaning: '可能真的要结婚，或事业将有新进展' },
      { condition: '梦见参加婚礼', meaning: '人际关系良好，社交活动增多' },
      { condition: '梦见婚礼取消', meaning: '计划可能会改变，要做好准备' },
      { condition: '已婚者梦见结婚', meaning: '感情生活需要注入新的活力' },
      { condition: '梦见与陌生人结婚', meaning: '可能会有新的机遇或合作' }
    ],
    advice: '婚姻大事，需要慎重考虑，不要冲动行事。'
  },
  {
    id: 15,
    category: 'people',
    keywords: ['怀孕', '孕妇', '生孩子'],
    title: '梦见怀孕',
    content: '梦见怀孕，多为新生事物之兆。',
    interpretation: '怀孕象征新生、创造和希望。梦见怀孕通常与新的计划或项目相关。',
    meanings: [
      { condition: '女性梦见怀孕', meaning: '可能真的怀孕，或有新的计划' },
      { condition: '男性梦见怀孕', meaning: '事业上有新的项目或创意' },
      { condition: '梦见生孩子', meaning: '新的开始，新的希望' },
      { condition: '梦见难产', meaning: '计划实施过程中会遇到困难' },
      { condition: '梦见双胞胎', meaning: '好事成双，收获加倍' }
    ],
    advice: '新生命意味着新希望，好好规划和培养。'
  },
  {
    id: 16,
    category: 'people',
    keywords: ['吵架', '争吵', '打架'],
    title: '梦见吵架',
    content: '梦见吵架，人际关系需注意。',
    interpretation: '吵架象征冲突、压力和不满。梦见吵架可能反映内心的矛盾。',
    meanings: [
      { condition: '梦见与家人吵架', meaning: '家庭关系需要改善，多沟通' },
      { condition: '梦见与朋友吵架', meaning: '友情可能出现问题，需要维护' },
      { condition: '梦见与陌生人吵架', meaning: '可能会遇到小人，要提高警惕' },
      { condition: '梦见看别人吵架', meaning: '可能会被卷入是非之中' },
      { condition: '梦见吵架后和好', meaning: '矛盾将得到解决，关系更融洽' }
    ],
    advice: '和气生财，遇事多忍让，退一步海阔天空。'
  },
  {
    id: 17,
    category: 'objects',
    keywords: ['钱', '金钱', '钞票', '硬币'],
    title: '梦见钱',
    content: '梦见钱，财运之兆，但也要看具体情况。',
    interpretation: '钱象征财富、价值和能力。梦见钱的含义因情况而异。',
    meanings: [
      { condition: '梦见捡钱', meaning: '意外之财，或得到意外收获' },
      { condition: '梦见丢钱', meaning: '要小心财务损失，或失去某些机会' },
      { condition: '梦见数钱', meaning: '财运亨通，收入增加' },
      { condition: '梦见借钱', meaning: '可能需要他人的帮助，或财务紧张' },
      { condition: '梦见很多钱', meaning: '大富大贵之兆，但也要注意防范' }
    ],
    advice: '钱财乃身外之物，取之有道，用之有度。'
  },
  {
    id: 18,
    category: 'objects',
    keywords: ['车', '汽车', '开车', '坐车'],
    title: '梦见车',
    content: '车主行进，梦见车多与事业相关。',
    interpretation: '车象征前进、控制和人生方向。梦见车通常与事业发展相关。',
    meanings: [
      { condition: '梦见开车', meaning: '能够掌控自己的人生方向' },
      { condition: '梦见坐车', meaning: '依赖他人，或跟随他人的脚步' },
      { condition: '梦见车祸', meaning: '可能会遇到挫折，要提高警惕' },
      { condition: '梦见买车', meaning: '事业将有新的发展，或地位提升' },
      { condition: '梦见车坏了', meaning: '计划受阻，需要调整方向' }
    ],
    advice: '人生如行车，方向要正确，速度要适中。'
  },
  {
    id: 19,
    category: 'objects',
    keywords: ['房子', '房屋', '新房子'],
    title: '梦见房子',
    content: '房主安身，梦见房子多与家庭相关。',
    interpretation: '房子象征安全、家庭和自我。梦见房子通常与家庭生活相关。',
    meanings: [
      { condition: '梦见新房', meaning: '新的开始，或家庭将有喜事' },
      { condition: '梦见老房子', meaning: '怀念过去，或需要处理旧事' },
      { condition: '梦见房子倒塌', meaning: '家庭可能出现变故，要多关心家人' },
      { condition: '梦见装修房子', meaning: '生活将有改善，或需要调整心态' },
      { condition: '梦见大房子', meaning: '事业有成，家庭富裕' }
    ],
    advice: '家是港湾，要好好经营家庭关系。'
  },
  {
    id: 20,
    category: 'objects',
    keywords: ['书', '书本', '读书'],
    title: '梦见书',
    content: '书主智慧，梦见书多为学业事业之兆。',
    interpretation: '书象征知识、智慧和成长。梦见书通常与学习和事业相关。',
    meanings: [
      { condition: '梦见读书', meaning: '学业进步，或事业有新突破' },
      { condition: '梦见买书', meaning: '求知欲强，或需要学习新知识' },
      { condition: '梦见写书', meaning: '有创意想法，或想要表达自己' },
      { condition: '梦见撕书', meaning: '对现状不满，或想要改变' },
      { condition: '梦见很多书', meaning: '知识渊博，或面临选择' }
    ],
    advice: '开卷有益，活到老学到老。'
  },
  {
    id: 21,
    category: 'actions',
    keywords: ['飞', '飞翔', '飞行'],
    title: '梦见飞翔',
    content: '梦见飞翔，自由之兆，事业腾飞。',
    interpretation: '飞翔象征自由、超越和成功。梦见飞翔通常是好兆头。',
    meanings: [
      { condition: '梦见自由飞翔', meaning: '心胸开阔，事业顺利' },
      { condition: '梦见飞得很高', meaning: '志向高远，将有大成就' },
      { condition: '梦见飞不起来', meaning: '受到束缚，或能力不足' },
      { condition: '梦见从空中坠落', meaning: '可能会遇到挫折，或失去某些东西' },
      { condition: '梦见和别人一起飞', meaning: '团队合作，共同进步' }
    ],
    advice: '天高任鸟飞，但也要脚踏实地。'
  },
  {
    id: 22,
    category: 'actions',
    keywords: ['跑', '奔跑', '跑步'],
    title: '梦见奔跑',
    content: '奔跑主进取，亦主逃避，需看具体情况。',
    interpretation: '奔跑象征追求、逃避或压力。梦见奔跑的含义因情况而异。',
    meanings: [
      { condition: '梦见快乐奔跑', meaning: '积极向上，事业顺利' },
      { condition: '梦见被人追着跑', meaning: '压力很大，或有逃避心理' },
      { condition: '梦见跑不动', meaning: '能力不足，或遇到阻碍' },
      { condition: '梦见赛跑', meaning: '竞争激烈，需要努力' },
      { condition: '梦见跑到终点', meaning: '目标即将实现，坚持就是胜利' }
    ],
    advice: '人生是一场马拉松，不在于速度，而在于坚持。'
  },
  {
    id: 23,
    category: 'actions',
    keywords: ['哭', '哭泣', '流泪'],
    title: '梦见哭泣',
    content: '梦见哭泣，宣泄情感，未必是坏事。',
    interpretation: '哭泣象征情感释放、压力和悲伤。梦见哭泣有时反而是好兆头。',
    meanings: [
      { condition: '梦见自己哭泣', meaning: '压力得到释放，或将有好事' },
      { condition: '梦见别人哭泣', meaning: '可能要安慰他人，或有人需要帮助' },
      { condition: '梦见痛哭流涕', meaning: '情感压抑太久，需要释放' },
      { condition: '梦见哭后笑了', meaning: '苦尽甘来，坏事变好事' },
      { condition: '梦见喜极而泣', meaning: '好事将近，心想事成' }
    ],
    advice: '哭泣是情感的宣泄，哭过之后要继续前行。'
  },
  {
    id: 24,
    category: 'actions',
    keywords: ['考试', '考试迟到', '考试不会'],
    title: '梦见考试',
    content: '梦见考试，压力之兆，或面临考验。',
    interpretation: '考试象征考验、压力和自我评估。梦见考试通常反映内心的焦虑。',
    meanings: [
      { condition: '梦见考试顺利', meaning: '自信满满，能够应对挑战' },
      { condition: '梦见考试迟到', meaning: '担心错过机会，或准备不足' },
      { condition: '梦见考试不会做', meaning: '对自己能力不自信，或需要学习' },
      { condition: '梦见考试不及格', meaning: '担心失败，或需要更加努力' },
      { condition: '梦见考试第一名', meaning: '努力将得到回报，或自信心增强' }
    ],
    advice: '人生处处是考场，做好准备，从容应对。'
  },
  {
    id: 25,
    category: 'body',
    keywords: ['牙齿', '掉牙', '牙齿掉了'],
    title: '梦见掉牙',
    content: '梦见掉牙，常见之梦，寓意复杂。',
    interpretation: '掉牙是常见的梦境，象征变化、成长、健康或人际关系。',
    meanings: [
      { condition: '梦见牙齿自然脱落', meaning: '成长和变化，旧的过去新的开始' },
      { condition: '梦见牙齿被敲掉', meaning: '可能会受到伤害或损失' },
      { condition: '梦见牙齿松动', meaning: '根基不稳，或健康需要关注' },
      { condition: '梦见满口牙掉光', meaning: '担心失去能力或地位' },
      { condition: '梦见长出新牙', meaning: '新生和成长，好事将至' }
    ],
    advice: '牙齿代表形象和能力，要注意维护自己的形象和能力。'
  },
  {
    id: 26,
    category: 'body',
    keywords: ['头发', '掉头发', '剪头发'],
    title: '梦见头发',
    content: '发主烦恼，亦主智慧，梦见头发变化多。',
    interpretation: '头发象征烦恼、智慧和生命力。头发的状态反映身心状态。',
    meanings: [
      { condition: '梦见长发', meaning: '烦恼增多，或智慧增长' },
      { condition: '梦见掉头发', meaning: '烦恼减少，或担心失去' },
      { condition: '梦见剪头发', meaning: '告别过去，或想要改变形象' },
      { condition: '梦见白头发', meaning: '智慧增长，或担心衰老' },
      { condition: '梦见秃头', meaning: '担心失去，或想要简化生活' }
    ],
    advice: '三千烦恼丝，一念清净心。'
  },
  {
    id: 27,
    category: 'body',
    keywords: ['血', '流血', '出血'],
    title: '梦见血',
    content: '血主财，亦主灾，需看具体情况。',
    interpretation: '血象征生命、财富和危险。梦见血的含义因情况而异。',
    meanings: [
      { condition: '梦见自己流血', meaning: '可能会有财务损失，或需要休息' },
      { condition: '梦见别人流血', meaning: '可能会卷入是非，或他人有难' },
      { condition: '梦见流鼻血', meaning: '财运将至，或需要控制情绪' },
      { condition: '梦见很多血', meaning: '大财将至，或大难临头' },
      { condition: '梦见血止住了', meaning: '危机解除，损失得到控制' }
    ],
    advice: '血气方刚需节制，遇事冷静不冲动。'
  },
  {
    id: 28,
    category: 'buildings',
    keywords: ['学校', '教室', '上学'],
    title: '梦见学校',
    content: '学校主学习，梦见学校多与成长相关。',
    interpretation: '学校象征学习、成长和过去。梦见学校通常与人生课题相关。',
    meanings: [
      { condition: '梦见回到学校', meaning: '怀念过去，或有未完成的课题' },
      { condition: '梦见在教室上课', meaning: '需要学习新知识，或面临考验' },
      { condition: '梦见学校毕业', meaning: '完成某阶段任务，新的开始' },
      { condition: '梦见在学校迷路', meaning: '人生方向迷茫，需要指引' },
      { condition: '梦见学校放假', meaning: '可以放松一下，休息调整' }
    ],
    advice: '活到老学到老，人生处处是课堂。'
  },
  {
    id: 29,
    category: 'buildings',
    keywords: ['医院', '看病', '医生'],
    title: '梦见医院',
    content: '医院主健康，梦见医院需关注身心。',
    interpretation: '医院象征健康、治愈和危机。梦见医院通常与健康或困难相关。',
    meanings: [
      { condition: '梦见自己住院', meaning: '身体需要休息，或心理需要调适' },
      { condition: '梦见看病', meaning: '需要寻求帮助，或解决问题' },
      { condition: '梦见探望病人', meaning: '关心他人，或有人需要帮助' },
      { condition: '梦见出院', meaning: '困难即将过去，健康好转' },
      { condition: '梦见医院走廊', meaning: '人生处于过渡期，等待结果' }
    ],
    advice: '健康是最大的财富，要好好珍惜。'
  },
  {
    id: 30,
    category: 'buildings',
    keywords: ['寺庙', '佛寺', '道观', '烧香'],
    title: '梦见寺庙',
    content: '寺庙主灵性，梦见寺庙多为吉兆。',
    interpretation: '寺庙象征灵性、信仰和庇佑。梦见寺庙通常与精神追求相关。',
    meanings: [
      { condition: '梦见进寺庙', meaning: '寻求心灵寄托，或需要指引' },
      { condition: '梦见烧香拜佛', meaning: '祈求保佑，或心想事成' },
      { condition: '梦见寺庙倒塌', meaning: '信仰动摇，或失去精神支柱' },
      { condition: '梦见在寺庙修行', meaning: '追求精神升华，或需要静心' },
      { condition: '梦见和尚道士', meaning: '得到指点，或遇到贵人' }
    ],
    advice: '心诚则灵，保持善良和正直。'
  },
  {
    id: 31,
    category: 'emotions',
    keywords: ['害怕', '恐惧', '惊恐'],
    title: '梦见恐惧',
    content: '梦见恐惧，内心不安，需找原因。',
    interpretation: '恐惧象征内心的不安和压力。梦见恐惧需要关注内心状态。',
    meanings: [
      { condition: '梦见害怕某物', meaning: '对该事物有心理阴影或担忧' },
      { condition: '梦见被吓醒', meaning: '压力过大，需要释放' },
      { condition: '梦见克服恐惧', meaning: '能够战胜困难，内心强大' },
      { condition: '梦见别人恐惧', meaning: '感知到他人的不安，或环境有变' },
      { condition: '梦见恐惧后平静', meaning: '困难只是暂时的，终将过去' }
    ],
    advice: '恐惧源于未知，了解它就能战胜它。'
  },
  {
    id: 32,
    category: 'emotions',
    keywords: ['开心', '快乐', '高兴'],
    title: '梦见快乐',
    content: '梦见快乐，心境良好，好事将至。',
    interpretation: '快乐象征内心的满足和幸福。梦见快乐通常是好兆头。',
    meanings: [
      { condition: '梦见非常开心', meaning: '好事将近，心想事成' },
      { condition: '梦见大笑', meaning: '压力释放，心情愉悦' },
      { condition: '梦见与他人分享快乐', meaning: '人际关系良好，社交顺利' },
      { condition: '梦见快乐后悲伤', meaning: '乐极生悲，要有所准备' },
      { condition: '梦见平静的快乐', meaning: '内心满足，生活安稳' }
    ],
    advice: '快乐是人生的追求，但也要懂得珍惜。'
  },
  {
    id: 33,
    category: 'nature',
    keywords: ['雨', '下雨', '大雨'],
    title: '梦见下雨',
    content: '雨水滋润，梦见下雨多与情感相关。',
    interpretation: '雨象征情感、净化和转变。梦见雨通常与内心感受相关。',
    meanings: [
      { condition: '梦见细雨绵绵', meaning: '情感细腻，或有小烦恼' },
      { condition: '梦见大雨倾盆', meaning: '情感宣泄，或有大变动' },
      { condition: '梦见雨过天晴', meaning: '困难过去，好运将至' },
      { condition: '梦见淋雨', meaning: '需要释放情感，或遭遇困难' },
      { condition: '梦见撑伞避雨', meaning: '能够保护自己，化解困难' }
    ],
    advice: '风雨之后见彩虹，坚持就是胜利。'
  },
  {
    id: 34,
    category: 'nature',
    keywords: ['雪', '下雪', '雪花'],
    title: '梦见下雪',
    content: '雪主纯洁，亦主寒冷，吉凶参半。',
    interpretation: '雪象征纯洁、寒冷和转变。梦见雪的含义因情况而异。',
    meanings: [
      { condition: '梦见瑞雪', meaning: '丰收之兆，好事将至' },
      { condition: '梦见大雪封山', meaning: '阻碍重重，需要等待' },
      { condition: '梦见雪融化', meaning: '困难过去，新的开始' },
      { condition: '梦见在雪中玩耍', meaning: '童心未泯，保持纯真' },
      { condition: '梦见被雪困住', meaning: '处境困难，需要帮助' }
    ],
    advice: '瑞雪兆丰年，但也要注意防寒保暖。'
  },
  {
    id: 35,
    category: 'animals',
    keywords: ['马', '骏马', '骑马'],
    title: '梦见马',
    content: '马主奔腾，梦见马多为事业之兆。',
    interpretation: '马象征力量、速度和成功。梦见马通常与事业发展相关。',
    meanings: [
      { condition: '梦见骏马奔腾', meaning: '事业腾飞，前途无量' },
      { condition: '梦见骑马', meaning: '掌控局面，事业顺利' },
      { condition: '梦见马跑丢了', meaning: '可能会失去机会，要抓紧' },
      { condition: '梦见白马', meaning: '贵人相助，或有喜事' },
      { condition: '梦见黑马', meaning: '意外之喜，或隐藏的机会' }
    ],
    advice: '马到成功，把握机遇，勇往直前。'
  },
  {
    id: 36,
    category: 'animals',
    keywords: ['猪', '小猪'],
    title: '梦见猪',
    content: '猪主财，梦见猪多为财运之兆。',
    interpretation: '猪象征财富、福气和享受。梦见猪通常与财运相关。',
    meanings: [
      { condition: '梦见肥猪', meaning: '财运亨通，生活富足' },
      { condition: '梦见猪入家门', meaning: '财运到家，好事临门' },
      { condition: '梦见杀猪', meaning: '破财消灾，或有大开支' },
      { condition: '梦见猪跑了', meaning: '财运流失，要小心' },
      { condition: '梦见母猪带小猪', meaning: '家庭和睦，子孙满堂' }
    ],
    advice: '猪事顺利，但也要懂得节制。'
  },
  {
    id: 37,
    category: 'objects',
    keywords: ['镜子', '照镜子'],
    title: '梦见镜子',
    content: '镜主自省，梦见镜子需审视自我。',
    interpretation: '镜子象征自我认知、真相和反思。梦见镜子通常与自我相关。',
    meanings: [
      { condition: '梦见照镜子', meaning: '审视自我，或关注形象' },
      { condition: '梦见镜中自己很美', meaning: '自信满满，或虚荣心作祟' },
      { condition: '梦见镜中自己很丑', meaning: '自卑心理，或自我否定' },
      { condition: '梦见镜子碎了', meaning: '自我形象破裂，或有不好的消息' },
      { condition: '梦见镜中是别人', meaning: '迷失自我，或模仿他人' }
    ],
    advice: '以铜为镜可以正衣冠，以人为镜可以明得失。'
  },
  {
    id: 38,
    category: 'objects',
    keywords: ['花', '鲜花', '花朵'],
    title: '梦见花',
    content: '花主美好，梦见花多为吉兆。',
    interpretation: '花象征美好、爱情和成功。梦见花通常是好兆头。',
    meanings: [
      { condition: '梦见鲜花盛开', meaning: '好事将至，事业顺利' },
      { condition: '梦见摘花', meaning: '收获爱情，或得到想要的东西' },
      { condition: '梦见花凋谢', meaning: '美好事物消逝，或感情出现问题' },
      { condition: '梦见收到花', meaning: '被人喜爱，或有桃花运' },
      { condition: '梦见花海', meaning: '幸福美满，生活多彩' }
    ],
    advice: '花开花落终有时，珍惜当下美好。'
  },
  {
    id: 39,
    category: 'objects',
    keywords: ['钥匙', '开门'],
    title: '梦见钥匙',
    content: '钥匙主开启，梦见钥匙多为机遇之兆。',
    interpretation: '钥匙象征机会、秘密和解决方案。梦见钥匙通常与机遇相关。',
    meanings: [
      { condition: '梦见找到钥匙', meaning: '找到解决问题的方法' },
      { condition: '梦见丢失钥匙', meaning: '失去机会，或忘记重要的事' },
      { condition: '梦见用钥匙开门', meaning: '新的机遇，或进入新阶段' },
      { condition: '梦见钥匙断在锁里', meaning: '方法不对，需要换种方式' },
      { condition: '梦见很多钥匙', meaning: '机会很多，或掌握很多秘密' }
    ],
    advice: '机会是给有准备的人，要善于把握。'
  },
  {
    id: 40,
    category: 'actions',
    keywords: ['游泳', '游水'],
    title: '梦见游泳',
    content: '游泳主进取，梦见游泳多与事业相关。',
    interpretation: '游泳象征能力、自由和挑战。梦见游泳通常与事业发展相关。',
    meanings: [
      { condition: '梦见轻松游泳', meaning: '能力出众，事业顺利' },
      { condition: '梦见游泳比赛', meaning: '竞争激烈，需要努力' },
      { condition: '梦见游泳很累', meaning: '压力很大，需要休息' },
      { condition: '梦见在深水区游泳', meaning: '面对挑战，需要勇气' },
      { condition: '梦见游泳溺水', meaning: '能力不足，或遇到危险' }
    ],
    advice: '逆水行舟，不进则退，要不断提升自己。'
  },
  {
    id: 41,
    category: 'actions',
    keywords: ['爬山', '登山', '攀岩'],
    title: '梦见爬山',
    content: '爬山主进取，梦见爬山多与事业相关。',
    interpretation: '爬山象征奋斗、目标和成就。梦见爬山通常与事业发展相关。',
    meanings: [
      { condition: '梦见爬到山顶', meaning: '目标达成，事业有成' },
      { condition: '梦见爬山很累', meaning: '努力付出，终有回报' },
      { condition: '梦见爬山摔倒', meaning: '遇到挫折，但不要放弃' },
      { condition: '梦见和别人一起爬山', meaning: '团队合作，共同进步' },
      { condition: '梦见从山上下来', meaning: '功成身退，或需要休息' }
    ],
    advice: '无限风光在险峰，坚持就能到达顶峰。'
  },
  {
    id: 42,
    category: 'people',
    keywords: ['陌生人', '不认识的人'],
    title: '梦见陌生人',
    content: '陌生人主未知，梦见陌生人需留意。',
    interpretation: '陌生人象征未知、机遇或潜在的自己。梦见陌生人含义多样。',
    meanings: [
      { condition: '梦见友好的陌生人', meaning: '会有贵人相助，或结识新朋友' },
      { condition: '梦见可怕的陌生人', meaning: '内心有恐惧，或要小心小人' },
      { condition: '梦见陌生人来访', meaning: '会有新的机遇或消息' },
      { condition: '梦见帮助陌生人', meaning: '善良待人，会有好报' },
      { condition: '梦见陌生人帮助自己', meaning: '意外之喜，或贵人出现' }
    ],
    advice: '善待他人，但也要保持警惕。'
  },
  {
    id: 43,
    category: 'people',
    keywords: ['老人', '老者', '长者'],
    title: '梦见老人',
    content: '老人主智慧，梦见老人多为指引之兆。',
    interpretation: '老人象征智慧、经验和指引。梦见老人通常与人生方向相关。',
    meanings: [
      { condition: '梦见慈祥的老人', meaning: '得到指引，或需要听取建议' },
      { condition: '梦见生病的老人', meaning: '担心长辈健康，或需要关心' },
      { condition: '梦见去世的老人', meaning: '怀念过去，或得到祖先保佑' },
      { condition: '梦见老人说话', meaning: '要仔细聆听，可能是指点' },
      { condition: '梦见自己变老', meaning: '担心衰老，或智慧增长' }
    ],
    advice: '家有一老如有一宝，要尊重和关心老人。'
  },
  {
    id: 44,
    category: 'people',
    keywords: ['孩子', '小孩', '儿童'],
    title: '梦见孩子',
    content: '孩子主新生，梦见孩子多为希望之兆。',
    interpretation: '孩子象征新生、希望和纯真。梦见孩子通常是好兆头。',
    meanings: [
      { condition: '梦见可爱的孩子', meaning: '好运将至，或有喜事' },
      { condition: '梦见孩子哭', meaning: '有烦心事，或需要关注' },
      { condition: '梦见孩子笑', meaning: '心情愉悦，好事将近' },
      { condition: '梦见自己变回孩子', meaning: '怀念过去，或需要放松' },
      { condition: '梦见生孩子', meaning: '新的开始，或新的计划' }
    ],
    advice: '保持童心，纯真善良，生活会更美好。'
  },
  {
    id: 45,
    category: 'nature',
    keywords: ['彩虹', '七彩'],
    title: '梦见彩虹',
    content: '彩虹主希望，梦见彩虹大吉大利。',
    interpretation: '彩虹象征希望、美好和承诺。梦见彩虹是大吉之兆。',
    meanings: [
      { condition: '梦见清晰的彩虹', meaning: '好运将至，心想事成' },
      { condition: '梦见双彩虹', meaning: '好事成双，喜事连连' },
      { condition: '梦见彩虹消失', meaning: '机会稍纵即逝，要抓紧' },
      { condition: '梦见穿过彩虹', meaning: '实现梦想，达成目标' },
      { condition: '梦见雨后彩虹', meaning: '困难过后，好运来临' }
    ],
    advice: '风雨之后见彩虹，坚持就是胜利。'
  },
  {
    id: 46,
    category: 'nature',
    keywords: ['星星', '星空', '流星'],
    title: '梦见星星',
    content: '星星主希望，梦见星星多为吉兆。',
    interpretation: '星星象征希望、梦想和指引。梦见星星通常是好兆头。',
    meanings: [
      { condition: '梦见满天繁星', meaning: '前途光明，希望多多' },
      { condition: '梦见流星', meaning: '愿望可能实现，要抓住机会' },
      { condition: '梦见星星坠落', meaning: '可能会失去某些东西，或梦想破灭' },
      { condition: '梦见北斗星', meaning: '找到方向，或得到指引' },
      { condition: '梦见摘星星', meaning: '追求梦想，志向高远' }
    ],
    advice: '脚踏实地，仰望星空，梦想终会实现。'
  },
  {
    id: 47,
    category: 'animals',
    keywords: ['兔子', '小白兔'],
    title: '梦见兔子',
    content: '兔主敏捷，梦见兔子多为吉兆。',
    interpretation: '兔子象征敏捷、幸运和生育。梦见兔子通常是好兆头。',
    meanings: [
      { condition: '梦见白兔', meaning: '好运将至，或有喜事' },
      { condition: '梦见兔子奔跑', meaning: '机会来临，要抓住' },
      { condition: '梦见兔子繁殖', meaning: '家庭兴旺，子孙满堂' },
      { condition: '梦见抓兔子', meaning: '通过努力获得成功' },
      { condition: '梦见兔子死了', meaning: '运气下降，要小心' }
    ],
    advice: '动如脱兔，抓住机遇，快速行动。'
  },
  {
    id: 48,
    category: 'animals',
    keywords: ['鸡', '公鸡', '母鸡'],
    title: '梦见鸡',
    content: '鸡主报晓，梦见鸡多为吉兆。',
    interpretation: '鸡象征警觉、守信和吉祥。梦见鸡通常是好兆头。',
    meanings: [
      { condition: '梦见公鸡打鸣', meaning: '新的开始，或有好事' },
      { condition: '梦见母鸡下蛋', meaning: '收获财富，或有成果' },
      { condition: '梦见鸡群', meaning: '家庭和睦，事业兴旺' },
      { condition: '梦见杀鸡', meaning: '破财消灾，或有牺牲' },
      { condition: '梦见金鸡', meaning: '大吉大利，飞黄腾达' }
    ],
    advice: '闻鸡起舞，勤奋努力，必有收获。'
  },
  {
    id: 49,
    category: 'objects',
    keywords: ['伞', '雨伞'],
    title: '梦见伞',
    content: '伞主保护，梦见伞多为庇佑之兆。',
    interpretation: '伞象征保护、安全和独立。梦见伞通常与安全感相关。',
    meanings: [
      { condition: '梦见撑伞', meaning: '能够保护自己，化解困难' },
      { condition: '梦见伞破了', meaning: '保护失效，或遇到困难' },
      { condition: '梦见送伞', meaning: '给予他人帮助，或有人需要' },
      { condition: '梦见收到伞', meaning: '得到保护，或有贵人相助' },
      { condition: '梦见丢伞', meaning: '失去保护，要小心' }
    ],
    advice: '未雨绸缪，做好准备，才能应对风雨。'
  },
  {
    id: 50,
    category: 'actions',
    keywords: ['吃饭', '用餐', '宴席'],
    title: '梦见吃饭',
    content: '饭主食禄，梦见吃饭多为财运之兆。',
    interpretation: '吃饭象征收获、满足和社交。梦见吃饭通常与财运相关。',
    meanings: [
      { condition: '梦见丰盛的宴席', meaning: '财运亨通，生活富足' },
      { condition: '梦见和别人一起吃饭', meaning: '人际关系良好，社交顺利' },
      { condition: '梦见饿着肚子', meaning: '渴望得到，或需要努力' },
      { condition: '梦见吃饭吃不完', meaning: '收获颇丰，但也要节制' },
      { condition: '梦见吃饭被抢', meaning: '利益受损，要小心' }
    ],
    advice: '民以食为天，但也要懂得分享。'
  }
]

export const searchDreams = (keyword) => {
  if (!keyword || keyword.trim() === '') {
    return []
  }
  
  const lowerKeyword = keyword.toLowerCase().trim()
  
  return dreamData.filter(dream => {
    if (dream.title.toLowerCase().includes(lowerKeyword)) {
      return true
    }
    
    if (dream.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
      return true
    }
    
    if (dream.content.toLowerCase().includes(lowerKeyword)) {
      return true
    }
    
    return false
  })
}

export const getDreamsByCategory = (categoryId) => {
  return dreamData.filter(dream => dream.category === categoryId)
}

export const getDreamById = (id) => {
  return dreamData.find(dream => dream.id === id)
}
