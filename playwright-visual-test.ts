import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const screenshotsDir = join(process.cwd(), 'visual-test-screenshots');

async function captureScreenshots() {
  // Tạo thư mục screenshots
  try {
    mkdirSync(screenshotsDir, { recursive: true });
  } catch (e) {
    // Thư mục đã tồn tại
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });

  // Responsive breakpoints
  const breakpoints = [
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'mobile-425', width: 425, height: 812 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'tablet-1024', width: 1024, height: 768 },
    { name: 'desktop-1280', width: 1280, height: 800 },
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1920', width: 1920, height: 1080 }
  ];

  const results: any[] = [];

  for (const breakpoint of breakpoints) {
    console.log(`📸 Chụp screenshot cho ${breakpoint.name}...`);

    const page = await context.newPage();
    await page.setViewportSize({
      width: breakpoint.width,
      height: breakpoint.height
    });

    try {
      // Truy cập trang register
      await page.goto('https://localhost:8310/register', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Đợi form load xong
      await page.waitForSelector('form', { timeout: 10000 });

      // Chụp full page
      const screenshotPath = join(screenshotsDir, `register-${breakpoint.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`✅ Đã chụp: ${screenshotPath}`);

      // Lấy thông tin về các elements trên trang
      const pageInfo = await page.evaluate(() => {
        const form = document.querySelector('form');
        const inputs = document.querySelectorAll('input');
        const buttons = document.querySelectorAll('button');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const logo = document.querySelector('img, svg');

        return {
          hasForm: !!form,
          inputCount: inputs.length,
          buttonCount: buttons.length,
          checkboxCount: checkboxes.length,
          hasLogo: !!logo,
          title: document.querySelector('h1, h2')?.textContent || '',
          bodyBgColor: window.getComputedStyle(document.body).backgroundColor
        };
      });

      results.push({
        breakpoint: breakpoint.name,
        width: breakpoint.width,
        height: breakpoint.height,
        screenshotPath,
        pageInfo,
        success: true
      });

    } catch (error: any) {
      console.error(`❌ Lỗi khi chụp ${breakpoint.name}:`, error.message);
      results.push({
        breakpoint: breakpoint.name,
        width: breakpoint.width,
        height: breakpoint.height,
        success: false,
        error: error.message
      });
    }

    await page.close();
  }

  await browser.close();

  // Lưu kết quả ra file JSON
  const reportPath = join(screenshotsDir, 'visual-test-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📊 Báo cáo đã lưu tại: ${reportPath}`);

  return results;
}

captureScreenshots()
  .then((results) => {
    const successCount = results.filter(r => r.success).length;
    console.log(`\n✨ Hoàn thành: ${successCount}/${results.length} screenshots`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  });
