export const zodiacList = [
  { id: 'rat', name: '鼠', icon: '🐀', order: 1 },
  { id: 'ox', name: '牛', icon: '🐂', order: 2 },
  { id: 'tiger', name: '虎', icon: '🐅', order: 3 },
  { id: 'rabbit', name: '兔', icon: '🐇', order: 4 },
  { id: 'dragon', name: '龙', icon: '🐉', order: 5 },
  { id: 'snake', name: '蛇', icon: '🐍', order: 6 },
  { id: 'horse', name: '马', icon: '🐴', order: 7 },
  { id: 'goat', name: '羊', icon: '🐐', order: 8 },
  { id: 'monkey', name: '猴', icon: '🐒', order: 9 },
  { id: 'rooster', name: '鸡', icon: '🐓', order: 10 },
  { id: 'dog', name: '狗', icon: '🐕', order: 11 },
  { id: 'pig', name: '猪', icon: '🐷', order: 12 }
]

export const zodiacMatchData = {
  'rat-rat': {
    score: 75,
    level: '中吉',
    summary: '同属相配，性格相似，但也容易产生摩擦',
    love: '两人性格相近，能够互相理解，但也可能因为太相似而产生竞争。需要学会互相包容和退让。',
    career: '合作默契，思维相近，但要注意避免因小事争执。',
    advice: '保持各自的空间，学会欣赏对方的优点。'
  },
  'rat-ox': {
    score: 95,
    level: '大吉',
    summary: '子丑相合，天作之合，互补性强',
    love: '鼠的机灵与牛的稳重形成完美互补，鼠能带给牛欢乐，牛能给予鼠安全感。',
    career: '鼠的创意与牛的执行力相结合，事业必定蒸蒸日上。',
    advice: '珍惜这段缘分，互相扶持，共同成长。'
  },
  'rat-tiger': {
    score: 65,
    level: '中平',
    summary: '性格差异较大，需要磨合',
    love: '鼠的谨慎与虎的冲动形成对比，需要互相理解和适应。',
    career: '虎的魄力与鼠的谨慎可以互补，但需要建立信任。',
    advice: '多沟通，少争执，学会欣赏对方的不同。'
  },
  'rat-rabbit': {
    score: 70,
    level: '中吉',
    summary: '相处融洽，但缺乏激情',
    love: '两人都比较温和，相处和谐，但可能缺乏一些浪漫和激情。',
    career: '合作稳定，但可能缺乏突破性的进展。',
    advice: '适当增加生活的情趣，不要过于平淡。'
  },
  'rat-dragon': {
    score: 85,
    level: '大吉',
    summary: '申子辰三合，珠联璧合',
    love: '鼠的聪明与龙的魄力相得益彰，是理想的伴侣组合。',
    career: '龙的战略眼光与鼠的执行力完美配合，事业有成。',
    advice: '互相支持，共同追求更高的目标。'
  },
  'rat-snake': {
    score: 60,
    level: '中平',
    summary: '需要时间建立信任',
    love: '两人都比较敏感多疑，需要时间建立深厚的信任。',
    career: '合作需要磨合，一旦建立信任，合作会很顺畅。',
    advice: '坦诚相待，不要互相猜忌。'
  },
  'rat-horse': {
    score: 45,
    level: '凶',
    summary: '子午相冲，矛盾较多',
    love: '鼠的谨慎与马的奔放形成强烈对比，容易产生冲突。',
    career: '合作困难，意见难以统一。',
    advice: '如果真心相爱，需要付出更多努力去理解和包容。'
  },
  'rat-goat': {
    score: 55,
    level: '中平',
    summary: '子未相害，需要磨合',
    love: '鼠的现实与羊的浪漫可能产生矛盾，需要互相妥协。',
    career: '合作需要找到共同点，否则容易各行其是。',
    advice: '学会欣赏对方的不同，求同存异。'
  },
  'rat-monkey': {
    score: 90,
    level: '大吉',
    summary: '申子相合，志同道合',
    love: '两人都聪明机智，相处充满乐趣，是理想的伴侣。',
    career: '合作默契，创意无限，事业容易成功。',
    advice: '保持新鲜感，不要让生活变得太规律。'
  },
  'rat-rooster': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要适应',
    love: '鼠的随意与鸡的完美主义可能产生摩擦。',
    career: '鸡的细致可以弥补鼠的粗心，但需要互相适应。',
    advice: '互相学习对方的优点，取长补短。'
  },
  'rat-dog': {
    score: 80,
    level: '大吉',
    summary: '相处和谐，互相支持',
    love: '鼠的聪明与狗的忠诚形成良好搭配，感情稳定。',
    career: '合作顺畅，狗的忠诚和鼠的智慧相得益彰。',
    advice: '珍惜这份难得的默契，共同经营美好生活。'
  },
  'rat-pig': {
    score: 85,
    level: '大吉',
    summary: '互补性强，相处融洽',
    love: '鼠的机灵与猪的善良完美互补，感情甜蜜。',
    career: '合作愉快，猪的包容和鼠的智慧相辅相成。',
    advice: '互相珍惜，共同创造幸福生活。'
  },
  'ox-ox': {
    score: 70,
    level: '中吉',
    summary: '同属相配，稳重踏实',
    love: '两人都踏实稳重，感情稳定，但可能缺乏浪漫。',
    career: '合作稳健，但可能缺乏创新。',
    advice: '适当增加生活的情趣，不要过于沉闷。'
  },
  'ox-tiger': {
    score: 50,
    level: '凶',
    summary: '丑寅相冲，矛盾较多',
    love: '牛的稳重与虎的冲动形成冲突，需要大量磨合。',
    career: '合作困难，意见分歧较大。',
    advice: '如果真心相爱，需要学会互相退让和包容。'
  },
  'ox-rabbit': {
    score: 75,
    level: '中吉',
    summary: '相处和谐，互补性强',
    love: '牛的稳重与兔的温柔形成良好搭配。',
    career: '合作稳定，互相支持。',
    advice: '保持沟通，共同经营感情。'
  },
  'ox-dragon': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要磨合',
    love: '牛的务实与龙的理想主义可能产生冲突。',
    career: '龙的想法与牛的执行可以互补，但需要协调。',
    advice: '互相理解，找到平衡点。'
  },
  'ox-snake': {
    score: 85,
    level: '大吉',
    summary: '巳酉丑三合，天作之合',
    love: '牛的稳重与蛇的智慧完美结合，感情深厚。',
    career: '合作默契，事业有成。',
    advice: '珍惜这份缘分，共同成长。'
  },
  'ox-horse': {
    score: 55,
    level: '中平',
    summary: '丑午相害，需要磨合',
    love: '牛的稳重与马的奔放形成对比，需要互相适应。',
    career: '合作需要找到共同目标。',
    advice: '多沟通，少固执，学会变通。'
  },
  'ox-goat': {
    score: 45,
    level: '凶',
    summary: '丑未相冲，矛盾较多',
    love: '牛的固执与羊的敏感容易产生冲突。',
    career: '合作困难，意见难以统一。',
    advice: '如果真心相爱，需要付出更多努力。'
  },
  'ox-monkey': {
    score: 75,
    level: '中吉',
    summary: '相处融洽，互相支持',
    love: '牛的稳重与猴的活泼形成互补。',
    career: '合作顺畅，猴的创意与牛的执行相结合。',
    advice: '互相欣赏，共同进步。'
  },
  'ox-rooster': {
    score: 90,
    level: '大吉',
    summary: '巳酉丑三合，珠联璧合',
    love: '牛的踏实与鸡的完美主义完美搭配。',
    career: '合作默契，事业蒸蒸日上。',
    advice: '珍惜这份难得的缘分。'
  },
  'ox-dog': {
    score: 70,
    level: '中吉',
    summary: '相处和谐，互相尊重',
    love: '牛的稳重与狗的忠诚形成良好搭配。',
    career: '合作稳定，互相支持。',
    advice: '保持信任，共同经营生活。'
  },
  'ox-pig': {
    score: 80,
    level: '大吉',
    summary: '互补性强，相处融洽',
    love: '牛的勤劳与猪的善良完美互补。',
    career: '合作愉快，事业稳定发展。',
    advice: '互相珍惜，共同创造美好生活。'
  },
  'tiger-tiger': {
    score: 65,
    level: '中平',
    summary: '同属相配，竞争激烈',
    love: '两人都强势，容易产生竞争和冲突。',
    career: '合作需要明确分工，否则容易争权。',
    advice: '学会互相退让，不要争强好胜。'
  },
  'tiger-rabbit': {
    score: 70,
    level: '中吉',
    summary: '寅卯相合，相处和谐',
    love: '虎的魄力与兔的温柔形成互补。',
    career: '合作顺畅，虎的领导与兔的配合相得益彰。',
    advice: '互相欣赏，共同成长。'
  },
  'tiger-dragon': {
    score: 80,
    level: '大吉',
    summary: '寅辰相合，志同道合',
    love: '虎的魄力与龙的理想主义完美结合。',
    career: '合作默契，事业容易成功。',
    advice: '互相支持，共同追求梦想。'
  },
  'tiger-snake': {
    score: 50,
    level: '凶',
    summary: '寅巳相害，矛盾较多',
    love: '虎的直率与蛇的深沉形成冲突。',
    career: '合作困难，需要大量磨合。',
    advice: '如果真心相爱，需要学会互相理解。'
  },
  'tiger-horse': {
    score: 85,
    level: '大吉',
    summary: '寅午相合，志同道合',
    love: '虎的魄力与马的奔放完美搭配。',
    career: '合作默契，事业蒸蒸日上。',
    advice: '珍惜这份难得的缘分。'
  },
  'tiger-goat': {
    score: 60,
    level: '中平',
    summary: '性格差异，需要磨合',
    love: '虎的强势与羊的敏感需要互相适应。',
    career: '合作需要找到平衡点。',
    advice: '多沟通，少争执。'
  },
  'tiger-monkey': {
    score: 55,
    level: '中平',
    summary: '寅申相冲，需要磨合',
    love: '虎的直率与猴的机灵可能产生冲突。',
    career: '合作需要建立信任。',
    advice: '互相理解，找到共同点。'
  },
  'tiger-rooster': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要适应',
    love: '虎的随意与鸡的完美主义需要互相适应。',
    career: '合作需要明确分工。',
    advice: '互相学习，取长补短。'
  },
  'tiger-dog': {
    score: 90,
    level: '大吉',
    summary: '寅戌相合，珠联璧合',
    love: '虎的魄力与狗的忠诚完美结合。',
    career: '合作默契，事业有成。',
    advice: '珍惜这份难得的缘分。'
  },
  'tiger-pig': {
    score: 85,
    level: '大吉',
    summary: '寅亥相合，天作之合',
    love: '虎的魄力与猪的善良完美搭配。',
    career: '合作顺畅，事业容易成功。',
    advice: '互相支持，共同成长。'
  },
  'rabbit-rabbit': {
    score: 75,
    level: '中吉',
    summary: '同属相配，温柔和谐',
    love: '两人都温柔体贴，感情和谐。',
    career: '合作稳定，但可能缺乏魄力。',
    advice: '适当增加决断力，不要过于优柔。'
  },
  'rabbit-dragon': {
    score: 60,
    level: '中平',
    summary: '卯辰相害，需要磨合',
    love: '兔的温柔与龙的强势需要互相适应。',
    career: '合作需要明确角色分工。',
    advice: '多沟通，互相理解。'
  },
  'rabbit-snake': {
    score: 70,
    level: '中吉',
    summary: '相处融洽，互相支持',
    love: '兔的温柔与蛇的智慧形成良好搭配。',
    career: '合作顺畅，互相补充。',
    advice: '保持信任，共同经营。'
  },
  'rabbit-horse': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要磨合',
    love: '兔的温柔与马的奔放需要互相适应。',
    career: '合作需要找到共同节奏。',
    advice: '多沟通，少争执。'
  },
  'rabbit-goat': {
    score: 90,
    level: '大吉',
    summary: '亥卯未三合，天作之合',
    love: '兔的温柔与羊的善良完美搭配。',
    career: '合作默契，事业顺利。',
    advice: '珍惜这份难得的缘分。'
  },
  'rabbit-monkey': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要适应',
    love: '兔的温柔与猴的活泼需要互相适应。',
    career: '合作需要建立信任。',
    advice: '互相欣赏，取长补短。'
  },
  'rabbit-rooster': {
    score: 50,
    level: '凶',
    summary: '卯酉相冲，矛盾较多',
    love: '兔的随意与鸡的完美主义容易产生冲突。',
    career: '合作困难，意见分歧较大。',
    advice: '如果真心相爱，需要付出更多努力。'
  },
  'rabbit-dog': {
    score: 85,
    level: '大吉',
    summary: '卯戌相合，珠联璧合',
    love: '兔的温柔与狗的忠诚完美结合。',
    career: '合作默契，事业有成。',
    advice: '珍惜这份难得的缘分。'
  },
  'rabbit-pig': {
    score: 85,
    level: '大吉',
    summary: '亥卯相合，天作之合',
    love: '兔的温柔与猪的善良完美搭配。',
    career: '合作顺畅，事业容易成功。',
    advice: '互相珍惜，共同成长。'
  },
  'dragon-dragon': {
    score: 70,
    level: '中吉',
    summary: '同属相配，志向高远',
    love: '两人都志向高远，但可能产生竞争。',
    career: '合作需要明确分工，否则容易争权。',
    advice: '学会互相支持，共同进步。'
  },
  'dragon-snake': {
    score: 75,
    level: '中吉',
    summary: '相处融洽，互相欣赏',
    love: '龙的魄力与蛇的智慧形成良好搭配。',
    career: '合作顺畅，互相补充。',
    advice: '保持沟通，共同经营。'
  },
  'dragon-horse': {
    score: 85,
    level: '大吉',
    summary: '志同道合，互相支持',
    love: '龙的理想主义与马的奔放完美结合。',
    career: '合作默契，事业蒸蒸日上。',
    advice: '珍惜这份难得的缘分。'
  },
  'dragon-goat': {
    score: 70,
    level: '中吉',
    summary: '相处和谐，互补性强',
    love: '龙的魄力与羊的温柔形成互补。',
    career: '合作稳定，互相支持。',
    advice: '保持信任，共同成长。'
  },
  'dragon-monkey': {
    score: 95,
    level: '大吉',
    summary: '申子辰三合，珠联璧合',
    love: '龙的魄力与猴的聪明完美结合。',
    career: '合作默契，事业必定成功。',
    advice: '珍惜这份难得的缘分。'
  },
  'dragon-rooster': {
    score: 85,
    level: '大吉',
    summary: '辰酉相合，天作之合',
    love: '龙的理想主义与鸡的完美主义完美搭配。',
    career: '合作顺畅，事业容易成功。',
    advice: '互相支持，共同成长。'
  },
  'dragon-dog': {
    score: 55,
    level: '中平',
    summary: '辰戌相冲，需要磨合',
    love: '龙的强势与狗的固执可能产生冲突。',
    career: '合作需要建立信任。',
    advice: '多沟通，互相理解。'
  },
  'dragon-pig': {
    score: 75,
    level: '中吉',
    summary: '相处融洽，互相支持',
    love: '龙的魄力与猪的善良形成良好搭配。',
    career: '合作稳定，互相补充。',
    advice: '保持信任，共同经营。'
  },
  'snake-snake': {
    score: 70,
    level: '中吉',
    summary: '同属相配，智慧相投',
    love: '两人都智慧深沉，互相理解。',
    career: '合作稳定，但可能过于谨慎。',
    advice: '适当增加冒险精神，不要过于保守。'
  },
  'snake-horse': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要磨合',
    love: '蛇的深沉与马的奔放需要互相适应。',
    career: '合作需要找到共同节奏。',
    advice: '多沟通，少猜忌。'
  },
  'snake-goat': {
    score: 75,
    level: '中吉',
    summary: '相处和谐，互补性强',
    love: '蛇的智慧与羊的温柔形成互补。',
    career: '合作稳定，互相支持。',
    advice: '保持信任，共同经营。'
  },
  'snake-monkey': {
    score: 70,
    level: '中吉',
    summary: '相处融洽，互相欣赏',
    love: '蛇的智慧与猴的聪明形成良好搭配。',
    career: '合作顺畅，互相补充。',
    advice: '保持沟通，共同成长。'
  },
  'snake-rooster': {
    score: 90,
    level: '大吉',
    summary: '巳酉丑三合，珠联璧合',
    love: '蛇的智慧与鸡的完美主义完美结合。',
    career: '合作默契，事业必定成功。',
    advice: '珍惜这份难得的缘分。'
  },
  'snake-dog': {
    score: 75,
    level: '中吉',
    summary: '相处和谐，互相支持',
    love: '蛇的智慧与狗的忠诚形成良好搭配。',
    career: '合作稳定，互相补充。',
    advice: '保持信任，共同经营。'
  },
  'snake-pig': {
    score: 55,
    level: '中平',
    summary: '巳亥相冲，需要磨合',
    love: '蛇的深沉与猪的单纯需要互相适应。',
    career: '合作需要建立信任。',
    advice: '多沟通，互相理解。'
  },
  'horse-horse': {
    score: 70,
    level: '中吉',
    summary: '同属相配，志同道合',
    love: '两人都奔放热情，感情热烈。',
    career: '合作有激情，但可能缺乏持久性。',
    advice: '学会坚持，不要三分钟热度。'
  },
  'horse-goat': {
    score: 85,
    level: '大吉',
    summary: '午未相合，天作之合',
    love: '马的奔放与羊的温柔完美搭配。',
    career: '合作默契，事业顺利。',
    advice: '珍惜这份难得的缘分。'
  },
  'horse-monkey': {
    score: 75,
    level: '中吉',
    summary: '相处融洽，互相欣赏',
    love: '马的奔放与猴的活泼形成良好搭配。',
    career: '合作顺畅，互相补充。',
    advice: '保持新鲜感，共同成长。'
  },
  'horse-rooster': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要磨合',
    love: '马的奔放与鸡的完美主义需要互相适应。',
    career: '合作需要明确分工。',
    advice: '多沟通，互相理解。'
  },
  'horse-dog': {
    score: 85,
    level: '大吉',
    summary: '寅午戌三合，珠联璧合',
    love: '马的奔放与狗的忠诚完美结合。',
    career: '合作默契，事业必定成功。',
    advice: '珍惜这份难得的缘分。'
  },
  'horse-pig': {
    score: 70,
    level: '中吉',
    summary: '相处和谐，互补性强',
    love: '马的奔放与猪的善良形成互补。',
    career: '合作稳定，互相支持。',
    advice: '保持信任，共同经营。'
  },
  'goat-goat': {
    score: 75,
    level: '中吉',
    summary: '同属相配，温柔和谐',
    love: '两人都温柔善良，感情和谐。',
    career: '合作稳定，但可能缺乏魄力。',
    advice: '适当增加决断力，不要过于优柔。'
  },
  'goat-monkey': {
    score: 65,
    level: '中平',
    summary: '性格差异，需要磨合',
    love: '羊的温柔与猴的活泼需要互相适应。',
    career: '合作需要找到共同节奏。',
    advice: '多沟通，互相理解。'
  },
  'goat-rooster': {
    score: 70,
    level: '中吉',
    summary: '相处融洽，互相支持',
    love: '羊的温柔与鸡的完美主义形成良好搭配。',
    career: '合作稳定，互相补充。',
    advice: '保持信任，共同经营。'
  },
  'goat-dog': {
    score: 60,
    level: '中平',
    summary: '戌未相刑，需要磨合',
    love: '羊的敏感与狗的固执需要互相适应。',
    career: '合作需要建立信任。',
    advice: '多沟通，少争执。'
  },
  'goat-pig': {
    score: 90,
    level: '大吉',
    summary: '亥卯未三合，珠联璧合',
    love: '羊的温柔与猪的善良完美结合。',
    career: '合作默契，事业必定成功。',
    advice: '珍惜这份难得的缘分。'
  },
  'monkey-monkey': {
    score: 75,
    level: '中吉',
    summary: '同属相配，聪明相投',
    love: '两人都聪明活泼，相处充满乐趣。',
    career: '合作有创意，但可能缺乏稳定性。',
    advice: '学会坚持，不要过于善变。'
  },
  'monkey-rooster': {
    score: 70,
    level: '中吉',
    summary: '相处融洽，互相欣赏',
    love: '猴的活泼与鸡的完美主义形成良好搭配。',
    career: '合作稳定，互相补充。',
    advice: '保持信任，共同经营。'
  },
  'monkey-dog': {
    score: 80,
    level: '大吉',
    summary: '相处和谐，互相支持',
    love: '猴的聪明与狗的忠诚形成良好搭配。',
    career: '合作顺畅，互相补充。',
    advice: '保持信任，共同成长。'
  },
  'monkey-pig': {
    score: 70,
    level: '中吉',
    summary: '相处融洽，互补性强',
    love: '猴的活泼与猪的善良形成互补。',
    career: '合作稳定，互相支持。',
    advice: '保持沟通，共同经营。'
  },
  'rooster-rooster': {
    score: 70,
    level: '中吉',
    summary: '同属相配，追求完美',
    love: '两人都追求完美，但可能过于挑剔。',
    career: '合作严谨，但可能缺乏灵活性。',
    advice: '学会包容，不要过于苛求。'
  },
  'rooster-dog': {
    score: 65,
    level: '中平',
    summary: '酉戌相害，需要磨合',
    love: '鸡的完美主义与狗的固执需要互相适应。',
    career: '合作需要建立信任。',
    advice: '多沟通，互相理解。'
  },
  'rooster-pig': {
    score: 75,
    level: '中吉',
    summary: '相处融洽，互相支持',
    love: '鸡的完美主义与猪的善良形成良好搭配。',
    career: '合作稳定，互相补充。',
    advice: '保持信任，共同经营。'
  },
  'dog-dog': {
    score: 80,
    level: '大吉',
    summary: '同属相配，忠诚相投',
    love: '两人都忠诚可靠，感情稳定。',
    career: '合作稳定，互相信任。',
    advice: '保持信任，共同经营美好生活。'
  },
  'dog-pig': {
    score: 80,
    level: '大吉',
    summary: '相处和谐，互相支持',
    love: '狗的忠诚与猪的善良完美搭配。',
    career: '合作顺畅，互相补充。',
    advice: '珍惜这份难得的缘分。'
  },
  'pig-pig': {
    score: 80,
    level: '大吉',
    summary: '同属相配，善良相投',
    love: '两人都善良包容，感情和谐。',
    career: '合作稳定，互相支持。',
    advice: '保持善良，共同经营美好生活。'
  }
}

export const getZodiacMatch = (zodiac1, zodiac2) => {
  const key1 = `${zodiac1}-${zodiac2}`
  const key2 = `${zodiac2}-${zodiac1}`
  
  if (zodiacMatchData[key1]) {
    return zodiacMatchData[key1]
  }
  
  if (zodiacMatchData[key2]) {
    return zodiacMatchData[key2]
  }
  
  return {
    score: 70,
    level: '中吉',
    summary: '需要更多了解',
    love: '任何生肖组合都有可能幸福，关键在于互相理解和包容。',
    career: '合作需要建立信任和默契。',
    advice: '真诚相待，互相珍惜。'
  }
}

export const getZodiacById = (id) => {
  return zodiacList.find(z => z.id === id)
}
