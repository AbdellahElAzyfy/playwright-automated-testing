import { test, expect } from '@playwright/test';
import path from 'node:path';

const authFile = path.resolve('playwright/.authentication/user.json');

const testUser = {
	email: 'abdallahelazyfy123@gmail.com',
	password: '12345678',
	name: 'Abdellah El azyfy'
};

test('sign in flow', async ({ page }) => {
	await page.goto('/login');

	await page.getByRole('textbox', { name: 'Email Use the email address' }).fill(testUser.email);
	await page.getByRole('textbox', { name: 'Password' }).fill(testUser.password);

	await page.getByRole('button', { name: 'Sign in' }).click();

	await expect(page.getByText(testUser.name).first()).toBeVisible();
	await expect(page.getByText(testUser.email).first()).toBeVisible();

	await page.context().storageState({ path: authFile });
});
