import assert from 'node:assert/strict';
import { chromium } from 'playwright';

// Run against pnpm dev:site to cover startup, docs navigation, and hydration.
const baseUrl = process.argv[2] ?? 'http://127.0.0.1:5173';
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of ['/', '/docs/', '/docs/guide/getting-started.html']) {
    const response = await page.goto(new URL(route, baseUrl).href);
    assert.equal(response.status(), 200, route);
    await page.locator('h1').first().waitFor({ state: 'visible' });
    assert.ok((await page.title()).includes('napplet'), route);
  }
  await page.getByRole('button', { name: 'Search', exact: false }).first().click();
  await page.getByRole('searchbox').fill('napplet');
  await page.locator('.VPLocalSearchBox .result').first().waitFor({ state: 'visible' });
  assert.deepEqual(errors, [], 'Development pages must hydrate without errors');
  console.log('Development homepage, docs navigation, and docs search passed.');
} finally {
  await browser.close();
}
