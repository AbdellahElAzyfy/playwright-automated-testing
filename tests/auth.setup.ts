import { test, expect } from '@playwright/test';
import path from 'node:path';
import { reader } from './data';

const authFile = path.resolve('playwright/.authentication/user.json');

test('sign in flow', async ({ page }) => {
	await page.goto('/login');

	await page.getByRole('textbox', { name: 'Email Use the email address' }).fill(reader.email);
	await page.getByRole('textbox', { name: 'Password' }).fill(reader.password);

	await page.getByRole('button', { name: 'Sign in' }).click();

	await expect(page.getByText(reader.name).first()).toBeVisible();
	await expect(page.getByText(reader.email).first()).toBeVisible();

	await page.context().storageState({ path: authFile });
});
