'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function YijingPage() {
  const [selectedGua, setSelectedGua] = useState<number>(0)

  const eightTrigrams = [
    {
      name: '乾',
      symbol: '☰',
      nature: '天',
      element: '金',
      family: '父',
      virtue: '健',
      lines: [1, 1, 1],
      feature: '纯阳刚健，不息运行',
      color: '#f59e0b',
      direction: '西北'
    },
    {
      name: '坤',
      symbol: '☷',
      nature: '地',
      element: '土',
      family: '母',
      virtue: '顺',
      lines: [0, 0, 0],
      feature: '纯阴柔顺，厚德载物',
      color: '#78716c',
      direction: '西南'
    },
    {
      name: '震',
      symbol: '☳',
      nature: '雷',
      element: '木',
      family: '长男',
      virtue: '动',
      lines: [1, 0, 0],
      feature: '震动奋起，惊觉万物',
      color: '#22c55e',
      direction: '东'
    },
    {
      name: '巽',
      symbol: '☴',
      nature: '风',
      element: '木',
      family: '长女',
      virtue: '入',
      lines: [0, 1, 1],
      feature: '巽顺潜入，无孔不入',
      color: '#06b6d4',
      direction: '东南'
    },
    {
      name: '坎',
      symbol: '☵',
      nature: '水',
      element: '水',
      family: '中男',
      virtue: '陷',
      lines: [0, 1, 0],
      feature: '险难重重，心诚而行',
      color: '#3b82f6',
      direction: '北'
    },
    {
      name: '离',
      symbol: '☲',
      nature: '火',
      element: '火',
      family: '中女',
      virtue: '丽',
      lines: [1, 0, 1],
      feature: '光明附丽，文明照著',
      color: '#ef4444',
      direction: '南'
    },
    {
      name: '艮',
      symbol: '☶',
      nature: '山',
      element: '土',
      family: '少男',
      virtue: '止',
      lines: [0, 0, 1],
      feature: '静止安稳，知止不殆',
      color: '#a16207',
      direction: '东北'
    },
    {
      name: '兑',
      symbol: '☱',
      nature: '泽',
      element: '金',
      family: '少女',
      virtue: '说',
      lines: [1, 1, 0],
      feature: '喜悦和悦，泽润万物',
      color: '#ec4899',
      direction: '西'
    }
  ]

  const sixtyFourHexagrams = [
    { id: 1, name: '乾为天', upper: '乾', lower: '乾', symbol: '䷀', nature: '元亨利贞', feature: '天行健，君子以自强不息。潜龙勿用，见龙在田，终日乾乾，或跃在渊，飞龙在天，亢龙有悔。六龙御天，阳刚至极。', element: '纯金', fortune: 95, difficulty: 30, yaoCount: 6, ruler: '九五', color: '#f59e0b' },
    { id: 2, name: '坤为地', upper: '坤', lower: '坤', symbol: '䷁', nature: '元亨，利牝马之贞', feature: '地势坤，君子以厚德载物。履霜坚冰至，直方正大，含章可贞，括囊无咎，黄裳元吉，龙战于野。柔顺利贞，牝马之德。', element: '纯土', fortune: 90, difficulty: 25, yaoCount: 6, ruler: '六二', color: '#78716c' },
    { id: 3, name: '水雷屯', upper: '坎', lower: '震', symbol: '䷂', nature: '元亨利贞，勿用有攸往', feature: '云雷屯，君子以经纶。刚柔始交而难生，动乎险中，大亨贞。天造草昧，宜建侯而不宁。万物始生，多难兴邦。', element: '水木', fortune: 55, difficulty: 85, yaoCount: 6, ruler: '九五', color: '#0ea5e9' },
    { id: 4, name: '山水蒙', upper: '艮', lower: '坎', symbol: '䷃', nature: '亨。匪我求童蒙，童蒙求我', feature: '山下出泉，蒙。君子以果行育德。蒙以养正，圣功也。山下有险，险而止，蒙。蒙昧之时，启蒙发智。', element: '土水', fortune: 65, difficulty: 60, yaoCount: 6, ruler: '九二', color: '#78716c' },
    { id: 5, name: '水天需', upper: '坎', lower: '乾', symbol: '䷄', nature: '有孚，光亨贞吉', feature: '云上于天，需。君子以饮食宴乐。需于郊，需于沙，需于泥，需于血，需于酒食。险在前也，刚健而不陷。待时而动。', element: '水金', fortune: 80, difficulty: 40, yaoCount: 6, ruler: '九五', color: '#3b82f6' },
    { id: 6, name: '天水讼', upper: '乾', lower: '坎', symbol: '䷅', nature: '有孚窒惕，中吉，终凶', feature: '天与水违行，讼。君子以作事谋始。讼不可长也。争讼之道，贵乎中正。以讼受服，亦不足敬也。', element: '金水', fortune: 30, difficulty: 90, yaoCount: 6, ruler: '九五', color: '#dc2626' },
    { id: 7, name: '地水师', upper: '坤', lower: '坎', symbol: '䷆', nature: '贞，丈人吉，无咎', feature: '地中有水，师。君子以容民畜众。师，众也；贞，正也。能以众正，可以王矣。毒天下而民从之，王者之师。', element: '土水', fortune: 75, difficulty: 70, yaoCount: 6, ruler: '九二', color: '#78716c' },
    { id: 8, name: '水地比', upper: '坎', lower: '坤', symbol: '䷇', nature: '吉。原筮元永贞，无咎', feature: '地上有水，比。先王以建万国，亲诸侯。比，辅也，下顺从也。显比之吉，位正中也。舍逆取顺，亲比天下。', element: '水土', fortune: 85, difficulty: 35, yaoCount: 6, ruler: '九五', color: '#0ea5e9' },
    { id: 9, name: '风天小畜', upper: '巽', lower: '乾', symbol: '䷈', nature: '亨。密云不雨，自我西郊', feature: '风行天上，小畜。君子以懿文德。密云不雨，尚往也。畜而不通，君子以修文德，待时成其大畜。', element: '木金', fortune: 70, difficulty: 50, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 10, name: '天泽履', upper: '乾', lower: '兑', symbol: '䷉', nature: '履虎尾，不咥人，亨', feature: '上天下泽，履。君子以辨上下，定民志。履道坦坦，幽人贞吉。履帝位而不疚，光明也。以礼而行，虽危无咎。', element: '金金', fortune: 80, difficulty: 55, yaoCount: 6, ruler: '九五', color: '#f59e0b' },
    { id: 11, name: '地天泰', upper: '坤', lower: '乾', symbol: '䷊', nature: '小往大来，吉亨', feature: '天地交，泰。后以财成天地之道，辅相天地之宜，以左右民。君子道长，小人道消也。上下交而其志同也。', element: '土金', fortune: 95, difficulty: 20, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 12, name: '天地否', upper: '乾', lower: '坤', symbol: '䷋', nature: '否之匪人，不利君子贞', feature: '天地不交，否。君子以俭德辟难，不可荣以禄。小人道长，君子道消也。大往小来，上下不交而天下无邦。', element: '金土', fortune: 25, difficulty: 95, yaoCount: 6, ruler: '六二', color: '#7f1d1d' },
    { id: 13, name: '天火同人', upper: '乾', lower: '离', symbol: '䷌', nature: '同人于野，亨。利涉大川', feature: '天与火，同人。君子以类族辨物。同人于野，道大行也。文明以健，中正而应，君子正也。唯君子为能通天下之志。', element: '金火', fortune: 85, difficulty: 40, yaoCount: 6, ruler: '九五', color: '#f59e0b' },
    { id: 14, name: '火天大有', upper: '离', lower: '乾', symbol: '䷍', nature: '元亨', feature: '火在天上，大有。君子以遏恶扬善，顺天休命。大有，柔得尊位大中，而上下应之。其德刚健而文明，应乎天而时行。', element: '火金', fortune: 98, difficulty: 15, yaoCount: 6, ruler: '六五', color: '#f59e0b' },
    { id: 15, name: '地山谦', upper: '坤', lower: '艮', symbol: '䷎', nature: '亨，君子有终', feature: '地中有山，谦。君子以裒多益寡，称物平施。天道亏盈而益谦，地道变盈而流谦。一谦而四益，君子之德也。', element: '土土', fortune: 90, difficulty: 25, yaoCount: 6, ruler: '九三', color: '#a16207' },
    { id: 16, name: '雷地豫', upper: '震', lower: '坤', symbol: '䷏', nature: '利建侯行师', feature: '雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。豫顺以动，故天地如之。天地以顺动，故日月不过。', element: '木土', fortune: 80, difficulty: 35, yaoCount: 6, ruler: '九四', color: '#22c55e' },
    { id: 17, name: '泽雷随', upper: '兑', lower: '震', symbol: '䷐', nature: '元亨利贞，无咎', feature: '泽中有雷，随。君子以向晦入宴息。随之时义大矣哉。刚来而下柔，动而说，随。天下随时，随时之义大矣哉。', element: '金木', fortune: 75, difficulty: 45, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 18, name: '山风蛊', upper: '艮', lower: '巽', symbol: '䷑', nature: '元亨，利涉大川', feature: '山下有风，蛊。君子以振民育德。蛊，刚上而柔下，巽而止，蛊。蛊之时义大矣哉。干父之蛊，承以德也。', element: '土木', fortune: 65, difficulty: 75, yaoCount: 6, ruler: '六五', color: '#a16207' },
    { id: 19, name: '地泽临', upper: '坤', lower: '兑', symbol: '䷒', nature: '元亨利贞。至于八月有凶', feature: '泽上有地，临。君子以教思无穷，容保民无疆。临，刚浸而长。说而顺，刚中而应。大亨以正，天之道也。', element: '土金', fortune: 80, difficulty: 40, yaoCount: 6, ruler: '六五', color: '#78716c' },
    { id: 20, name: '风地观', upper: '巽', lower: '坤', symbol: '䷓', nature: '盥而不荐，有孚颙若', feature: '风行地上，观。先王以省方观民设教。大观在上，顺而巽，中正以观天下。观天之神道，而四时不忒。圣人以神道设教。', element: '木土', fortune: 70, difficulty: 55, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 21, name: '火雷噬嗑', upper: '离', lower: '震', symbol: '䷔', nature: '亨。利用狱', feature: '雷电，噬嗑。先王以明罚敕法。颐中有物，曰噬嗑。噬嗑而亨。刚柔分，动而明，雷电合而章。利用狱，明罚敕法。', element: '火木', fortune: 60, difficulty: 70, yaoCount: 6, ruler: '六五', color: '#dc2626' },
    { id: 22, name: '山火贲', upper: '艮', lower: '离', symbol: '䷕', nature: '亨。小利有攸往', feature: '山下有火，贲。君子以明庶政，无敢折狱。贲，亨。柔来而文刚，故亨。分刚上而文柔，故小利有攸往。天文也。', element: '土火', fortune: 70, difficulty: 50, yaoCount: 6, ruler: '六五', color: '#a16207' },
    { id: 23, name: '山地剥', upper: '艮', lower: '坤', symbol: '䷖', nature: '不利有攸往', feature: '山附于地，剥。上以厚下安宅。剥，剥也，柔变刚也。小人长也。顺而止之，观象也。君子尚消息盈虚，天行也。', element: '土土', fortune: 30, difficulty: 90, yaoCount: 6, ruler: '上九', color: '#7f1d1d' },
    { id: 24, name: '地雷复', upper: '坤', lower: '震', symbol: '䷗', nature: '亨。出入无疾，朋来无咎', feature: '雷在地中，复。先王以至日闭关，商旅不行，后不省方。复，其见天地之心乎。一阳来复，反复其道，七日来复。', element: '土木', fortune: 85, difficulty: 35, yaoCount: 6, ruler: '初九', color: '#22c55e' },
    { id: 25, name: '天雷无妄', upper: '乾', lower: '震', symbol: '䷘', nature: '元亨利贞。其匪正有眚', feature: '天下雷行，物与无妄。先王以茂对时育万物。无妄，刚自外来，而为主于内。动而健，刚中而应。大亨以正，天之命也。', element: '金木', fortune: 80, difficulty: 55, yaoCount: 6, ruler: '九五', color: '#f59e0b' },
    { id: 26, name: '山天大畜', upper: '艮', lower: '乾', symbol: '䷙', nature: '利贞。不家食吉，利涉大川', feature: '天在山中，大畜。君子以多识前言往行，以畜其德。大畜，刚健笃实辉光，日新其德。能止健，大正也。', element: '土金', fortune: 90, difficulty: 40, yaoCount: 6, ruler: '六五', color: '#a16207' },
    { id: 27, name: '山雷颐', upper: '艮', lower: '震', symbol: '䷚', nature: '贞吉。观颐，自求口实', feature: '山下有雷，颐。君子以慎言语，节饮食。颐之时大矣哉。天地养万物，圣人养贤以及万民。颐之时义大矣哉。', element: '土木', fortune: 75, difficulty: 50, yaoCount: 6, ruler: '六四', color: '#a16207' },
    { id: 28, name: '泽风大过', upper: '兑', lower: '巽', symbol: '䷛', nature: '栋桡。利有攸往，亨', feature: '泽灭木，大过。君子以独立不惧，遁世无闷。大过，大者过也。栋桡，本末弱也。刚过而中，巽而说行。非常之时。', element: '金木', fortune: 55, difficulty: 85, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 29, name: '坎为水', upper: '坎', lower: '坎', symbol: '䷜', nature: '习坎，有孚维心亨，行有尚', feature: '水洊至，习坎。君子以常德行，习教事。习坎，重险也。水流而不盈，行险而不失其信。维心亨，乃以刚中也。天险不可升也。', element: '纯水', fortune: 50, difficulty: 95, yaoCount: 6, ruler: '九五', color: '#3b82f6' },
    { id: 30, name: '离为火', upper: '离', lower: '离', symbol: '䷝', nature: '利贞，亨。畜牝牛吉', feature: '明两作，离。大人以继明照于四方。离，丽也。日月丽乎天，百谷草木丽乎土。重明以丽乎正，乃化成天下。柔丽乎中正。', element: '纯火', fortune: 85, difficulty: 45, yaoCount: 6, ruler: '六五', color: '#ef4444' },
    { id: 31, name: '泽山咸', upper: '兑', lower: '艮', symbol: '䷞', nature: '亨利贞，取女吉', feature: '山上有泽，咸。君子以虚受人。咸，感也。柔上而刚下，二气感应以相与。天地感而万物化生，圣人感人心而天下和平。', element: '金土', fortune: 85, difficulty: 35, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 32, name: '雷风恒', upper: '震', lower: '巽', symbol: '䷟', nature: '亨，无咎，利贞，利有攸往', feature: '雷风，恒。君子以立不易方。恒，久也。刚上而柔下，雷风相与，巽而动，刚柔皆应。天地之道恒久而不已也。', element: '木木', fortune: 90, difficulty: 30, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 33, name: '天山遁', upper: '乾', lower: '艮', symbol: '䷠', nature: '亨，小利贞', feature: '天下有山，遁。君子以远小人，不恶而严。遁之时义大矣哉。遁而亨也。刚当位而应，与时行也。小利贞，浸而长也。', element: '金土', fortune: 65, difficulty: 60, yaoCount: 6, ruler: '九五', color: '#f59e0b' },
    { id: 34, name: '雷天大壮', upper: '震', lower: '乾', symbol: '䷡', nature: '利贞', feature: '雷在天上，大壮。君子以非礼弗履。大壮，大者壮也。刚以动，故壮。大壮利贞，大者正也。正大而天地之情可见矣。', element: '木金', fortune: 85, difficulty: 40, yaoCount: 6, ruler: '九四', color: '#22c55e' },
    { id: 35, name: '火地晋', upper: '离', lower: '坤', symbol: '䷢', nature: '康侯用锡马蕃庶，昼日三接', feature: '明出地上，晋。君子以自昭明德。晋，进也。明出地上，顺而丽乎大明，柔进而上行。君子以自昭其明德，日新其德。', element: '火土', fortune: 80, difficulty: 45, yaoCount: 6, ruler: '六五', color: '#f59e0b' },
    { id: 36, name: '地火明夷', upper: '坤', lower: '离', symbol: '䷣', nature: '利艰贞', feature: '明入地中，明夷。君子以莅众，用晦而明。明入地中，内文明而外柔顺，以蒙大难。文王以之，利艰贞，晦其明也。', element: '土火', fortune: 45, difficulty: 90, yaoCount: 6, ruler: '六五', color: '#78716c' },
    { id: 37, name: '风火家人', upper: '巽', lower: '离', symbol: '䷤', nature: '利女贞', feature: '风自火出，家人。君子以言有物而行有恒。家人，女正位乎内，男正位乎外。男女正，天地之大义也。正家而天下定矣。', element: '木火', fortune: 90, difficulty: 30, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 38, name: '火泽睽', upper: '离', lower: '兑', symbol: '䷥', nature: '小事吉', feature: '上火下泽，睽。君子以同而异。睽之时用大矣哉。二女同居，其志不同行。说而丽乎明，柔进而上行，得中而应乎刚。', element: '火金', fortune: 65, difficulty: 65, yaoCount: 6, ruler: '六五', color: '#ea580c' },
    { id: 39, name: '山水蹇', upper: '艮', lower: '坎', symbol: '䷦', nature: '利西南，不利东北。利见大人', feature: '山上有水，蹇。君子以反身修德。蹇，难也，险在前也。见险而能止，知矣哉。蹇之时用大矣哉。行险而不失其正。', element: '土水', fortune: 50, difficulty: 85, yaoCount: 6, ruler: '九五', color: '#a16207' },
    { id: 40, name: '雷水解', upper: '震', lower: '坎', symbol: '䷧', nature: '利西南，无所往，其来复吉', feature: '雷雨作，解。君子以赦过宥罪。解，险以动，动而免乎险。解之时大矣哉。天地解而雷雨作，雷雨作而百果草木皆甲坼。', element: '木水', fortune: 75, difficulty: 55, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 41, name: '山泽损', upper: '艮', lower: '兑', symbol: '䷨', nature: '有孚，元吉，无咎，可贞', feature: '山下有泽，损。君子以惩忿窒欲。损下益上，其道上行。损而有孚，元吉，无咎，可贞。损之时义大矣哉。损欲益德。', element: '土金', fortune: 70, difficulty: 60, yaoCount: 6, ruler: '六五', color: '#a16207' },
    { id: 42, name: '风雷益', upper: '巽', lower: '震', symbol: '䷩', nature: '利有攸往，利涉大川', feature: '风雷，益。君子以见善则迁，有过则改。益，损上益下，民说无疆。自上下下，其道大光。益之时义大矣哉。', element: '木木', fortune: 90, difficulty: 35, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 43, name: '泽天夬', upper: '兑', lower: '乾', symbol: '䷪', nature: '扬于王庭，孚号有厉', feature: '泽上于天，夬。君子以施禄及下，居德则忌。夬，决也，刚决柔也。健而说，决而和。扬于王庭，柔乘五刚也。', element: '金金', fortune: 75, difficulty: 65, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 44, name: '天风姤', upper: '乾', lower: '巽', symbol: '䷫', nature: '女壮，勿用取女', feature: '天下有风，姤。后以施命诰四方。姤，遇也，柔遇刚也。天地相遇，品物咸章也。刚遇中正，天下大行也。姤之时义大矣哉。', element: '金木', fortune: 60, difficulty: 70, yaoCount: 6, ruler: '九五', color: '#f59e0b' },
    { id: 45, name: '泽地萃', upper: '兑', lower: '坤', symbol: '䷬', nature: '亨。王假有庙，利见大人', feature: '泽上于地，萃。君子以除戎器，戒不虞。萃，聚也。顺以说，刚中而应。天地万物之情可见矣。聚之以正，可以王矣。', element: '金土', fortune: 80, difficulty: 50, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 46, name: '地风升', upper: '坤', lower: '巽', symbol: '䷭', nature: '元亨，用见大人，勿恤', feature: '地中生木，升。君子以顺德，积小以高大。柔以时升，巽而顺，刚中而应，是以大亨。积小成大，步步高升。', element: '土木', fortune: 85, difficulty: 40, yaoCount: 6, ruler: '六五', color: '#06b6d4' },
    { id: 47, name: '泽水困', upper: '兑', lower: '坎', symbol: '䷮', nature: '亨。贞大人吉，无咎', feature: '泽无水，困。君子以致命遂志。困，刚掩也。险以说，困而不失其所，亨。其唯君子乎。穷则变，变则通。', element: '金水', fortune: 50, difficulty: 90, yaoCount: 6, ruler: '九五', color: '#dc2626' },
    { id: 48, name: '水风井', upper: '坎', lower: '巽', symbol: '䷯', nature: '改邑不改井，无丧无得', feature: '木上有水，井。君子以劳民劝相。井养而不穷也。改邑不改井，乃以刚中也。往来井井，无丧无得，养民不穷。', element: '水木', fortune: 80, difficulty: 50, yaoCount: 6, ruler: '九五', color: '#3b82f6' },
    { id: 49, name: '泽火革', upper: '兑', lower: '离', symbol: '䷰', nature: '己日乃孚，元亨利贞，悔亡', feature: '泽中有火，革。君子以治历明时。革，水火相息。天地革而四时成，汤武革命，顺乎天而应乎人。革之时大矣哉。', element: '金火', fortune: 75, difficulty: 70, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 50, name: '火风鼎', upper: '离', lower: '巽', symbol: '䷱', nature: '元吉，亨', feature: '木上有火，鼎。君子以正位凝命。鼎，象也。圣人亨以享上帝，而大亨以养圣贤。鼎，定也，正位凝命，天下定矣。', element: '火木', fortune: 90, difficulty: 45, yaoCount: 6, ruler: '六五', color: '#f59e0b' },
    { id: 51, name: '震为雷', upper: '震', lower: '震', symbol: '䷲', nature: '亨。震来虩虩，笑言哑哑', feature: '洊雷，震。君子以恐惧修省。震，亨。震来虩虩，恐致福也。笑言哑哑，后有则也。震惊百里，惊远而惧迩也。', element: '纯木', fortune: 70, difficulty: 65, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 52, name: '艮为山', upper: '艮', lower: '艮', symbol: '䷳', nature: '艮其背，不获其身', feature: '兼山，艮。君子以思不出其位。艮，止也。时止则止，时行则行，动静不失其时，其道光明。艮其止，止其所也。', element: '纯土', fortune: 75, difficulty: 55, yaoCount: 6, ruler: '六五', color: '#a16207' },
    { id: 53, name: '风山渐', upper: '巽', lower: '艮', symbol: '䷴', nature: '女归吉，利贞', feature: '山上有木，渐。君子以居贤德善俗。渐之进也，女归吉也。进得位，往有功也。渐进以正，可以正邦也。', element: '木土', fortune: 85, difficulty: 40, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 54, name: '雷泽归妹', upper: '震', lower: '兑', symbol: '䷵', nature: '征凶，无攸利', feature: '泽上有雷，归妹。君子以永终知敝。归妹，天地之大义也。天地不交而万物不兴。归妹，人之终始也。', element: '木金', fortune: 55, difficulty: 80, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 55, name: '雷火丰', upper: '震', lower: '离', symbol: '䷶', nature: '亨，王假之，勿忧', feature: '雷电皆至，丰。君子以折狱致刑。丰，大也。明以动，故丰。日中则昃，月盈则食。天地盈虚，与时消息。', element: '木火', fortune: 80, difficulty: 55, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 56, name: '火山旅', upper: '离', lower: '艮', symbol: '䷷', nature: '小亨，旅贞吉', feature: '山上有火，旅。君子以明慎用刑而不留狱。旅之时义大矣哉。旅而得正，其惟圣人乎。行旅在外，慎密则吉。', element: '火土', fortune: 60, difficulty: 75, yaoCount: 6, ruler: '六五', color: '#ea580c' },
    { id: 57, name: '巽为风', upper: '巽', lower: '巽', symbol: '䷸', nature: '小亨，利有攸往，利见大人', feature: '随风，巽。君子以申命行事。重巽以申命，刚巽乎中正而志行。巽之时义大矣哉。无孔不入，无坚不摧。', element: '纯木', fortune: 75, difficulty: 50, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 58, name: '兑为泽', upper: '兑', lower: '兑', symbol: '䷹', nature: '亨，利贞', feature: '丽泽，兑。君子以朋友讲习。兑，说也。刚中而柔外，说以利贞。说以先民，民忘其劳。说以犯难，民忘其死。', element: '纯金', fortune: 85, difficulty: 35, yaoCount: 6, ruler: '九五', color: '#ec4899' },
    { id: 59, name: '风水涣', upper: '巽', lower: '坎', symbol: '䷺', nature: '亨。王假有庙，利涉大川', feature: '风行水上，涣。先王以享于帝立庙。涣之时用大矣哉。涣汗其大号，涣王居，无咎。散其积聚，天下归一。', element: '木水', fortune: 80, difficulty: 55, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 60, name: '水泽节', upper: '坎', lower: '兑', symbol: '䷻', nature: '亨。苦节不可贞', feature: '泽上有水，节。君子以制数度，议德行。节，亨。刚柔分而刚得中。苦节不可贞，其道穷也。天地节而四时成。', element: '水金', fortune: 80, difficulty: 50, yaoCount: 6, ruler: '九五', color: '#3b82f6' },
    { id: 61, name: '风泽中孚', upper: '巽', lower: '兑', symbol: '䷼', nature: '豚鱼吉，利涉大川，利贞', feature: '泽上有风，中孚。君子以议狱缓死。中孚，柔在内而刚得中。说而巽，孚乃化邦也。豚鱼吉，信及豚鱼也。', element: '木金', fortune: 90, difficulty: 35, yaoCount: 6, ruler: '九五', color: '#06b6d4' },
    { id: 62, name: '雷山小过', upper: '震', lower: '艮', symbol: '䷽', nature: '亨，利贞。可小事，不可大事', feature: '山上有雷，小过。君子以行过乎恭，丧过乎哀，用过乎俭。小过，小者过而亨也。过以利贞，与时行也。', element: '木土', fortune: 65, difficulty: 65, yaoCount: 6, ruler: '六五', color: '#22c55e' },
    { id: 63, name: '水火既济', upper: '坎', lower: '离', symbol: '䷾', nature: '亨小，利贞。初吉终乱', feature: '水在火上，既济。君子以思患而豫防之。既济，亨小者也。刚柔正而位当也。初吉，终乱，其道穷也。', element: '水火', fortune: 70, difficulty: 60, yaoCount: 6, ruler: '九五', color: '#3b82f6' },
    { id: 64, name: '火水未济', upper: '离', lower: '坎', symbol: '䷿', nature: '亨。小狐汔济，濡其尾', feature: '火在水上，未济。君子以慎辨物居方。未济，亨。柔得中也。小狐汔济，未出中也。濡其尾，无攸利。不续终也。', element: '火水', fortune: 60, difficulty: 75, yaoCount: 6, ruler: '六五', color: '#ef4444' }
  ]

  const yaoMethods = [
    { name: '大衍筮法', steps: 50, time: '约30分钟', accuracy: 95, feature: '古法正宗，圣人所作', difficulty: 90, color: '#8b5cf6' },
    { name: '金钱卦', steps: 6, time: '约5分钟', accuracy: 80, feature: '简便快捷，民间常用', difficulty: 20, color: '#f59e0b' },
    { name: '梅花易数', steps: 1, time: '即时', accuracy: 85, feature: '先天心法，触机而发', difficulty: 70, color: '#ec4899' },
    { name: '纳甲筮法', steps: 6, time: '约15分钟', accuracy: 90, feature: '五行六亲，断事精准', difficulty: 85, color: '#3b82f6' }
  ]

  return (
    <SubPageTemplate
      title="周易易经"
      subtitle="伏羲画卦 · 文王系辞 · 孔子作传 · 三圣绝学"
      icon="☯️"
      colorRgb="139, 92, 246"
    >
      <InfoCard>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          {[
            { value: '64', label: '六十四卦', color: '#8b5cf6', icon: '䷀' },
            { value: '384', label: '爻辞总义', color: '#a78bfa', icon: '⚋' },
            { value: '7000+', label: '文言字数', color: '#c084fc', icon: '📜' },
            { value: '5000', label: '年传承', color: '#e879f9', icon: '⏳' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'serif' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(180, 180, 190, 0.7)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, textAlign: 'center' }}>
          《易》之为书也，广大悉备。有天道焉，有人道焉，有地道焉。兼三才而两之，故六。
          一阴一阳之谓道，继之者善也，成之者性也。
        </p>
      </InfoCard>

      <SubPageSection title="先天八卦">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {eightTrigrams.map((gua, index) => (
            <motion.div
              key={gua.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.05 }}
            >
              <div style={{
                fontSize: '4rem',
                fontFamily: 'serif',
                textAlign: 'center',
                color: gua.color,
                marginBottom: '0.5rem',
                textShadow: `0 0 20px ${gua.color}66`
              }}>
                {gua.symbol}
              </div>
              <h3 style={{ color: gua.color, textAlign: 'center', marginBottom: '0.5rem' }}>
                {gua.name} · {gua.nature}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.5)' }}>五行</div>
                  <div style={{ color: gua.color }}>{gua.element}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.5)' }}>方位</div>
                  <div style={{ color: gua.color }}>{gua.direction}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.5)' }}>人伦</div>
                  <div style={{ color: gua.color }}>{gua.family}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.5)' }}>德性</div>
                  <div style={{ color: gua.color }}>{gua.virtue}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', textAlign: 'center', marginTop: '0.5rem' }}>
                {gua.feature}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六十四卦全览">
        <InfoCard>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
            {sixtyFourHexagrams.map((gua, index) => (
              <motion.div
                key={gua.id}
                onClick={() => setSelectedGua(index)}
                whileHover={{ scale: 1.1 }}
                style={{
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: selectedGua === index ? `${gua.color}30` : 'rgba(180, 180, 190, 0.05)',
                  border: `1px solid ${selectedGua === index ? gua.color : 'rgba(180, 180, 190, 0.1)'}`,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontFamily: 'serif',
                  color: gua.color
                }}>{gua.symbol}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                  {gua.id}.{gua.name.slice(0, 2)}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={selectedGua}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              padding: '1.5rem',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${sixtyFourHexagrams[selectedGua].color}15, transparent)`,
              border: `1px solid ${sixtyFourHexagrams[selectedGua].color}30`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{
                fontSize: '4rem',
                fontFamily: 'serif',
                color: sixtyFourHexagrams[selectedGua].color,
                marginRight: '1rem',
                textShadow: `0 0 30px ${sixtyFourHexagrams[selectedGua].color}66`
              }}>
                {sixtyFourHexagrams[selectedGua].symbol}
              </div>
              <div>
                <h2 style={{ color: sixtyFourHexagrams[selectedGua].color, marginBottom: '0.25rem' }}>
                  第{sixtyFourHexagrams[selectedGua].id}卦 · {sixtyFourHexagrams[selectedGua].name}
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                  上{sixtyFourHexagrams[selectedGua].upper}下{sixtyFourHexagrams[selectedGua].lower} · 
                  {sixtyFourHexagrams[selectedGua].element} · 卦主{sixtyFourHexagrams[selectedGua].ruler}
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginRight: '0.5rem' }}>运势</span>
                  <div style={{ width: '100px', height: '8px', borderRadius: '4px', background: 'rgba(180, 180, 190, 0.1)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sixtyFourHexagrams[selectedGua].fortune}%` }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, #ef4444, #22c55e)`
                      }}
                    />
                  </div>
                  <span style={{ marginLeft: '0.5rem', color: sixtyFourHexagrams[selectedGua].color, fontWeight: 'bold' }}>
                    {sixtyFourHexagrams[selectedGua].fortune}%
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: 'rgba(180, 180, 190, 0.05)',
              borderRadius: '6px',
              borderLeft: `3px solid ${sixtyFourHexagrams[selectedGua].color}`,
              fontStyle: 'italic',
              color: 'rgba(180, 180, 190, 0.8)',
              marginBottom: '0.75rem'
            }}>
              「{sixtyFourHexagrams[selectedGua].nature}」
            </div>

            <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
              {sixtyFourHexagrams[selectedGua].feature}
            </p>
          </motion.div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="占筮方法">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {yaoMethods.map((method, index) => (
            <motion.div
              key={method.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: `linear-gradient(90deg, ${method.color}, transparent)`
              }} />
              
              <h3 style={{ color: method.color, marginBottom: '1rem' }}>{method.name}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: method.color }}>{method.steps}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>步骤</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: method.color }}>{method.accuracy}%</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>准确度</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: method.color }}>{method.time}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>耗时</div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)' }}>
                {method.feature}
              </p>

              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>难度</div>
                <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(180, 180, 190, 0.1)' }}>
                  <div style={{
                    height: '100%',
                    width: `${method.difficulty}%`,
                    borderRadius: '3px',
                    background: method.color
                  }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
