import test, { expect } from 'playwright/test';

test('search for books', async ({ page }) => {
	await page.routeFromHAR('tests/fixtures/open-library-search.har', {
		url: '**/openlibrary.org/**'
	});

	await page.goto('/search');
	await page.getByLabel('Search').fill('Station Eleven');
	await page.getByRole('button', { name: 'Search' }).click();
	await expect(page.getByRole('heading', { name: 'Station Eleven' }).first()).toBeVisible();
});
