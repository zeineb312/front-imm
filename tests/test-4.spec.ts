import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://korpor.com/');
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('textbox', { name: 'How to develop a saas app?' }).click();
  await page.getByRole('textbox', { name: 'How to develop a saas app?' }).fill('hello');
  await page.getByRole('textbox', { name: 'How to develop a saas app?' }).press('Enter');
  await page.getByRole('button', { name: '' }).click();
});