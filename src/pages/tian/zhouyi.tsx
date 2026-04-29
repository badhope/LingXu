'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const TRIGRAMS = [
  { name: '乾', symbol: '☰', nature: '天', element: '金', meaning: '刚健中正，自强不息' },
  { name: '兑', symbol: '☱', nature: '泽', element: '金', meaning: '喜悦和悦，泽被万物' },
  { name: '离', symbol: '☲', nature: '火', element: '火', meaning: '光明绚丽，附丽中正' },
  { name: '震', symbol: '☳', nature: '雷', element: '木', meaning: '震动奋发，谨慎行事' },
  { name: '巽', symbol: '☴', nature: '风', element: '木', meaning: '柔顺深入，无孔不入' },
  { name: '坎', symbol: '☵', nature: '水', element: '水', meaning: '险难重重，坚守正道' },
  { name: '艮', symbol: '☶', nature: '山', element: '土', meaning: '静止稳重，适可而止' },
  { name: '坤', symbol: '☷', nature: '地', element: '土', meaning: '厚德载物，包容万物' },
]

const HEXAGRAMS = [
  { id: 1, name: '乾为天', upper: '乾', lower: '乾', symbol: '䷀', level: '上上卦', meaning: '元亨利贞，天行健，君子以自强不息', detail: '此卦纯阳，象征天地宇宙的创造力。大象行空，自强不息，飞龙在天，利见大人。占得此卦，诸事亨通，但需戒骄戒躁。', career: '青云直上，贵人相助，可成大业', wealth: '正财偏财皆旺，财运亨通', love: '阳刚之配，美满良缘', health: '身体康健，阳气充足' },
  { id: 2, name: '坤为地', upper: '坤', lower: '坤', symbol: '䷁', level: '上上卦', meaning: '厚德载物，地势坤，君子以厚德载物', detail: '纯阴之卦，象征大地的包容与承载。君子厚德载物，柔顺承天，含弘光大，品物咸亨。', career: '稳健发展，厚积薄发', wealth: '积累财富，细水长流', love: '温柔贤淑，百年好合', health: '阴气平和，注意脾胃' },
  { id: 3, name: '水雷屯', upper: '坎', lower: '震', symbol: '䷂', level: '下下卦', meaning: '万物始生，艰难困苦，玉汝于成', detail: '雷雨交加，万物萌生，象征创业之初的艰难。君子以经纶，但不宜冒进，静待时机。', career: '创业艰难，步步为营', wealth: '财运未至，不宜投资', love: '恋情初始，波折较多', health: '注意肾脏，保养精气' },
  { id: 4, name: '山水蒙', upper: '艮', lower: '坎', symbol: '䷃', level: '中中卦', meaning: '启蒙发智，童蒙求我，匪我求童蒙', detail: '山下出泉，泉水始流而未远，象征启蒙教育。君子以果行育德，启发蒙昧。', career: '学习成长，虚心求教', wealth: '小财可得，不宜贪求', love: '感情懵懂，需要引导', health: '注意养生，学习保健' },
  { id: 5, name: '水天需', upper: '坎', lower: '乾', symbol: '䷄', level: '中上卦', meaning: '等待时机，云上于天，君子以饮食宴乐', detail: '云上于天，待时而雨，象征等待时机。君子观此卦象，从而知所待，饮食宴乐，养精蓄锐。', career: '静待时机，厚积薄发', wealth: '财运将至，耐心等待', love: '良缘将至，不宜急躁', health: '饮食调养，劳逸结合' },
  { id: 6, name: '天水讼', upper: '乾', lower: '坎', symbol: '䷅', level: '中下卦', meaning: '争讼是非，天与水违行，君子以作事谋始', detail: '天西水东，背道而驰，象征争讼。君子作事谋始，杜绝争讼之源。有孚窒惕，中吉终凶。', career: '避免争端，和为贵', wealth: '因讼破财，和气生财', love: '口舌是非，相互体谅', health: '心火上炎，心平气和' },
  { id: 7, name: '地水师', upper: '坤', lower: '坎', symbol: '䷆', level: '中上卦', meaning: '兵众之道，地中有水，君子以容民畜众', detail: '地中有水，水藏于地，象征兵众。君子以容民畜众，容保无疆。师出以律，否臧凶。', career: '领导有方，众志成城', wealth: '众擎易举，集腋成裘', love: '包容对方，长相厮守', health: '养精蓄锐，固本培元' },
  { id: 8, name: '水地比', upper: '坎', lower: '坤', symbol: '䷇', level: '上上卦', meaning: '亲比相辅，地上有水，先王以建万国亲诸侯', detail: '地上有水，水依附于地，象征亲比相辅。先王以建万国，亲诸侯，相亲相辅。', career: '贵人相助，得道多助', wealth: '朋友相助，财源广进', love: '两情相悦，佳偶天成', health: '身心安泰，贵人扶持' },
  { id: 9, name: '风天小畜', upper: '巽', lower: '乾', symbol: '䷈', level: '中下卦', meaning: '小有蓄积，风行天上，君子以懿文德', detail: '风行天上，密云不雨，象征小有蓄积而未能大成。君子以懿文德，修养德行。', career: '小有成就，继续努力', wealth: '小财可得，大财未至', love: '小有进展，还需努力', health: '注意调理，防止小病' },
  { id: 10, name: '天泽履', upper: '乾', lower: '兑', symbol: '䷉', level: '中上卦', meaning: '践履而行，上天下泽，君子以辨上下定民志', detail: '上天下泽，尊卑有别，象征行礼如仪。君子以辨上下，定民志，履道坦坦，幽人贞吉。', career: '按部就班，步步高升', wealth: '正道取财，取之有道', love: '相敬如宾，举案齐眉', health: '起居有常，健康长寿' },
  { id: 11, name: '地天泰', upper: '坤', lower: '乾', symbol: '䷊', level: '上上卦', meaning: '通泰吉祥，天地交泰，后以财成天地之道', detail: '天地交而万物通，上下交而其志同。小往大来，吉亨。此卦为六十四卦中最吉之卦。', career: '鸿运当头，百事顺遂', wealth: '财源滚滚，大富大贵', love: '天作之合，美满幸福', health: '身康体健，百病不侵' },
  { id: 12, name: '天地否', upper: '乾', lower: '坤', symbol: '䷋', level: '下下卦', meaning: '闭塞不通，天地不交，君子以俭德辟难', detail: '天地不交，万物不通，上下不交，天下无邦。君子以俭德辟难，不可荣以禄。', career: '运势低迷，宜守不宜进', wealth: '破财免灾，不宜投资', love: '感情不和，沟通困难', health: '气滞血瘀，注意调理' },
  { id: 13, name: '天火同人', upper: '乾', lower: '离', symbol: '䷌', level: '上上卦', meaning: '同人和合，天与火同人，君子以类族辨物', detail: '天与火，性相同而相亲，象征同人。君子以类族辨物，同人于野，亨。利涉大川，利君子贞。', career: '同人协力，其利断金', wealth: '合作共赢，财源广进', love: '志同道合，比翼双飞', health: '心情舒畅，百病皆消' },
  { id: 14, name: '火天大有', upper: '离', lower: '乾', symbol: '䷍', level: '上上卦', meaning: '大富有也，火在天上，君子以遏恶扬善顺天休命', detail: '火在天上，普照万物，象征大富有。君子以遏恶扬善，顺天休命。大有，元亨。', career: '事业鼎盛，如日中天', wealth: '富贵荣华，应有尽有', love: '爱情甜蜜，富贵眷属', health: '容光焕发，精神矍铄' },
  { id: 15, name: '地山谦', upper: '坤', lower: '艮', symbol: '䷎', level: '上上卦', meaning: '谦虚受益，地中有山，君子以裒多益寡称物平施', detail: '地中有山，山本高而藏于地下，象征谦虚。君子以裒多益寡，称物平施。谦，亨，君子有终。', career: '谦虚谨慎，步步高升', wealth: '和气生财，财运亨通', love: '谦敬相爱，相敬如宾', health: '心平气和，健康长寿' },
  { id: 16, name: '雷地豫', upper: '震', lower: '坤', symbol: '䷏', level: '中上卦', meaning: '安乐喜悦，雷出地奋，先王以作乐崇德', detail: '雷出地奋，万物喜乐，象征和乐。先王以作乐崇德，殷荐之上帝，以配祖考。', career: '春风得意，大展宏图', wealth: '喜事临门，财源广进', love: '甜甜蜜蜜，欢乐和谐', health: '心情愉悦，身强体健' },
  { id: 17, name: '泽雷随', upper: '兑', lower: '震', symbol: '䷐', level: '中中卦', meaning: '随从正道，泽中有雷，君子以向晦入宴息', detail: '泽中有雷，雷动泽随，象征随从。君子以向晦入宴息，顺其自然。随，元亨利贞，无咎。', career: '随机应变，与时俱进', wealth: '随缘而得，不可强求', love: '随缘而遇，顺其自然', health: '起居有时，顺其自然' },
  { id: 18, name: '山风蛊', upper: '艮', lower: '巽', symbol: '䷑', level: '中下卦', meaning: '拯弊治乱，山下有风，君子以振民育德', detail: '山下有风，风遇山止而物腐，象征蛊坏。君子以振民育德，革除弊政。', career: '革故鼎新，重整旗鼓', wealth: '先破后立，否极泰来', love: '感情遇挫，需要修复', health: '积劳成疾，及时调理' },
  { id: 19, name: '地泽临', upper: '坤', lower: '兑', symbol: '䷒', level: '中上卦', meaning: '居高临下，泽上有地，君子以教思无穷容保民无疆', detail: '泽上有地，地高临泽，象征临御。君子以教思无穷，容保民无疆。临，元亨利贞。', career: '领导有方，恩威并济', wealth: '居高临下，财源滚滚', love: '相互包容，长相厮守', health: '调养身心，益寿延年' },
  { id: 20, name: '风地观', upper: '巽', lower: '坤', symbol: '䷓', level: '中中卦', meaning: '观察观摩，风行地上，先王以省方观民设教', detail: '风行地上，周行万物，象征观察。先王以省方观民设教。观，盥而不荐，有孚颙若。', career: '审时度势，厚积薄发', wealth: '观望待时，不宜急进', love: '观察了解，不宜冲动', health: '体检养生，防患未然' },
  { id: 21, name: '火雷噬嗑', upper: '离', lower: '震', symbol: '䷔', level: '中中卦', meaning: '刑罚决断，雷电合而章，先王以明罚敕法', detail: '雷电交加，威震天下，象征刑罚。先王以明罚敕法。噬嗑，亨，利用狱。', career: '果断决策，雷厉风行', wealth: '劳而后得，辛勤致富', love: '需要磨合，终成眷属', health: '运动健身，强身健体' },
  { id: 22, name: '山火贲', upper: '艮', lower: '离', symbol: '䷕', level: '中上卦', meaning: '文饰美化，山下有火，君子以明庶政无敢折狱', detail: '山下有火，火照山峦，象征文饰。君子以明庶政，无敢折狱。贲，亨，小利有攸往。', career: '仪表堂堂，文采斐然', wealth: '锦上添花，财运亨通', love: '郎才女貌，天作之合', health: '容光焕发，神采奕奕' },
  { id: 23, name: '山地剥', upper: '艮', lower: '坤', symbol: '䷖', level: '下下卦', meaning: '剥落侵蚀，山附于地，上以厚下安宅', detail: '山附于地，山体剥落，象征衰败。上以厚下安宅。剥，不利有攸往。', career: '运势低迷，宜守不宜攻', wealth: '财运剥落，量入为出', love: '感情疏远，需要挽回', health: '体质下降，注意进补' },
  { id: 24, name: '地雷复', upper: '坤', lower: '震', symbol: '䷗', level: '中上卦', meaning: '阳气回复，雷在地中，先王以至日闭关商旅不行', detail: '雷在地中，一阳来复，象征阳气回复。先王以至日闭关，商旅不行。复，亨。出入无疾，朋来无咎。', career: '否极泰来，东山再起', wealth: '财运回复，渐入佳境', love: '破镜重圆，重归于好', health: '阳气回复，身体康复' },
  { id: 25, name: '天雷无妄', upper: '乾', lower: '震', symbol: '䷘', level: '中中卦', meaning: '无妄之灾，天下雷行，万物皆实，先王以茂对时育万物', detail: '天下雷行，阳气奋发，万物皆实。先王以茂对时育万物。无妄，元亨利贞。其匪正有眚，不利有攸往。', career: '实事求是，不务虚名', wealth: '勤劳致富，不取横财', love: '真心实意，不欺不瞒', health: '清心寡欲，顺其自然' },
  { id: 26, name: '山天大畜', upper: '艮', lower: '乾', symbol: '䷙', level: '中上卦', meaning: '大蓄积也，天在山中，君子以多识前言往行以畜其德', detail: '天在山中，至大至刚，象征大蓄积。君子以多识前言往行，以畜其德。', career: '厚积薄发，大展宏图', wealth: '大富大贵，金玉满堂', love: '情根深种，长相厮守', health: '正气内存，邪不可干' },
  { id: 27, name: '山雷颐', upper: '艮', lower: '震', symbol: '䷚', level: '中中卦', meaning: '颐养之道，山下有雷，君子以慎言语节饮食', detail: '山下有雷，雷动而止，象征颐养。君子以慎言语，节饮食。颐，贞吉。观颐，自求口实。', career: '修身养性，静待时机', wealth: '养生致富，知足常乐', love: '颐养天年，相伴终老', health: '饮食调养，长命百岁' },
  { id: 28, name: '泽风大过', upper: '兑', lower: '巽', symbol: '䷛', level: '下下卦', meaning: '大过非常，泽灭木，君子以独立不惧遁世无闷', detail: '泽灭木，水漫过木，象征过甚。君子以独立不惧，遁世无闷。大过，栋桡，利有攸往，亨。', career: '非常时期，需要担当', wealth: '大破大立，否极泰来', love: '感情危机，需要担当', health: '身体透支，急需调养' },
  { id: 29, name: '坎为水', upper: '坎', lower: '坎', symbol: '䷜', level: '下下卦', meaning: '险难重重，水洊至，习坎，君子以常德行习教事', detail: '水洊至，重重险难，象征险陷。君子以常德行，习教事。习坎，有孚维心亨，行有尚。', career: '重重险阻，履险如夷', wealth: '财在险中求，稳中求胜', love: '患难见真情，共度难关', health: '注意肾脏，利水渗湿' },
  { id: 30, name: '离为火', upper: '离', lower: '离', symbol: '䷝', level: '中上卦', meaning: '光明附丽，明两作离，大人以继明照于四方', detail: '明两作，重明继照，象征光明。大人以继明照于四方。离，利贞亨。畜牝牛吉。', career: '前途光明，事业辉煌', wealth: '红红火火，财源广进', love: '热情似火，光明正大', health: '心火过旺，注意平衡' },
  { id: 31, name: '泽山咸', upper: '兑', lower: '艮', symbol: '䷞', level: '上上卦', meaning: '感应交感，山上有泽，君子以虚受人', detail: '山上有泽，山泽通气，象征感应。君子以虚受人。咸，亨利贞，取女吉。', career: '感而遂通，心想事成', wealth: '和气生财，有感必应', love: '心有灵犀，一见钟情', health: '身心交感，百病皆消' },
  { id: 32, name: '雷风恒', upper: '震', lower: '巽', symbol: '䷟', level: '上上卦', meaning: '恒久不易，雷风恒，君子以立不易方', detail: '雷风相与，巽动而常，象征恒久。君子以立不易方。恒，亨，无咎，利贞，利有攸往。', career: '持之以恒，终成大业', wealth: '细水长流，富贵久远', love: '天长地久，海枯石烂', health: '起居有常，长命百岁' },
  { id: 33, name: '天山遁', upper: '乾', lower: '艮', symbol: '䷠', level: '中中卦', meaning: '隐退避世，天下有山，君子以远小人不恶而严', detail: '天下有山，山高天远，象征遁退。君子以远小人，不恶而严。遁，亨，小利贞。', career: '急流勇退，明哲保身', wealth: '见好就收，知足常乐', love: '保持距离，美感长存', health: '归隐山林，颐养天年' },
  { id: 34, name: '雷天大壮', upper: '震', lower: '乾', symbol: '䷡', level: '中上卦', meaning: '强盛壮大，雷在天上，君子以非礼弗履', detail: '雷在天上，声势浩大，象征强盛。君子以非礼弗履。大壮，利贞。', career: '声势浩大，如日中天', wealth: '财大气粗，富贵逼人', love: '情浓意蜜，轰轰烈烈', health: '身强体壮，精力充沛' },
  { id: 35, name: '火地晋', upper: '离', lower: '坤', symbol: '䷢', level: '中上卦', meaning: '晋长进也，明出地上，君子以自昭明德', detail: '明出地上，旭日东升，象征晋升。君子以自昭明德。晋，康侯用锡马蕃庶，昼日三接。', career: '步步高升，青云直上', wealth: '日出东方，财源广进', love: '旭日初升，情投意合', health: '朝气蓬勃，容光焕发' },
  { id: 36, name: '地火明夷', upper: '坤', lower: '离', symbol: '䷣', level: '下下卦', meaning: '光明入地，明入地中，君子以莅众用晦而明', detail: '明入地中，光明被掩，象征昏暗。君子以莅众，用晦而明。明夷，利艰贞。', career: '怀才不遇，明哲保身', wealth: '财运昏暗，守旧为上', love: '地下恋情，难见天日', health: '气滞血瘀，心情抑郁' },
  { id: 37, name: '风火家人', upper: '巽', lower: '离', symbol: '䷤', level: '上上卦', meaning: '家庭和睦，风自火出，君子以言有物而行有恒', detail: '风自火出，火炽风生，象征家庭。君子以言有物，而行有恒。家人，利女贞。', career: '家业兴旺，事业有成', wealth: '家和万事兴，财源广进', love: '家庭幸福，天伦之乐', health: '家和心顺，百病皆消' },
  { id: 38, name: '火泽睽', upper: '离', lower: '兑', symbol: '䷥', level: '中下卦', meaning: '乖离异见，上火下泽，君子以同而异', detail: '上火下泽，水火相违，象征乖离。君子以同而异。睽，小事吉。', career: '求同存异，和而不同', wealth: '和气生财，不宜争执', love: '意见不合，需要沟通', health: '上火下寒，需要调和' },
  { id: 39, name: '山水蹇', upper: '艮', lower: '坎', symbol: '䷦', level: '下下卦', meaning: '艰难险阻，山上有水，君子以反身修德', detail: '山上有水，山路崎岖，象征险难。君子以反身修德。蹇，利西南，不利东北。利见大人，贞吉。', career: '前路艰险，修身养性', wealth: '财源艰险，不宜冒进', love: '情路坎坷，好事多磨', health: '肾虚水泛，健脾祛湿' },
  { id: 40, name: '雷水解', upper: '震', lower: '坎', symbol: '䷧', level: '中上卦', meaning: '解除困难，雷雨作，君子以赦过宥罪', detail: '雷雨作，百果草木皆甲坼，象征解除。君子以赦过宥罪。解，利西南。无所往，其来复吉。', career: '逢凶化吉，遇难呈祥', wealth: '解除困境，财运好转', love: '冰释前嫌，和好如初', health: '药到病除，身体康复' },
  { id: 41, name: '山泽损', upper: '艮', lower: '兑', symbol: '䷨', level: '中下卦', meaning: '减损之道，山下有泽，君子以惩忿窒欲', detail: '山下有泽，泽低山高，象征减损。君子以惩忿窒欲。损，有孚，元吉，无咎，可贞。', career: '损下益上，吃亏是福', wealth: '破财消灾，小损大利', love: '为爱付出，心甘情愿', health: '损有余补不足，阴阳平衡' },
  { id: 42, name: '风雷益', upper: '巽', lower: '震', symbol: '䷩', level: '上上卦', meaning: '增益之道，风雷益，君子以见善则迁有过则改', detail: '风雷相与，相得益彰，象征增益。君子以见善则迁，有过则改。益，利有攸往，利涉大川。', career: '如虎添翼，大展宏图', wealth: '锦上添花，日进斗金', love: '相得益彰，如胶似漆', health: '气血两旺，百病不生' },
  { id: 43, name: '泽天夬', upper: '兑', lower: '乾', symbol: '䷪', level: '中上卦', meaning: '果决决断，泽上于天，君子以施禄及下居德则忌', detail: '泽上于天，湖水决堤，象征决断。君子以施禄及下，居德则忌。夬，扬于王庭，孚号有厉。', career: '当机立断，功成名就', wealth: '决然而取，财运亨通', love: '大胆表白，终成眷属', health: '决断养生，健康长寿' },
  { id: 44, name: '天风姤', upper: '乾', lower: '巽', symbol: '䷫', level: '中中卦', meaning: '邂逅相遇，天下有风，后以施命诰四方', detail: '天下有风，风行天下，象征相遇。后以施命诰四方。姤，女壮，勿用取女。', career: '不期而遇，意外收获', wealth: '意外之财，不宜贪多', love: '萍水相逢，一见钟情', health: '调理风气，顺应自然' },
  { id: 45, name: '泽地萃', upper: '兑', lower: '坤', symbol: '䷬', level: '上上卦', meaning: '萃聚聚集，泽上于地，君子以除戎器戒不虞', detail: '泽上于地，水聚成泽，象征聚集。君子以除戎器，戒不虞。萃，亨。王假有庙。', career: '群英荟萃，大展宏图', wealth: '汇聚财富，堆金积玉', love: '汇聚真情，百年好合', health: '聚精会神，正气内存' },
  { id: 46, name: '地风升', upper: '坤', lower: '巽', symbol: '䷭', level: '上上卦', meaning: '升进上升，地中生木，君子以顺德积小以高大', detail: '地中生木，树木生长，象征升进。君子以顺德，积小以高大。升，元亨。用见大人，勿恤。', career: '步步高升，青云直上', wealth: '蒸蒸日上，日进斗金', love: '感情升温，如胶似漆', health: '阳气上升，身体康健' },
  { id: 47, name: '泽水困', upper: '兑', lower: '坎', symbol: '䷮', level: '下下卦', meaning: '困穷潦倒，泽无水，君子以致命遂志', detail: '泽无水，水干泽枯，象征困穷。君子以致命遂志。困，亨。贞，大人吉，无咎。', career: '陷入困境，君子固穷', wealth: '财运困窘，量入为出', love: '感情困惑，不知所措', health: '肾虚精亏，大补元气' },
  { id: 48, name: '水风井', upper: '坎', lower: '巽', symbol: '䷯', level: '中中卦', meaning: '井养不穷，木上有水，君子以劳民劝相', detail: '木上有水，井水养人，象征井养。君子以劳民劝相。井，改邑不改井，无丧无得。', career: '兢兢业业，造福一方', wealth: '细水长流，源源不断', love: '相濡以沫，井水不犯河水', health: '滋阴补肾，饮水思源' },
  { id: 49, name: '泽火革', upper: '兑', lower: '离', symbol: '䷰', level: '中上卦', meaning: '变革更新，泽中有火，君子以治历明时', detail: '泽中有火，水火相息，象征变革。君子以治历明时。革，巳日乃孚。元亨利贞，悔亡。', career: '革故鼎新，大展宏图', wealth: '破旧立新，财源广进', love: '焕然一新，重燃爱火', health: '脱胎换骨，焕然一新' },
  { id: 50, name: '火风鼎', upper: '离', lower: '巽', symbol: '䷱', level: '上上卦', meaning: '鼎新定业，木上有火，君子以正位凝命', detail: '木上有火，烹煮食物，象征鼎新。君子以正位凝命。鼎，元吉，亨。', career: '定鼎天下，成就霸业', wealth: '三足鼎立，财源广进', love: '定情信物，永结同心', health: '调和五味，营养均衡' },
  { id: 51, name: '震为雷', upper: '震', lower: '震', symbol: '䷲', level: '中中卦', meaning: '震动奋发，洊雷震，君子以恐惧修省', detail: '洊雷震，雷声相继，象征震动。君子以恐惧修省。震，亨。震来虩虩，笑言哑哑。', career: '一鸣惊人，奋发图强', wealth: '震惊四座，财源广进', love: '轰轰烈烈，惊心动魄', health: '振奋精神，运动健身' },
  { id: 52, name: '艮为山', upper: '艮', lower: '艮', symbol: '䷳', level: '中中卦', meaning: '静止稳重，兼山艮，君子以思不出其位', detail: '兼山艮，两山重叠，象征静止。君子以思不出其位。艮，其背不获其身，行其庭不见其人。', career: '稳如泰山，步步高升', wealth: '安如泰山，财富稳固', love: '稳如泰山，长相厮守', health: '静心养气，延年益寿' },
  { id: 53, name: '风山渐', upper: '巽', lower: '艮', symbol: '䷴', level: '上上卦', meaning: '渐进有序，山上有木，君子以居贤德善俗', detail: '山上有木，树木渐长，象征渐进。君子以居贤德善俗。渐，女归吉，利贞。', career: '循序渐进，终成大业', wealth: '日积月累，富甲一方', love: '青梅竹马，渐入佳境', health: '循序渐进，健康长寿' },
  { id: 54, name: '雷泽归妹', upper: '震', lower: '兑', symbol: '䷵', level: '下下卦', meaning: '少女出嫁，泽上有雷，君子以永终知敝', detail: '泽上有雷，雷鸣泽动，象征嫁女。君子以永终知敝。归妹，征凶，无攸利。', career: '急于求成，欲速不达', wealth: '急于求利，反受其害', love: '少女怀春，恨不相逢未嫁时', health: '气血躁动，静心调养' },
  { id: 55, name: '雷火丰', upper: '震', lower: '离', symbol: '䷶', level: '上上卦', meaning: '盛大丰足，雷电皆至，君子以折狱致刑', detail: '雷电皆至，威震光明，象征丰大。君子以折狱致刑。丰，亨。王假之，勿忧，宜日中。', career: '如日中天，丰功伟绩', wealth: '丰收富足，金玉满堂', love: '轰轰烈烈，丰姿绰约', health: '气血丰足，身体康健' },
  { id: 56, name: '火山旅', upper: '离', lower: '艮', symbol: '䷷', level: '中下卦', meaning: '行旅在外，山上有火，君子以明慎用刑而不留狱', detail: '山上有火，火炎山行，象征行旅。君子以明慎用刑，而不留狱。旅，小亨，旅贞吉。', career: '出门在外，入乡随俗', wealth: '他乡求财，不宜久留', love: '异地恋情，需要维护', health: '旅途劳顿，注意休息' },
  { id: 57, name: '巽为风', upper: '巽', lower: '巽', symbol: '䷸', level: '中上卦', meaning: '柔顺深入，随风巽，君子以申命行事', detail: '随风巽，风随风行，象征顺从。君子以申命行事。巽，小亨。利有攸往，利见大人。', career: '一帆风顺，如鱼得水', wealth: '八面来财，财源广进', love: '柔情似水，佳期如梦', health: '调理风气，呼吸吐纳' },
  { id: 58, name: '兑为泽', upper: '兑', lower: '兑', symbol: '䷹', level: '上上卦', meaning: '喜悦和悦，丽泽兑，君子以朋友讲习', detail: '丽泽兑，两泽相连，象征喜悦。君子以朋友讲习。兑，亨，利贞。', career: '和颜悦色，广结善缘', wealth: '和气生财，财源广进', love: '和和美美，甜甜蜜蜜', health: '心情愉悦，笑口常开' },
  { id: 59, name: '风水涣', upper: '巽', lower: '坎', symbol: '䷺', level: '中中卦', meaning: '涣散离散，风行水上，先王以享于帝立庙', detail: '风行水上，水波离散，象征涣散。先王以享于帝立庙。涣，亨。王假有庙。', career: '散财聚人，得道多助', wealth: '财来财去，不宜执着', love: '聚散离合，一切随缘', health: '活血化瘀，疏通经络' },
  { id: 60, name: '水泽节', upper: '坎', lower: '兑', symbol: '䷻', level: '中中卦', meaning: '节制有度，泽上有水，君子以制数度议德行', detail: '泽上有水，湖泊蓄水，象征节制。君子以制数度，议德行。节，亨。苦节不可贞。', career: '适可而止，过犹不及', wealth: '量入为出，节制消费', love: '发乎情止乎礼，相敬如宾', health: '饮食有节，起居有常' },
  { id: 61, name: '风泽中孚', upper: '巽', lower: '兑', symbol: '䷼', level: '上上卦', meaning: '诚信立身，泽上有风，君子以议狱缓死', detail: '泽上有风，风过泽中，象征诚信。君子以议狱缓死。中孚，豚鱼吉，利涉大川，利贞。', career: '诚信立业，厚德载物', wealth: '诚信生财，取之有道', love: '心心相印，信守承诺', health: '心平气和，百病不生' },
  { id: 62, name: '雷山小过', upper: '震', lower: '艮', symbol: '䷽', level: '中中卦', meaning: '小有过越，山上有雷，君子以行过乎恭丧过乎哀', detail: '山上有雷，雷声过山，象征小过。君子以行过乎恭，丧过乎哀，用过乎俭。', career: '小过无妨，大功可成', wealth: '小有亏损，大有所得', love: '吵吵闹闹，白头到老', health: '小恙无碍，加强锻炼' },
  { id: 63, name: '水火既济', upper: '坎', lower: '离', symbol: '䷾', level: '中上卦', meaning: '大功告成，水在火上，君子以思患而豫防之', detail: '水在火上，水火相济，象征完成。君子以思患而豫防之。既济，亨小，利贞。初吉终乱。', career: '大功告成，善始善终', wealth: '功成名就，富贵荣华', love: '修成正果，百年好合', health: '阴阳调和，百病皆消' },
  { id: 64, name: '火水未济', upper: '离', lower: '坎', symbol: '䷿', level: '中中卦', meaning: '未成之功，火在水上，君子以慎辨物居方', detail: '火在水上，水火不交，象征未完成。君子以慎辨物居方。未济，亨。小狐汔济，濡其尾，无攸利。', career: '革命尚未成功，同志仍需努力', wealth: '财运将至，临门一脚', love: '差一点就成了，再加把劲', health: '阴阳失调，还需调理' },
]

