import { expect, test } from './labs/fixtures/fixtures';

test('promoted book appears on the reader home page', async ({ page, adminRequest }) => {
	const response = await adminRequest.post('/api/admin/featured-books', {
		data: { openLibraryId: 'OL1W' }
	});
	expect(response.ok()).toBe(true);

	await page.goto('/shelf');
	await expect(page.getByRole('heading', { name: /Station Eleven/ })).toBeVisible();
});
