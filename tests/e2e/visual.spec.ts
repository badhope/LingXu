import { test, expect } from '@playwright/test'

test.describe('视觉效果测试', () => {
  test('太极动画正常渲染', async ({ page }) => {
    await page.goto('/')
    const canvas = page.locator('canvas').first()
    await expect(canvas).toBeVisible({ timeout: 10000 })
  })

  test('卡片悬停动画正常', async ({ page }) => {
    await page.goto('/home')
    const firstCard = page.locator('[class*="XianxiaCard"]').first()
    await expect(firstCard).toBeVisible({ timeout: 10000 })
    await firstCard.hover()
    await expect(firstCard).toHaveCSS('transform', /matrix/)
  })

  test('滚动动画正常触发', async ({ page }) => {
    await page.goto('/home')
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))
    await page.waitForTimeout(500)
    const scrollPosition = await page.evaluate(() => window.scrollY)
    expect(scrollPosition).toBeGreaterThan(0)
  })
})
