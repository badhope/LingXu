import { test, expect } from '@playwright/test'

test.describe('核心导航测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('入口页面加载正常', async ({ page }) => {
    await expect(page).toHaveTitle(/灵墟/)
    await expect(page.getByText('踏入灵墟')).toBeVisible({ timeout: 10000 })
  })

  test('可以进入灵墟主页', async ({ page }) => {
    const enterButton = page.getByText('踏入灵墟')
    await expect(enterButton).toBeVisible({ timeout: 15000 })
    await enterButton.click()
    await expect(page).toHaveURL(/.*home/)
  })

  test('主题空间导航正常工作', async ({ page }) => {
    await page.goto('/home')
    const themeButton = page.getByRole('button').filter({ hasText: '❖' })
    await themeButton.click()
    await expect(page.getByText('洪荒灵墟')).toBeVisible()
  })

  test('四大主题空间均可访问', async ({ page }) => {
    const themes = [
      { path: '/home', name: '天地玄黄' },
      { path: '/xiuzhen', name: '修真洞府' },
      { path: '/mofa', name: '末法纪元' },
      { path: '/weilai', name: '未来长河' },
    ]

    for (const theme of themes) {
      await page.goto(theme.path)
      await expect(page.getByText(theme.name).first()).toBeVisible({
        timeout: 10000,
      })
    }
  })
})

test.describe('性能测试', () => {
  test('页面加载性能达标', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/home')
    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(5000)
  })

  test('Lighthouse 核心指标达标', async ({ page }) => {
    await page.goto('/home')
    const metrics = await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('navigation')[0]))
    const data = JSON.parse(metrics)
    expect(data.domContentLoadedEventEnd - data.fetchStart).toBeLessThan(3000)
  })
})

test.describe('响应式测试', () => {
  const sizes = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 1024, height: 768, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ]

  for (const size of sizes) {
    test(`适配 ${size.name} 屏幕`, async ({ page }) => {
      await page.setViewportSize(size)
      await page.goto('/home')
      await expect(page.getByText('天地玄黄').first()).toBeVisible({
        timeout: 10000,
      })
    })
  }
})
