import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('UI Elements Visible', async ({ page }) => {
  await expect(page.getByRole('textbox', { name: 'Search employees...' })).toBeVisible();
  await expect(page.getByRole('combobox')).toBeVisible();
});

test('Filter Engineering Team', async ({ page }) => {
  await page.getByRole('combobox').selectOption('Engineering');
  await expect(page.getByText('Engineering').nth(2)).toBeVisible();
});

test('Filter HR Team', async ({ page }) => {
  await page.getByRole('combobox').selectOption('HR');
  await expect(page.getByText('HR').nth(2)).toBeVisible();
});

test('Filter Sales Team', async ({ page }) => {
  await page.getByRole('combobox').selectOption('Sales');
  await expect(page.getByText('John GreenVP SalesSales').nth(1)).toBeVisible();
});
