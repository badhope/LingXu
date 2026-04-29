/**
 * 设计系统 Token 批量迁移脚本
 * 自动把硬编码的色值统一替换为 @/styles/tokens
 */

import fs from 'fs'
import path from 'path'

const MIGRATIONS = [
  { from: /#a855f7|rgba\(168,\s*85,\s*247/g, to: 'COLORS.purple' },
  { from: /#8b5cf6|rgba\(139,\s*92,\s*246/g, to: 'COLORS.purple' },
  { from: /#fbbf24|#f59e0b|rgba\(251,\s*191,\s*36/g, to: 'COLORS.gold' },
  { from: /#ef4444|#ea580c|rgba\(239,\s*68,\s*68/g, to: 'COLORS.red' },
  { from: /#22c55e|rgba\(34,\s*197,\s*94/g, to: 'COLORS.green' },
  { from: /#3b82f6|rgba\(59,\s*130,\s*246/g, to: 'COLORS.blue' },
  { from: /#06b6d4|rgba\(6,\s*182,\s*212/g, to: 'COLORS.cyan' },
  { from: /borderRadius:\s*(12|16)px/g, to: 'borderRadius: RADIUS.xl' },
]

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8')
  let modified = false
  
  for (const { from, to } of MIGRATIONS) {
    if (from.test(content)) {
      content = content.replace(from, to)
      modified = true
    }
  }
  
  if (modified && !content.includes("from '@/styles/tokens'")) {
    content = content.replace(
      /(import.*from\s+['"]@\/[^'"]*['"]\n)/,
      `$1import { COLORS, RADIUS, SPACING } from '@/styles/tokens'\n`
    )
    fs.writeFileSync(filePath, content)
    console.log('✅', path.basename(filePath))
  }
}

console.log('🎨 开始批量迁移设计系统 Token...\n')

const srcDir = path.join(__dirname, '../src')
function walkDir(dir: string) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f)
    if (fs.statSync(full).isDirectory()) walkDir(full)
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) processFile(full)
  })
}

walkDir(srcDir)
console.log('\n✨ Token 迁移完成！')
