import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const base = {
	plugins: [tailwindcss(), sveltekit()],
	test: {
		include: ['src/**/*.test.ts']
	},
	server: {
		host: true,
		port: 5173
	}
};

export default defineConfig(
	process.env.VITEST ? { ...base, resolve: { conditions: ['browser'] } } : base
);
