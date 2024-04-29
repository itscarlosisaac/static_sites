import {defineConfig} from 'vite';
import vituum from "vituum";
import pug from '@vituum/vite-plugin-pug'
import runPostBuildScript from './plugins/postBuild.js';
import copyFilesPlugin from "./plugins/copyPublic.js";
import transformCss from "./plugins/fixCSSUrls.js";
import ignoreFilesPlugin from "./ignoreFiles.js";

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
	plugins: [
		...pug_plugins,
		ignoreFilesPlugin(),
		runPostBuildScript(),
		copyFilesPlugin('public', 'dist/assets/images', true),
		transformCss(),
	],
	build: {
		copyPublicDir: false,
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