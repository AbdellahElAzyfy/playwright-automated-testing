import { expect, test } from './labs/fixtures/fixtures';

test('admin curates, reader sees', async ({ page, adminRequest }) => {
	await adminRequest.post('/api/admin/featured-books', {
		data: { openLibraryId: 'OL1W' }
	});

	await page.goto('/shelf');
	await expect(page.getByRole('heading', { name: "Admin Reader's shelf" })).toBeVisible();
});
