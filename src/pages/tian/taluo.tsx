'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const TAROT_CARDS = [
  { id: 0, name: '愚者', type: '大阿卡纳', number: '0', element: '风', meaning: '天真无邪，自由随性，新的开始', love: '纯真的恋情，顺其自然', career: '勇于尝试，开创新局', wealth: '随性理财，意外收获', health: '身心健康，精力充沛', reversed: '鲁莽冲动，不负责任，过于天真', image: '🃏' },
  { id: 1, name: '魔术师', type: '大阿卡纳', number: 'I', element: '风', meaning: '创造力，沟通能力，意志坚定', love: '主动出击，魅力四射', career: '大展拳脚，才华展现', wealth: '财源广进，善于理财', health: '精力充沛，恢复力强', reversed: '欺骗，操纵他人，潜力未发挥', image: '🎩' },
  { id: 2, name: '女祭司', type: '大阿卡纳', number: 'II', element: '水', meaning: '智慧，直觉，神秘，静止不动', love: '柏拉图式恋爱，精神契合', career: '幕后工作，研究分析', wealth: '稳健投资，低调致富', health: '注重养生，内心平静', reversed: '忽略直觉，心胸狭隘，知识浅薄', image: '🌙' },
  { id: 3, name: '女皇', type: '大阿卡纳', number: 'III', element: '土', meaning: '丰收，母性，自然，艺术创造力', love: '浪漫多情，享受爱情', career: '艺术创作，事业丰收', wealth: '物质丰富，财运亨通', health: '身体健康，容光焕发', reversed: '虚荣心，依赖感，缺乏创造力', image: '👑' },
  { id: 4, name: '皇帝', type: '大阿卡纳', number: 'IV', element: '火', meaning: '权威，领导力，稳定，秩序', love: '稳定的关系，主导地位', career: '领导岗位，事业有成', wealth: '财富稳固，善用权力', health: '身体强健，注意压力', reversed: '专制，独裁，缺乏控制', image: '⚔️' },
  { id: 5, name: '教皇', type: '大阿卡纳', number: 'V', element: '土', meaning: '传统，信仰，教育，精神指引', love: '传统恋爱，媒妁之言', career: '教育行业，贵人相助', wealth: '正财可得，传统方式', health: '保守养生，寻求建议', reversed: '打破常规，思想束缚，虚假教义', image: '⛪' },
  { id: 6, name: '恋人', type: '大阿卡纳', number: 'VI', element: '风', meaning: '爱情，选择，诱惑，结合', love: '热恋，面临选择，灵魂伴侣', career: '合作，选择方向，人际关系', wealth: '合作生财，慎重选择', health: '心情愉悦，注意平衡', reversed: '错误选择，分离，诱惑', image: '💕' },
  { id: 7, name: '战车', type: '大阿卡纳', number: 'VII', element: '水', meaning: '胜利，征服，意志力，勇往直前', love: '积极追求，征服对方', career: '攻坚克难，取得胜利', wealth: '积极求财，得偿所愿', health: '战胜疾病，恢复健康', reversed: '失败，失控，方向错误', image: '🏛️' },
  { id: 8, name: '力量', type: '大阿卡纳', number: 'VIII', element: '火', meaning: '勇气，耐心，内在力量，温柔', love: '温柔经营，化解矛盾', career: '以柔克刚，克服困难', wealth: '耐心生财，克服困境', health: '内心强大，战胜病魔', reversed: '软弱，缺乏自信，蛮力', image: '🦁' },
  { id: 9, name: '隐士', type: '大阿卡纳', number: 'IX', element: '土', meaning: '内省，寻求真理，独处，智慧', love: '独身，低调恋爱，精神追求', career: '独立工作，深入研究', wealth: '低调积累，不慕虚荣', health: '静养调理，修身养性', reversed: '孤僻，逃避现实，缺乏指引', image: '🏮' },
  { id: 10, name: '命运之轮', type: '大阿卡纳', number: 'X', element: '火', meaning: '转变，机遇，命运，转折点', love: '命运邂逅，关系转变', career: '时来运转，新的机遇', wealth: '财运转变，意外之财', health: '身体转机，注意变化', reversed: '厄运，不利改变，错失良机', image: '☸️' },
  { id: 11, name: '正义', type: '大阿卡纳', number: 'XI', element: '风', meaning: '公正，均衡，诚实，责任', love: '公平相待，理智恋爱', career: '公正处事，承担责任', wealth: '取财有道，公平交易', health: '平衡调理，对症下药', reversed: '不公正，偏见，逃避责任', image: '⚖️' },
  { id: 12, name: '倒吊人', type: '大阿卡纳', number: 'XII', element: '水', meaning: '牺牲，等待，换个角度，顺其自然', love: '为爱付出，等待时机', career: '韬光养晦，不同视角', wealth: '先舍后得，耐心等待', health: '需要休养，换种方式', reversed: '无谓牺牲，执迷不悟', image: '🔮' },
  { id: 13, name: '死神', type: '大阿卡纳', number: 'XIII', element: '水', meaning: '结束，转变，新生，过渡', love: '关系结束，重新开始', career: '职业转换，旧去新来', wealth: '旧财散去，新财将至', health: '大病初愈，新陈代谢', reversed: '拒绝改变，停滞不前', image: '💀' },
  { id: 14, name: '节制', type: '大阿卡纳', number: 'XIV', element: '火', meaning: '平衡，调和，耐心，净化', love: '细水长流，平淡是真', career: '循序渐进，步步高升', wealth: '收支平衡，细水长流', health: '调理平衡，身心合一', reversed: '失衡，缺乏耐心，过度消耗', image: '⚗️' },
  { id: 15, name: '恶魔', type: '大阿卡纳', number: 'XV', element: '土', meaning: '束缚，欲望，诱惑，物质主义', love: '孽缘，情欲纠缠，被束缚', career: '工作狂，被利益束缚', wealth: '物质诱惑，不义之财', health: '沉溺享乐，身心俱疲', reversed: '解脱，挣脱束缚，克服欲望', image: '😈' },
  { id: 16, name: '塔', type: '大阿卡纳', number: 'XVI', element: '火', meaning: '毁灭，突变，灾难，打破旧有', love: '突然分手，关系破裂', career: '突发变故，事业挫折', wealth: '破财，突然损失', health: '突患疾病，意外受伤', reversed: '劫后余生，避免灾难', image: '🗼' },
  { id: 17, name: '星星', type: '大阿卡纳', number: 'XVII', element: '风', meaning: '希望，宁静，灵感，信心', love: '新的希望，美好的憧憬', career: '前途光明，灵感涌现', wealth: '未来可期，渐渐好转', health: '充满希望，渐渐康复', reversed: '失望，缺乏信心，理想遥远', image: '⭐' },
  { id: 18, name: '月亮', type: '大阿卡纳', number: 'XVIII', element: '水', meaning: '不安，迷惑，潜意识，恐惧', love: '不安定，隐瞒，三角关系', career: '局势不明，需要谨慎', wealth: '暗潮涌动，不明朗', health: '精神焦虑，失眠多梦', reversed: '解开谜团，摆脱恐惧', image: '🌕' },
  { id: 19, name: '太阳', type: '大阿卡纳', number: 'XIX', element: '火', meaning: '成功，快乐，活力，积极', love: '热恋，阳光开朗，美满幸福', career: '事业成功，大展宏图', wealth: '大富大贵，财源广进', health: '身体健康，充满活力', reversed: '意气消沉，人际关系不佳', image: '☀️' },
  { id: 20, name: '审判', type: '大阿卡纳', number: 'XX', element: '火', meaning: '复活，觉醒，召唤，重生', love: '破镜重圆，感情复苏', career: '东山再起，获得召唤', wealth: '失而复得，财运复活', health: '大病痊愈，重获新生', reversed: '不醒，消沉，错过机会', image: '📯' },
  { id: 21, name: '世界', type: '大阿卡纳', number: 'XXI', element: '土', meaning: '完成，成功，完美，旅行', love: '修成正果，完美结局', career: '功成名就，完成目标', wealth: '功德圆满，应有尽有', health: '身心健康，功德圆满', reversed: '未完成，失败，停滞不前', image: '🌍' },
  { id: 22, name: '权杖首牌', type: '小阿卡纳·权杖', number: 'ACE', element: '火', meaning: '创造，开始，行动，灵感', love: '新恋情开始，热情主动', career: '新事业启动，创意迸发', wealth: '新财路开启', health: '新的健康计划', reversed: '虚假开始，行动迟缓', image: '🔥' },
  { id: 23, name: '权杖二', type: '小阿卡纳·权杖', number: '2', element: '火', meaning: '规划，决策，勇气，掌握', love: '感情规划，未来考虑', career: '商业计划，掌控全局', wealth: '财务规划，投资决策', health: '健康管理，制定计划', reversed: '犹豫不决，计划失败', image: '🔥' },
  { id: 24, name: '权杖三', type: '小阿卡纳·权杖', number: '3', element: '火', meaning: '远见，探索，领导力', love: '异地恋，展望未来', career: '海外业务，领导才能', wealth: '长期投资，远见卓识', health: '长远规划，预防为主', reversed: '目光短浅，遇到阻碍', image: '🔥' },
  { id: 25, name: '权杖四', type: '小阿卡纳·权杖', number: '4', element: '火', meaning: '稳定，和谐，庆祝，家园', love: '稳定关系，结婚成家', career: '事业稳定，团队和谐', wealth: '财富稳固，安居乐业', health: '身体稳定，家庭和睦', reversed: '不稳定，缺乏和谐', image: '🔥' },
  { id: 26, name: '权杖五', type: '小阿卡纳·权杖', number: '5', element: '火', meaning: '竞争，冲突，挑战', love: '情敌竞争，关系冲突', career: '职场竞争，团队冲突', wealth: '财务竞争，利益争夺', health: '新旧冲突，需要调理', reversed: '逃避冲突，竞争失败', image: '🔥' },
  { id: 27, name: '权杖六', type: '小阿卡纳·权杖', number: '6', element: '火', meaning: '胜利，骄傲，成功，凯旋', love: '情场得意，众人羡慕', career: '取得胜利，获得荣誉', wealth: '投资成功，回报丰厚', health: '战胜疾病，恢复健康', reversed: '骄傲失败，得意忘形', image: '🔥' },
  { id: 28, name: '权杖七', type: '小阿卡纳·权杖', number: '7', element: '火', meaning: '挑战，防御，勇气', love: '保卫爱情，面对反对', career: '迎接挑战，坚守岗位', wealth: '守护财富，面对竞争', health: '坚持锻炼，抵抗疾病', reversed: '放弃，被打败', image: '🔥' },
  { id: 29, name: '权杖八', type: '小阿卡纳·权杖', number: '8', element: '火', meaning: '速度，进展，消息，旅行', love: '迅速发展，异地恋情', career: '快速进展，出差旅行', wealth: '资金快速周转', health: '快速康复，运动健身', reversed: '延误，消息停滞', image: '🔥' },
  { id: 30, name: '权杖九', type: '小阿卡纳·权杖', number: '9', element: '火', meaning: '防御，坚持，毅力', love: '坚守爱情，受伤防备', career: '坚持到底，防备对手', wealth: '坚守阵地，守护财产', health: '带病坚持，需要休养', reversed: '放弃，失去信念', image: '🔥' },
  { id: 31, name: '权杖十', type: '小阿卡纳·权杖', number: '10', element: '火', meaning: '压力，负担，责任', love: '爱情负担，责任太重', career: '工作压力，责任重大', wealth: '财务压力，负债累累', health: '压力太大，身心俱疲', reversed: '放下负担，推卸责任', image: '🔥' },
  { id: 32, name: '权杖侍从', type: '小阿卡纳·权杖', number: '侍从', element: '火', meaning: '热情，忠诚，积极，消息', love: '热情追求者，忠诚爱恋', career: '职场新人，积极学习', wealth: '理财新手，谨慎入手', health: '年轻活力，运动锻炼', reversed: '不稳重，虚假消息', image: '🔥' },
  { id: 33, name: '权杖骑士', type: '小阿卡纳·权杖', number: '骑士', element: '火', meaning: '行动力，冒险，热情', love: '热情如火，冲动恋爱', career: '行动派，勇于冒险', wealth: '激进投资，快速获利', health: '运动达人，精力充沛', reversed: '鲁莽，半途而废', image: '🔥' },
  { id: 34, name: '权杖王后', type: '小阿卡纳·权杖', number: '王后', element: '火', meaning: '开朗，自信，魅力', love: '阳光恋人，自信魅力', career: '女强人，开朗领导', wealth: '自信理财，财源广进', health: '阳光开朗，健康活力', reversed: '刻薄，嫉妒心强', image: '🔥' },
  { id: 35, name: '权杖国王', type: '小阿卡纳·权杖', number: '国王', element: '火', meaning: '领导力，魄力，远见', love: '成熟稳重，有担当', career: '成熟领导，事业有成', wealth: '投资大师，财富雄厚', health: '精力充沛，气度不凡', reversed: '专横，脾气暴躁', image: '🔥' },
  { id: 36, name: '圣杯首牌', type: '小阿卡纳·圣杯', number: 'ACE', element: '水', meaning: '爱，新感情，灵感', love: '美好恋情开始，真心相爱', career: '灵感涌现，创意工作', wealth: '感情带来财富', health: '心情愉悦，身心健康', reversed: '感情空虚，虚假爱情', image: '💧' },
  { id: 37, name: '圣杯二', type: '小阿卡纳·圣杯', number: '2', element: '水', meaning: '结合，平等，真爱', love: '两情相悦，心心相印', career: '平等合作，互惠互利', wealth: '合伙生财，利益均分', health: '身心和谐，阴阳平衡', reversed: '分离，不平衡，破裂', image: '💧' },
  { id: 38, name: '圣杯三', type: '小阿卡纳·圣杯', number: '3', element: '水', meaning: '庆祝，喜悦，聚会', love: '三角关系，多人恋情', career: '团队合作，庆祝成功', wealth: '分享财富，共同富裕', health: '心情愉快，社交活动', reversed: '不欢而散，第三者', image: '💧' },
  { id: 39, name: '圣杯四', type: '小阿卡纳·圣杯', number: '4', element: '水', meaning: '不满，冷漠，倦怠', love: '感情倦怠，不满足', career: '工作倦怠，缺乏热情', wealth: '不满现状，寻求突破', health: '精神倦怠，缺乏活力', reversed: '新机会，重拾热情', image: '💧' },
  { id: 40, name: '圣杯五', type: '小阿卡纳·圣杯', number: '5', element: '水', meaning: '失落，悲伤，后悔', love: '失恋，悲伤，悔恨当初', career: '事业挫折，团队失落', wealth: '损失财富，追悔莫及', health: '情绪低落，郁郁寡欢', reversed: '放下过去，重拾希望', image: '💧' },
  { id: 41, name: '圣杯六', type: '小阿卡纳·圣杯', number: '6', element: '水', meaning: '回忆，童年，关怀', love: '青梅竹马，照顾对方', career: '前辈提携，贵人相助', wealth: '遗产，长辈赠予', health: '回忆美好，心情舒畅', reversed: '活在过去，无法前进', image: '💧' },
  { id: 42, name: '圣杯七', type: '小阿卡纳·圣杯', number: '7', element: '水', meaning: '幻想，选择，诱惑', love: '桃花朵朵，面临选择', career: '多个机会，需要选择', wealth: '多种投资，眼花缭乱', health: '不切实际，空想健康', reversed: '诱惑太多，无法抉择', image: '💧' },
  { id: 43, name: '圣杯八', type: '小阿卡纳·圣杯', number: '8', element: '水', meaning: '放弃，追寻，离开', love: '放弃旧爱，寻找真爱', career: '放弃现有，追寻梦想', wealth: '放弃小利，追求更大', health: '放弃旧习，追求健康', reversed: '害怕放弃，停滞不前', image: '💧' },
  { id: 44, name: '圣杯九', type: '小阿卡纳·圣杯', number: '9', element: '水', meaning: '满足，愿望，成就', love: '心满意足，愿望达成', career: '事业满足，成就感', wealth: '财富满足，应有尽有', health: '身心满足，健康快乐', reversed: '贪婪，不满足', image: '💧' },
  { id: 45, name: '圣杯十', type: '小阿卡纳·圣杯', number: '10', element: '水', meaning: '幸福，家庭，圆满', love: '天伦之乐，幸福家庭', career: '家庭事业兼顾', wealth: '家族兴旺，富足安康', health: '家庭幸福，身体健康', reversed: '家庭纷争，不幸福', image: '💧' },
  { id: 46, name: '圣杯侍从', type: '小阿卡纳·圣杯', number: '侍从', element: '水', meaning: '体贴，温柔，消息', love: '温柔体贴，初恋般感觉', career: '体贴下属，关心同事', wealth: '好消息，偏财入门', health: '温柔调理，心情愉快', reversed: '幼稚，情绪化', image: '💧' },
  { id: 47, name: '圣杯骑士', type: '小阿卡纳·圣杯', number: '骑士', element: '水', meaning: '浪漫，温柔，多情', love: '白马王子，浪漫多情', career: '优雅工作，人际良好', wealth: '优雅生财，不露锋芒', health: '温和调理，生活优雅', reversed: '花心，不切实际', image: '💧' },
  { id: 48, name: '圣杯王后', type: '小阿卡纳·圣杯', number: '王后', element: '水', meaning: '慈爱，温柔，直觉', love: '慈爱恋人，温柔贤淑', career: '慈爱领导，善解人意', wealth: '温柔生财，人脉致富', health: '慈爱养生，善解人意', reversed: '情绪不稳，缺乏爱心', image: '💧' },
  { id: 49, name: '圣杯国王', type: '小阿卡纳·圣杯', number: '国王', element: '水', meaning: '成熟，慈爱，宽容', love: '成熟稳重，慈爱的伴侣', career: '成熟领导，仁慈宽厚', wealth: '慈善家，财富用于善事', health: '仁慈养心，健康长寿', reversed: '情绪控制，不诚实', image: '💧' },
  { id: 50, name: '宝剑首牌', type: '小阿卡纳·宝剑', number: 'ACE', element: '风', meaning: '理智，真理，突破', love: '理智恋爱，突破阻碍', career: '理智决策，突破困境', wealth: '理智投资，突破瓶颈', health: '理智养生，对症下药', reversed: '妄念，失败，动乱', image: '💨' },
  { id: 51, name: '宝剑二', type: '小阿卡纳·宝剑', number: '2', element: '风', meaning: '平衡，僵局，回避', love: '冷战，僵持不下', career: '工作僵局，回避问题', wealth: '财务僵局，需要决断', health: '身心失衡，需要平衡', reversed: '僵局打破，露出真相', image: '💨' },
  { id: 52, name: '宝剑三', type: '小阿卡纳·宝剑', number: '3', element: '风', meaning: '心碎，悲伤，痛苦', love: '心碎，失恋痛苦', career: '职场伤心，背叛打击', wealth: '财富损失，心痛不已', health: '心痛，心脏问题', reversed: '康复，走出悲伤', image: '💨' },
  { id: 53, name: '宝剑四', type: '小阿卡纳·宝剑', number: '4', element: '风', meaning: '休息，沉思，恢复', love: '感情休息，冷静思考', career: '工作休息，养精蓄锐', wealth: '财务休整，静观其变', health: '休息养病，恢复健康', reversed: '行动，重新开始', image: '💨' },
  { id: 54, name: '宝剑五', type: '小阿卡纳·宝剑', number: '5', element: '风', meaning: '争执，冲突，胜利', love: '感情争执，口舌之争', career: '职场斗争，口舌是非', wealth: '因争执破财', health: '口舌上火，注意言行', reversed: '和解，认输，和平解决', image: '💨' },
  { id: 55, name: '宝剑六', type: '小阿卡纳·宝剑', number: '6', element: '风', meaning: '过渡期，平静，旅行', love: '过渡期，平静疗伤', career: '平稳过渡，出差旅行', wealth: '缓慢恢复，渐渐好转', health: '逐渐康复，平静调理', reversed: '停滞，无法前进', image: '💨' },
  { id: 56, name: '宝剑七', type: '小阿卡纳·宝剑', number: '7', element: '风', meaning: '尝试，野心，灵活', love: '新的尝试，灵活应变', career: '新方法，策略调整', wealth: '灵活理财，尝试新方式', health: '尝试新疗法，灵活调理', reversed: '建议无用，行不通', image: '💨' },
  { id: 57, name: '宝剑八', type: '小阿卡纳·宝剑', number: '8', element: '风', meaning: '束缚，限制，困境', love: '感情束缚，画地为牢', career: '工作受困，发展受限', wealth: '财务受限，资金紧张', health: '身体受限，行动困难', reversed: '自由，解除束缚', image: '💨' },
  { id: 58, name: '宝剑九', type: '小阿卡纳·宝剑', number: '9', element: '风', meaning: '焦虑，失眠，痛苦', love: '爱情焦虑，失眠多梦', career: '工作焦虑，压力太大', wealth: '财务焦虑，失眠担心', health: '精神焦虑，神经衰弱', reversed: '释然，走出痛苦', image: '💨' },
  { id: 59, name: '宝剑十', type: '小阿卡纳·宝剑', number: '10', element: '风', meaning: '失败，结束，极端', love: '彻底结束，心碎到底', career: '彻底失败，终结', wealth: '彻底破产，一无所有', health: '病入膏肓，需要重生', reversed: '绝地重生，绝处逢生', image: '💨' },
  { id: 60, name: '宝剑侍从', type: '小阿卡纳·宝剑', number: '侍从', element: '风', meaning: '机警，谨慎，消息', love: '机警恋爱，保持距离', career: '机警工作，谨慎行事', wealth: '谨慎理财，小道消息', health: '机警养生，注意细节', reversed: '粗心大意，判断错误', image: '💨' },
  { id: 61, name: '宝剑骑士', type: '小阿卡纳·宝剑', number: '骑士', element: '风', meaning: '激进，勇敢，冲动', love: '激进恋爱，冲动表白', career: '雷厉风行，说干就干', wealth: '激进投资，快进快出', health: '运动过度，需要冷静', reversed: '鲁莽，有勇无谋', image: '💨' },
  { id: 62, name: '宝剑王后', type: '小阿卡纳·宝剑', number: '王后', element: '风', meaning: '理智，独立，公平', love: '理智恋爱，保持独立', career: '理智领导，独立公正', wealth: '理智理财，独立分析', health: '理智养生，思维清晰', reversed: '刻薄，心胸狭窄', image: '💨' },
  { id: 63, name: '宝剑国王', type: '小阿卡纳·宝剑', number: '国王', element: '风', meaning: '权威，理性，专业', love: '权威伴侣，理性成熟', career: '专业权威，理性领导', wealth: '专业投资，财富权威', health: '专业调理，权威建议', reversed: '独裁，冷酷无情', image: '💨' },
  { id: 64, name: '星币首牌', type: '小阿卡纳·星币', number: 'ACE', element: '土', meaning: '财富，物质，新机会', love: '物质基础，稳定恋情', career: '新的财源，事业机会', wealth: '天降财运，物质收获', health: '营养补充，物质调理', reversed: '破财，虚假机会', image: '💰' },
  { id: 65, name: '星币二', type: '小阿卡纳·星币', number: '2', element: '土', meaning: '平衡，灵活，波动', love: '感情平衡，灵活经营', career: '工作平衡，灵活应对', wealth: '财务平衡，收支波动', health: '劳逸结合，平衡调理', reversed: '失衡，财务危机', image: '💰' },
  { id: 66, name: '星币三', type: '小阿卡纳·星币', number: '3', element: '土', meaning: '合作，技能，成果', love: '三人恋情，合作关系', career: '团队合作，技能展示', wealth: '合作生财，技能致富', health: '多方调理，共同作用', reversed: '合作破裂，技能不足', image: '💰' },
  { id: 67, name: '星币四', type: '小阿卡纳·星币', number: '4', element: '土', meaning: '控制，占有，吝啬', love: '控制对方，占有欲强', career: '守住职位，控制局面', wealth: '守财奴，吝啬小气', health: '保守养生，不敢突破', reversed: '放手，挥霍，失控', image: '💰' },
  { id: 68, name: '星币五', type: '小阿卡纳·星币', number: '5', element: '土', meaning: '贫困，疾病，无助', love: '贫贱夫妻，爱情匮乏', career: '事业贫困，无助困境', wealth: '财务贫困，经济危机', health: '疾病缠身，贫困潦倒', reversed: '恢复，走出困境', image: '💰' },
  { id: 69, name: '星币六', type: '小阿卡纳·星币', number: '6', element: '土', meaning: '给予，慈善，施与', love: '付出爱情，给予对方', career: '提携下属，施与恩惠', wealth: '施舍助人，财富分配', health: '布施养生，助人为乐', reversed: '吝啬，自私，不公平', image: '💰' },
  { id: 70, name: '星币七', type: '小阿卡纳·星币', number: '7', element: '土', meaning: '等待，评估，收获', love: '等待收获，评估感情', career: '等待成果，评估投资', wealth: '投资回报，等待收获', health: '等待康复，评估效果', reversed: '无回报，投资失败', image: '💰' },
  { id: 71, name: '星币八', type: '小阿卡纳·星币', number: '8', element: '土', meaning: '技能，专注，努力', love: '专心经营，工匠精神', career: '专注工作，精益求精', wealth: '技能致富，勤劳致富', health: '专注调理，精益求精', reversed: '缺乏技能，不专心', image: '💰' },
  { id: 72, name: '星币九', type: '小阿卡纳·星币', number: '9', element: '土', meaning: '富足，享受，成就', love: '独自享受，单身贵族', career: '事业成就，享受成果', wealth: '富足安康，享受人生', health: '养尊处优，生活富足', reversed: '失败，失去拥有', image: '💰' },
  { id: 73, name: '星币十', type: '小阿卡纳·星币', number: '10', element: '土', meaning: '富裕，家族，传承', love: '家族联姻，门当户对', career: '家族企业，财富传承', wealth: '家族富裕，家财万贯', health: '家族遗传，长寿基因', reversed: '家族衰败，失去传承', image: '💰' },
  { id: 74, name: '星币侍从', type: '小阿卡纳·星币', number: '侍从', element: '土', meaning: '学习，认真，务实', love: '认真恋爱，务实爱情', career: '认真学习，务实工作', wealth: '认真理财，学习投资', health: '认真养生，学习调理', reversed: '不切实际，懒惰', image: '💰' },
  { id: 75, name: '星币骑士', type: '小阿卡纳·星币', number: '骑士', element: '土', meaning: '踏实，努力，可靠', love: '踏实可靠，努力追求', career: '踏实工作，努力肯干', wealth: '踏实理财，勤劳致富', health: '踏实锻炼，健康可靠', reversed: '懒惰，不可靠', image: '💰' },
  { id: 76, name: '星币王后', type: '小阿卡纳·星币', number: '王后', element: '土', meaning: '富有，享受，务实', love: '富足恋人，务实贤淑', career: '富而好礼，务实领导', wealth: '富足安康，善于理财', health: '富足养生，生活优越', reversed: '拜金，虚荣，不切实际', image: '💰' },
  { id: 77, name: '星币国王', type: '小阿卡纳·星币', number: '国王', element: '土', meaning: '富豪，成功，商业头脑', love: '富豪伴侣，成功稳重', career: '商业巨子，事业成功', wealth: '大富豪，商业头脑', health: '富贵养生，稳重健康', reversed: '守财奴，唯利是图', image: '💰' },
]

