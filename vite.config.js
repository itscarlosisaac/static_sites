import {defineConfig} from 'vite';
import vituum from "vituum";
import pug from '@vituum/vite-plugin-pug'
import runPostBuildScript from './plugins/postBuild.js';

function ignoreFilesPlugin() {
	return {
		name: 'ignore-files',
		transform(code, id) {
			if (id.endsWith('.scss') && id.includes('/_')) {
				return {code: '', map: null};
			}
		}
	};
}

const pug_plugins = [
	vituum(), pug({
		root: './src',
		data: "./src/**/*pug.json",
		options: {
			pretty: true,
		},
	})
]
export default defineConfig({
	plugins: [...pug_plugins, ignoreFilesPlugin(), runPostBuildScript()],
	build: {
		manifest: true,
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			output: {
				assetFileNames: assetInfo => {
					if (assetInfo.name.endsWith('.css')) return 'assets/css/[name].[hash][extname]';
					if (assetInfo.name.endsWith('.js')) return 'assets/js/[name].[hash][extname]';
					return 'assets/[name].[hash][extname]';
				},
			},
		},
	},
});