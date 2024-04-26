import copyFiles from "./copyPublic.js";
import fs from "fs";

function prefixCssUrls(cssContent, prefix) {
	const urlRegex = /url\((['"]?)([^'")]+)\1\)/g;
	return cssContent.replace(urlRegex, (match, quote, url) => {
		// Check if the URL is already absolute or a data URI
		if (url.startsWith('http') || url.startsWith('data:')) {
			return match; // Return the original match if it's an absolute URL or data URI
		}
		// Construct the new URL with prefix
		return `url(${quote}${prefix}${url}${quote})`;
	});
}
function transformCss(){
	return {
		name: 'transform-css',
		apply: 'build',
		writeBundle() {
			return new Promise((resolve) => {
				const interval = setInterval(() => {
					if (copyFiles.done) {
						clearInterval(interval);
						fs.readdirSync("dist/assets/css").forEach(file => {
							if( !file.endsWith('.css') ) return;
							let data = fs.readFileSync(`dist/assets/css/${file}`, 'utf8');
							data = prefixCssUrls(data, '../images')
							fs.writeFileSync(`dist/assets/css/${file}`, data, 'utf8');
						})
						resolve();
					} else {
						console.log('Waiting for copyFiles plugin to finish...');
					}
				}, 100);
			});
		}
	}
}

export default transformCss