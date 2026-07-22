// tests/labs/admin.setup.ts
import path from 'node:path';
import { expect, test as setup } from '@playwright/test';
import { admin } from '../data';
// import { resetShelfContent } from '../helpers/seed';

const adminStorageStatePath = path.resolve('playwright/.authentication/admin.json');

setup('authenticate the seeded admin', async ({ page }) => {
	// await resetShelfContent();

	await page.goto('/login');
	await page.getByLabel('Email').fill(admin.email);
	await page.getByLabel('Password').fill(admin.password);
	await page.getByRole('button', { name: 'Sign in' }).click();

	await expect(page).toHaveURL(/\/shelf/);
	await page.context().storageState({ path: adminStorageStatePath });
});