const COINS = ['⚫', '⚪']

export default function ZhouyiPage() {
  const [coins, setCoins] = useState<number[]>([])
  const [lines, setLines] = useState<number[]>([])
  const [result, setResult] = useState<typeof HEXAGRAMS[0] | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [changingLines, setChangingLines] = useState<number[]>([])

  const throwCoins = () => {
    if (lines.length >= 6) return
    setIsShaking(true)

    setTimeout(() => {
      const newCoins = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 1 : 0)
      setCoins(newCoins)

      const sum = newCoins.reduce((a: number, b: number) => a + b, 0)
      const line = sum >= 2 ? 1 : 0
      if (sum === 0 || sum === 3) {
        setChangingLines(prev => [...prev, lines.length])
      }

      setLines(prev => [...prev, line])
      setIsShaking(false)
    }, 1000)
  }

  const getHexagram = () => {
    if (lines.length < 6) return

    const lowerTrigram = lines.slice(0, 3).reduce((a, b) => a * 2 + b, 0)
    const upperTrigram = lines.slice(3, 6).reduce((a, b) => a * 2 + b, 0)

    const hexagram = HEXAGRAMS.find(
      h => TRIGRAMS[7 - upperTrigram].name === h.upper &&
           TRIGRAMS[7 - lowerTrigram].name === h.lower
    )

    setResult(hexagram || HEXAGRAMS[0])
  }

  const reset = () => {
    setCoins([])
    setLines([])
    setResult(null)
    setChangingLines([])
  }

  return (
    <SubPageTemplate
      title="周易六十四卦"
      subtitle="伏羲画卦 · 文王演易 · 孔子作传 · 究天人之际"
      icon="🌀"
      colorRgb="139, 92, 246"
    >
      <SubPageSection title="🪙 铜钱起卦">
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          textAlign: 'center',
        }}>
          <InfoCard>
            <p style={{ color: 'rgba(180, 180, 190, 0.75)' }}>
              心诚则灵，静心凝神，点击"掷铜钱"六次，由下而上，成六爻一卦
            </p>
          </InfoCard>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            margin: '2rem 0',
            minHeight: '80px',
          }}>
            {coins.map((coin, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                style={{
                  fontSize: '3rem',
                  opacity: isShaking ? 0.3 : 1,
                }}
              >
                {COINS[coin]}
              </motion.div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: 'rgba(180, 180, 190, 0.6)', marginBottom: '0.5rem' }}>
              已得 {lines.length}/6 爻
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  style={{
                    width: changingLines.includes(i) ? '120px' : '60px',
                    height: '12px',
                    background: line === 1 ? '#f59e0b' : '#666',
                    borderRadius: '6px',
                    display: changingLines.includes(i) ? 'flex' : 'block',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  {changingLines.includes(i) && (
                    <>
                      <div style={{
                        width: '50px',
                        height: '100%',
                        background: line === 1 ? '#f59e0b' : '#666',
                        borderRadius: '6px',
                      }} />
                      <div style={{
                        width: '50px',
                        height: '100%',
                        background: line === 1 ? '#f59e0b' : '#666',
                        borderRadius: '6px',
                      }} />
                    </>
                  )}
                  <span style={{
                    position: 'absolute',
                    right: '-50px',
                    top: '-4px',
                    color: changingLines.includes(i) ? '#ec4899' : 'rgba(180, 180, 190, 0.6)',
                    fontSize: '0.75rem',
                  }}>
                    {changingLines.includes(i) ? '变爻' : ''}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {lines.length < 6 && !result && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={throwCoins}
                disabled={isShaking}
                style={{
                  padding: '1rem 3rem',
                  fontSize: '1.1rem',
                  background: isShaking
                    ? 'rgba(0,0,0,0.3)'
                    : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: isShaking ? 'not-allowed' : 'pointer',
                }}
              >
                {isShaking ? '🎲 占卦中...' : '🪙 掷铜钱'}
              </motion.button>
            )}

            {lines.length === 6 && !result && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getHexagram}
                style={{
                  padding: '1rem 3rem',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                🔮 解卦
              </motion.button>
            )}

            {(lines.length > 0 || result) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                🔄 重新起卦
              </motion.button>
            )}
          </div>
        </div>
      </SubPageSection>

      <AnimatePresence>
        {result && (
          <SubPageSection title="📜 卦象详解">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '2rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '2px solid rgba(139, 92, 246, 0.4)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                  {result.symbol}
                </div>
                <h2 style={{
                  color: '#a78bfa',
                  fontSize: '1.8rem',
                  marginBottom: '0.5rem',
                }}>
                  第{result.id}卦 {result.name}
                </h2>
                <span style={{
                  padding: '0.25rem 1rem',
                  borderRadius: '50px',
                  background: result.level.includes('上') ? 'rgba(34, 197, 94, 0.2)' :
                              result.level.includes('下') ? 'rgba(239, 68, 68, 0.2)' :
                              'rgba(245, 158, 11, 0.2)',
                  color: result.level.includes('上') ? '#22c55e' :
                         result.level.includes('下') ? '#ef4444' : '#f59e0b',
                }}>
                  {result.level}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                {[
                  { label: '💼 事业运', value: result.career },
                  { label: '💰 财运', value: result.wealth },
                  { label: '💕 感情运', value: result.love },
                  { label: '🏥 健康运', value: result.health },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      color: '#a78bfa',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}>
                      {item.label}
                    </div>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.8)',
                      fontSize: '0.9rem',
                      margin: 0,
                    }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '10px',
                borderLeft: '4px solid #f59e0b',
              }}>
                <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>📖 《象曰》</h4>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.9)',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                }}>
                  {result.meaning}
                </p>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  marginTop: '1rem',
                  lineHeight: 1.8,
                }}>
                  {result.detail}
                </p>
              </div>
            </motion.div>
          </SubPageSection>
        )}
      </AnimatePresence>

      <SubPageSection title="☯️ 八卦基础">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
        }}>
          {TRIGRAMS.map((trigram, i) => (
            <motion.div
              key={trigram.name}
              whileHover={{ scale: 1.05, y: -4 }}
              style={{
                padding: '1.5rem 1rem',
                textAlign: 'center',
                background: 'rgba(139, 92, 246, 0.08)',
                borderRadius: '10px',
                border: '1px solid rgba(139, 92, 246, 0.25)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                {trigram.symbol}
              </div>
              <h3 style={{ color: '#a78bfa', marginBottom: '0.25rem' }}>
                {trigram.name}卦
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.6)',
                fontSize: '0.8rem',
              }}>
                象{trigram.nature} · {trigram.element}行
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
              }}>
                {trigram.meaning}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="📚 六十四卦速查">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '0.75rem',
        }}>
          {HEXAGRAMS.map(h => (
            <motion.div
              key={h.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => { setResult(h); setLines([1, 1, 1, 1, 1, 1]) }}
              style={{
                padding: '0.75rem',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{h.symbol}</div>
              <div style={{
                fontSize: '0.85rem',
                color: h.level.includes('上') ? '#22c55e' :
                       h.level.includes('下') ? '#ef4444' : '#f59e0b',
              }}>
                {h.id}. {h.name}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
