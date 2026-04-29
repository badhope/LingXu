#!/usr/bin/env node
/**
 * 灵墟项目 - 代码质量检查工具
 * 自动运行 TypeScript、ESLint、构建验证、依赖安全审计
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const ROOT = path.resolve(__dirname, '..')

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const config = {
  skipTsc: process.argv.includes('--skip-tsc'),
  skipEslint: process.argv.includes('--skip-eslint'),
  skipBuild: process.argv.includes('--skip-build'),
  skipAudit: process.argv.includes('--skip-audit'),
  tscOnly: process.argv.includes('--tsc-only'),
  quiet: process.argv.includes('--quiet'),
}

function log(color, msg) {
  if (!config.quiet) {
    console.log(`${COLORS[color]}${msg}${COLORS.reset}`)
  }
}

function section(title) {
  log('cyan', `\n╔══════════════════════════════════════════╗`)
  log('cyan', `║  ${title.padEnd(40)}║`)
  log('cyan', `╚══════════════════════════════════════════╝`)
}

function runCommand(cmd, description) {
  try {
    log('blue', `  运行: ${description}`)
    execSync(cmd, { cwd: ROOT, stdio: config.quiet ? 'ignore' : 'inherit' })
    log('green', `  ✅ ${description} 通过`)
    return true
  } catch (e) {
    log('red', `  ❌ ${description} 失败`)
    return false
  }
}

function runQualityCheck() {
  console.log('\n')
  log('green', '╔═══════════════════════════════════════════════════════╗')
  log('green', '║          灵墟项目 - 代码质量检查工具                   ║')
  log('green', '╚═══════════════════════════════════════════════════════╝')

  const results = {}
  let allPassed = true

  if (config.tscOnly) {
    config.skipEslint = true
    config.skipBuild = true
    config.skipAudit = true
  }

  if (!config.skipTsc) {
    section('TypeScript 类型检查')
    results.tsc = runCommand('npx tsc --noEmit', '类型检查')
    allPassed = allPassed && results.tsc
  }

  if (!config.skipEslint) {
    section('ESLint 代码检查')
    results.eslint = runCommand('npx next lint', '代码规范检查')
    allPassed = allPassed && results.eslint
  }

  if (!config.skipBuild) {
    section('生产环境构建')
    results.build = runCommand('npm run build', '构建验证')
    allPassed = allPassed && results.build
  }

  if (!config.skipAudit) {
    section('依赖安全审计')
    try {
      log('blue', '  运行: npm audit (生产环境)')
      execSync('npm audit --production', { cwd: ROOT, stdio: 'pipe' })
      log('green', '  ✅ 依赖安全检查 通过')
      results.audit = true
    } catch (e) {
      const output = e.stdout?.toString() || ''
      if (output.includes('found 0 vulnerabilities')) {
        log('green', '  ✅ 依赖安全检查 通过')
        results.audit = true
      } else {
        log('yellow', '  ⚠️  发现潜在依赖问题，请手动检查')
        results.audit = 'warning'
      }
    }
  }

  section('检查结果汇总')
  console.log('\n')
  console.log('  ┌───────────────────────┬──────────┐')
  Object.entries(results).forEach(([key, value]) => {
    const status = value === true ? '  ✅ PASS' : value === 'warning' ? '  ⚠️  WARN' : '  ❌ FAIL'
    const name = key.padEnd(21)
    console.log(`  │ ${name}│${status}  │`)
  })
  console.log('  └───────────────────────┴──────────┘')

  console.log('\n')
  if (allPassed) {
    log('green', '  🎉 所有检查通过！可以安全提交代码！')
  } else {
    log('yellow', '  ⚠️  部分检查未通过，请修复后再提交')
  }
  console.log('\n')

  process.exit(allPassed ? 0 : 1)
}

runQualityCheck()