const SPREADS = [
  { name: '单牌占卜', cards: 1, desc: '简单直接，一问一答', icon: '🎴' },
  { name: '三牌阵', cards: 3, desc: '过去-现在-未来', icon: '⭐' },
  { name: '凯尔特十字', cards: 10, desc: '全面详细的占卜', icon: '✝️' },
]

const getCardColor = (element: string) => {
  switch (element) {
    case '火': return '#ef4444'
    case '水': return '#3b82f6'
    case '风': return '#06b6d4'
    case '土': return '#f59e0b'
    default: return '#a78bfa'
  }
}

export default function TaluoPage() {
  const [selectedSpread, setSelectedSpread] = useState(0)
  const [drawnCards, setDrawnCards] = useState<typeof TAROT_CARDS>([])
  const [isDrawn, setIsDrawn] = useState(false)
  const [revealed, setRevealed] = useState<boolean[]>([])
  const [selectedCard, setSelectedCard] = useState<typeof TAROT_CARDS[0] | null>(null)
  const [isReversed, setIsReversed] = useState<boolean[]>([])
  const [filterType, setFilterType] = useState('全部')

  const drawCards = () => {
    if (isDrawn) return
    setIsDrawn(true)

    const spread = SPREADS[selectedSpread]
    const cards: typeof TAROT_CARDS = []
    const rev: boolean[] = []

    while (cards.length < spread.cards) {
      const idx = Math.floor(Math.random() * TAROT_CARDS.length)
      if (!cards.find(c => c.id === TAROT_CARDS[idx].id)) {
        cards.push(TAROT_CARDS[idx])
        rev.push(Math.random() > 0.5)
      }
    }

    setDrawnCards(cards)
    setIsReversed(rev)
    setRevealed(Array(spread.cards).fill(false))
  }

  const revealCard = (index: number) => {
    setRevealed(prev => {
      const next = [...prev]
      next[index] = true
      return next
    })
    setSelectedCard(drawnCards[index])
  }

  const reset = () => {
    setDrawnCards([])
    setIsDrawn(false)
    setRevealed([])
    setSelectedCard(null)
    setIsReversed([])
  }

  const filteredCards = filterType === '全部'
    ? TAROT_CARDS
    : TAROT_CARDS.filter(c => c.type === filterType)

  return (
    <SubPageTemplate
      title="塔罗牌占卜"
      subtitle="神秘力量 · 潜意识投射 · 指引命运 · 预见未来"
      icon="🎴"
      colorRgb="168, 85, 247"
    >
      <SubPageSection title="🔮 开始占卜">
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1))',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(168, 85, 247, 0.3)',
        }}>
          <InfoCard>
            <p style={{ color: 'rgba(180, 180, 190, 0.75)', textAlign: 'center' }}>
              静心凝神，将你的问题投射到潜意识中，然后选择牌阵开始占卜
            </p>
          </InfoCard>

          {!isDrawn && (
            <>
              <h4 style={{ color: '#a855f7', textAlign: 'center', margin: '1.5rem 0 1rem' }}>
                选择牌阵
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
              }}>
                {SPREADS.map((spread, i) => (
                  <motion.div
                    key={spread.name}
                    whileHover={{ scale: 1.03, y: -4 }}
                    onClick={() => setSelectedSpread(i)}
                    style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      background: selectedSpread === i
                        ? 'rgba(168, 85, 247, 0.2)'
                        : 'rgba(0,0,0,0.2)',
                      borderRadius: '10px',
                      border: selectedSpread === i
                        ? '2px solid #a855f7'
                        : '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {spread.icon}
                    </div>
                    <h4 style={{ color: selectedSpread === i ? '#a855f7' : 'rgba(180, 180, 190, 0.8)' }}>
                      {spread.name}
                    </h4>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.6)',
                      fontSize: '0.8rem',
                      margin: 0,
                    }}>
                      {spread.desc} ({spread.cards}张)
                    </p>
                  </motion.div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={drawCards}
                  style={{
                    padding: '1rem 3rem',
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    border: 'none',
                    borderRadius: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  🎴 洗牌抽牌
                </motion.button>
              </div>
            </>
          )}

          {isDrawn && (
            <div>
              <h4 style={{ color: '#a855f7', textAlign: 'center', margin: '1rem 0' }}>
                ✨ 点击每张牌翻开
              </h4>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                margin: '2rem 0',
              }}>
                {drawnCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05, y: -8 }}
                    onClick={() => !revealed[i] && revealCard(i)}
                    style={{
                      width: '120px',
                      height: '180px',
                      perspective: '1000px',
                      cursor: revealed[i] ? 'default' : 'pointer',
                    }}
                  >
                    <motion.div
                      animate={{
                        rotateY: revealed[i] ? (isReversed[i] ? 540 : 360) : 0,
                      }}
                      transition={{ duration: 0.8 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
                      }}>
                        🎴
                      </div>
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                        border: `2px solid ${getCardColor(card.element)}`,
                        padding: '0.75rem',
                        textAlign: 'center',
                        transform: 'rotateY(180deg)',
                      }}>
                        <div style={{ fontSize: '2rem' }}>
                          {card.image}
                        </div>
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          color: getCardColor(card.element),
                        }}>
                          {card.number} {card.name}
                        </div>
                        {isReversed[i] && (
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#ef4444',
                            marginTop: '0.25rem',
                          }}>
                            (逆位)
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {selectedCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(168, 85, 247, 0.1)',
                      borderRadius: '10px',
                      border: `2px solid ${getCardColor(selectedCard.element)}50`,
                      marginTop: '1rem',
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '3rem' }}>{selectedCard.image}</span>
                      <h3 style={{ color: getCardColor(selectedCard.element), margin: '0.5rem 0' }}>
                        {selectedCard.number} {selectedCard.name}
                        {isReversed[drawnCards.findIndex(c => c.id === selectedCard.id)] && ' 【逆位】'}
                      </h3>
                      <span style={{
                        padding: '0.2rem 0.75rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        background: `${getCardColor(selectedCard.element)}30`,
                        color: getCardColor(selectedCard.element),
                      }}>
                        {selectedCard.type} · {selectedCard.element}元素
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '0.75rem',
                      marginTop: '1rem',
                    }}>
                      {!isReversed[drawnCards.findIndex(c => c.id === selectedCard.id)] ? (
                        <>
                          {[
                            { label: '🔮 核心含义', value: selectedCard.meaning },
                            { label: '💕 感情运势', value: selectedCard.love },
                            { label: '💼 事业运势', value: selectedCard.career },
                            { label: '💰 财富运势', value: selectedCard.wealth },
                            { label: '🏥 健康运势', value: selectedCard.health },
                          ].map(item => (
                            <div key={item.label} style={{
                              padding: '0.75rem',
                              background: 'rgba(0,0,0,0.2)',
                              borderRadius: '8px',
                            }}>
                              <div style={{
                                color: getCardColor(selectedCard.element),
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                marginBottom: '0.25rem',
                              }}>
                                {item.label}
                              </div>
                              <p style={{
                                color: 'rgba(180, 180, 190, 0.8)',
                                fontSize: '0.8rem',
                                margin: 0,
                              }}>
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                          <h4 style={{ color: '#ef4444' }}>⚠️ 逆位含义</h4>
                          <p style={{ color: 'rgba(180, 180, 190, 0.8)' }}>
                            {selectedCard.reversed}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  🔄 重新占卜
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </SubPageSection>

      <SubPageSection title="📚 78张塔罗牌全解">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}>
          {['全部', '大阿卡纳', '小阿卡纳·权杖', '小阿卡纳·圣杯', '小阿卡纳·宝剑', '小阿卡纳·星币'].map(type => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
              style={{
                padding: '0.5rem 1rem',
                background: filterType === type
                  ? 'rgba(168, 85, 247, 0.3)'
                  : 'rgba(0,0,0,0.2)',
                border: filterType === type
                  ? '1px solid #a855f7'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50px',
                color: filterType === type ? '#a855f7' : '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {type}
            </motion.button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '0.75rem',
        }}>
          {filteredCards.map(card => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => {
                setDrawnCards([card])
                setIsReversed([false])
                setRevealed([true])
                setIsDrawn(true)
                setSelectedCard(card)
              }}
              style={{
                padding: '0.75rem',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                border: `1px solid ${getCardColor(card.element)}50`,
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '1.75rem' }}>{card.image}</div>
              <div style={{
                fontSize: '0.75rem',
                color: getCardColor(card.element),
                marginTop: '0.25rem',
              }}>
                {card.number}. {card.name}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
