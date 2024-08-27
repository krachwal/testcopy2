import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
// for the following see https://github.com/cypress-io/cypress/issues/25397#issuecomment-1775454875
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		build: {
			outDir: 'dist',
			target: 'esnext'
		},
		define: {
			'process.env': env
		},
		base: '/experiment/',
		plugins: [eslint()]
	};
});
