import test, { expect } from '@playwright/test';

// 1
test('Add to shelf button is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByRole('button', { name: 'Add to shelf' })).toBeVisible();
});

// 2
test('Cancel button is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
});

// 3
test('Out of stock button is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByRole('button', { name: 'Out of stock' })).toBeDisabled();
});

// 4
test('Search input is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByLabel('Search')).toBeVisible();
});

// 5
test('First Delete button is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
});

// 6
test('Remove button inside third Reading list item is visible on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	await expect(
		page
			.getByRole('list', { name: 'Reading list' })
			.getByRole('listitem')
			.nth(3)
			.getByRole('button', { name: 'Remove' })
	).toBeVisible();
});

// 7
test('Rate this book button inside the article labeled "Piranesi by Susanna Clarke" is visible on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	await expect(
		page
			.getByRole('article', { name: 'Piranesi by Susanna Clarke' })
			.getByRole('button', { name: 'Rate this book' })
	).toBeVisible();
});

// 8
test('Author input hint text "Last name, first name" is visible on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	const authorInput = page.getByLabel('Author');
	await expect(authorInput).toHaveAccessibleDescription('Last name, first name');
});

// 9
test('A Paragraph that contains 42 days is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByText(/42 days/)).toBeVisible();
});

// 10
test('The text "3 of 12 books finished" is visible on the playground page', async ({ page }) => {
	await page.goto('/playground');
	await expect(page.getByText('3 of 12 books finished')).toBeVisible();
});

// 11
test('The text "You have 4 books on your shelf right now" is visible on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	await expect(page.getByText('You have 4 books on your shelf right now')).toBeVisible();
});

// 12
test('Book ratings table has 3 data rows on the playground page', async ({ page }) => {
	await page.goto('/playground');
	const table = page.getByRole('table', { name: 'Book ratings' });
	const rows = table.getByRole('row');
	await expect(rows).toHaveCount(4);
});

// 13
test('Reading list has 4 elements on the playground page', async ({ page }) => {
	await page.goto('/playground');
	const list = page.getByRole('list', { name: 'Reading list' });
	const items = list.getByRole('listitem');
	await expect(items).toHaveCount(4);
});

// 14
test('The detail paragraph about Station Eleven appears after clicking button Show details on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	const btn = page.getByRole('button', { name: 'Show details' });
	await btn.click();
	await expect(
		page.getByText(
			'Station Eleven is a post-apocalyptic novel by Emily St. John Mandel, published in 2014.'
		)
	).toBeVisible();
});

// 15
test('The "Newly loaded books" has 2 items after clicking button Load more on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	const btn = page.getByRole('button', { name: 'Load more' });
	await btn.click();
	await expect(
		page.getByRole('list', { name: 'Newly loaded books' }).getByRole('listitem')
	).toHaveCount(2);
});

// 16
test('"Loading…" is visible, then it disappears and "Content loaded" appears on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	await expect(page.getByText('Loading...')).toBeVisible();
	await expect(page.getByText('Loading...')).toBeHidden();
	await expect(page.getByText('Content loaded')).toBeVisible();
});

// 17
test('After clicking "Rate this book" button a dialog appears on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	const btn = page.getByRole('button', { name: 'Rate this book' }).last();
	await btn.click();
	await expect(page.getByRole('dialog')).toBeVisible();
});

// 18
test('Select 4 stars and click "Save rating" in the dialog on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	const btn = page.getByRole('button', { name: 'Rate this book' }).last();
	await btn.click();

	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();

	const stars4 = dialog.getByRole('radio', { name: '4 stars' });
	await stars4.check();
	const saveBtn = dialog.getByRole('button', { name: 'Save rating' });
	await saveBtn.click();
});

// 19
test('Dialog disappears after clicking Cancel button on the playground page', async ({ page }) => {
	await page.goto('/playground');

	const ratebtn = page.getByRole('button', { name: 'Rate this book' }).last();
	await ratebtn.click();

	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();

	const cancelBtn = dialog.getByRole('button', { name: 'Cancel' });
	await cancelBtn.click();
	await expect(dialog).toBeHidden();
});

// 20
test('Select the alert that says "Unsaved changes will be lost" on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	await expect(page.getByRole('alert')).toBeVisible();
});

// 21
test('"Toggle panel" button has aria-expanded set to false. Click it. Assert that aria-expanded is now true and the panel content is visible on the playground page', async ({
	page
}) => {
	await page.goto('/playground');
	const toggleButton = page.getByRole('button', { name: 'Toggle panel' });
	const panelId = await toggleButton.getAttribute('aria-controls');

	await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

	await toggleButton.click();

	await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
	await expect(page.locator(`#${panelId}`)).toBeVisible();
});
