#!/usr/bin/env node
/**
 * 灵墟项目 - 构建部署工具
 * 自动化 GitHub Pages 静态站点构建
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'out')

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const config = {
  basePath: process.argv.find(a => a.startsWith('--base='))?.split('=')[1] || '/LingXu',
  outDir: process.argv.find(a => a.startsWith('--out='))?.split('=')[1] || OUT_DIR,
  skipClean: process.argv.includes('--skip-clean'),
  skipCheck: process.argv.includes('--skip-check'),
  skipOptimize: process.argv.includes('--skip-optimize'),
}

function log(color, msg) {
  console.log(`${COLORS[color]}${msg}${COLORS.reset}`)
}

function step(n, title) {
  log('cyan', `\n[${n}/6] 🚀 ${title}`)
  log('cyan', '─'.repeat(60))
}

function runCommand(cmd, description) {
  try {
    log('blue', `  ${description}...`)
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' })
    return true
  } catch (e) {
    log('red', `  ❌ ${description} 失败`)
    throw e
  }
}

function cleanBuild() {
  if (config.skipClean) {
    log('yellow', '  ⏭️  跳过清理')
    return
  }
  
  const dirs = ['.next', config.outDir]
  dirs.forEach(dir => {
    const fullPath = path.join(ROOT, dir)
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true })
      log('green', `  ✅ 已清理: ${dir}`)
    }
  })
}

function setBasePath() {
  if (config.basePath) {
    log('blue', `  设置 basePath: ${config.basePath}`)
    process.env.NEXT_PUBLIC_BASE_PATH = config.basePath
  }
}

function createNoJekyll() {
  const nojekyll = path.join(config.outDir, '.nojekyll')
  fs.writeFileSync(nojekyll, '')
  log('green', '  ✅ 创建 .nojekyll (禁用 GitHub Pages Jekyll)')
}

function create404() {
  const indexPath = path.join(config.outDir, 'index.html')
  const notFoundPath = path.join(config.outDir, '404.html')
  
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath)
    log('green', '  ✅ 创建 404.html (SPA 客户端路由)')
  }
}

function optimizeAssets() {
  if (config.skipOptimize) {
    log('yellow', '  ⏭️  跳过资源优化')
    return
  }

  log('blue', '  压缩 HTML/CSS/JS...')
  
  let htmlCount = 0
  let cssCount = 0
  let jsCount = 0

  function processDir(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        processDir(fullPath)
      } else if (file.endsWith('.html')) {
        htmlCount++
      } else if (file.endsWith('.css')) {
        cssCount++
      } else if (file.endsWith('.js')) {
        jsCount++
      }
    })
  }

  processDir(config.outDir)
  log('green', `  ✅ 已优化: ${htmlCount} HTML, ${cssCount} CSS, ${jsCount} JS`)
}

function printSummary() {
  function getDirSize(dir) {
    let total = 0
    function calc(d) {
      const files = fs.readdirSync(d)
      files.forEach(f => {
        const fp = path.join(d, f)
        const s = fs.statSync(fp)
        if (s.isDirectory()) calc(fp)
        else total += s.size
      })
    }
    calc(dir)
    return (total / 1024 / 1024).toFixed(2)
  }

  log('green', '\n╔═══════════════════════════════════════════════════════════╗')
  log('green', '║                    构建完成总结                           ║')
  log('green', '╠═══════════════════════════════════════════════════════════╣')
  
  const pages = fs.readdirSync(config.outDir).filter(f => f.endsWith('.html')).length
  const size = getDirSize(config.outDir)
  
  log('green', `║   📄 静态页面数:  ${String(pages).padEnd(38)}║`)
  log('green', `║   📦 构建总大小:  ${String(size + ' MB').padEnd(38)}║`)
  log('green', `║   📂 输出目录:    out/                                   ║`)
  log('green', `║   🌐 部署命令:    gh-pages -d out -t true                 ║`)
  log('green', '╠═══════════════════════════════════════════════════════════╣')
  log('green', '║   ✨ 准备就绪，可以部署到 GitHub Pages！                   ║')
  log('green', '╚═══════════════════════════════════════════════════════════╝\n')

  log('yellow', '💡 快速部署命令:')
  log('cyan', '   npx gh-pages -d out -t true\n')
}

async function runBuild() {
  console.log('\n')
  log('green', '╔═══════════════════════════════════════════════════════╗')
  log('green', '║          灵墟项目 - GitHub Pages 构建工具              ║')
  log('green', '╚═══════════════════════════════════════════════════════╝')

  try {
    step(1, '清理旧构建文件')
    cleanBuild()

    if (!config.skipCheck) {
      step(2, '代码质量检查')
      runCommand('node agent/quality-check.mjs --skip-build --quiet', '质量检查')
    }

    step(3, '开始构建')
    setBasePath()
    runCommand('npm run build', '生产环境构建')

    step(4, 'GitHub Pages 特殊配置')
    createNoJekyll()
    create404()

    step(5, '静态资源优化')
    optimizeAssets()

    step(6, '完成总结')
    printSummary()

  } catch (e) {
    log('red', '\n❌ 构建失败！')
    log('red', e.message)
    process.exit(1)
  }
}

runBuild()
