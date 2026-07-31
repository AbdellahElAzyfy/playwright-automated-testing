import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	testIgnore: ['**/labs/fixtures/**', '**/labs/broken-traces/**'],
	webServer: {
		command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
		url: 'http://127.0.0.1:4173'
	},
	use: {
		baseURL: 'http://127.0.0.1:4173'
	},
	reporter: [
		['html', { open: 'never', outputFolder: 'playwright-report/html' }],
		['json', { outputFile: 'playwright-report/report.json' }],
		['list']
	],
	projects: [
		{ name: 'setup-db', testMatch: /database\.setup\.ts$/ },
		{
			name: 'setup-auth',
			testMatch: /auth\.setup\.ts$|admin\.setup\.ts$/,
			dependencies: ['setup-db']
		},
		{
			name: 'chromium',
			use: { storageState: 'playwright/.authentication/user.json', browserName: 'chromium' },
			dependencies: ['setup-auth']
		}
	]
});
