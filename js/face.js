(function() {
    const facePartsData = [
        { part: '天庭', meaning: '天庭饱满者，命中主贵，少年得志。额头发亮者近期运势亨通。' },
        { part: '眉毛', meaning: '眉长过眼者重情义，眉浓密者事业心强。眉毛杂乱者需注意情绪管理。' },
        { part: '眼睛', meaning: '眼睛清澈有神者聪明过人，眼窝深陷者思虑过重。眼神坚定者意志坚强。' },
        { part: '鼻子', meaning: '鼻梁挺直者性格刚毅，鼻头圆润者财运亨通。鼻翼丰满者善于理财。' },
        { part: '嘴巴', meaning: '嘴形端正者为人正直，嘴角上扬者乐观开朗。唇色红润者气血充足。' },
        { part: '耳朵', meaning: '耳朵厚大者福泽深厚，耳垂长者长寿有福。耳朵贴脑者聪明伶俐。' }
    ];

    const palmLinesData = [
        { line: '生命线', meaning: '生命线深刻且弧度优美者身体健康，精力充沛。线有断裂者需注意保养。' },
        { line: '智慧线', meaning: '智慧线修长且末端分叉者思维敏捷，创造力强。线过短者务实稳重。' },
        { line: '感情线', meaning: '感情线深刻者感情丰富，线上有岛纹者感情路上多波折。线末端下垂者用情专一。' },
        { line: '事业线', meaning: '事业线直且清晰者事业心强，有上升趋势。线有分叉者职业多变动。' },
        { line: '财运线', meaning: '财运线明显者理财能力佳，多条财运线者收入来源广泛。' },
        { line: '手型', meaning: '手型方正者性格稳重，手指修长者适合文化艺术。手指节大者意志坚定。' }
    ];

    function init() {
        renderFaceParts();
        renderPalmLines();
    }

    function renderFaceParts() {
        const grid = document.getElementById('facePartsGrid');
        grid.innerHTML = facePartsData.map(f => `
            <div class="face-part-card">
                <h3>${f.part}</h3>
                <p>${f.meaning}</p>
            </div>
        `).join('');
    }

    function renderPalmLines() {
        const grid = document.getElementById('palmLinesGrid');
        grid.innerHTML = palmLinesData.map(p => `
            <div class="palm-line-card">
                <h3>${p.line}</h3>
                <p>${p.meaning}</p>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
