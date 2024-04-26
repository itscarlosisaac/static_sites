import fs from 'fs'
function replaceStringInHtml(htmlContent, targetString, replacementString) {
	// Create a global regular expression from the target string
	const regex = new RegExp(targetString, 'gs');
	
	// Replace all instances of targetString with replacementString
	return htmlContent.replace(regex, replacementString);
}

function read_directory(path, manifest){
	fs.readdir('./dist', (err, files) => {
		files.forEach(file => {
			const isFile = fs.lstatSync(`./dist/${file}`).isFile();
			if( isFile ) {
				// Read the file and modify the entry points with the manifest.json
				Object.entries(manifest)
				 .forEach(([key, value]) => {
					 let data = fs.readFileSync(`./dist/${file}`, 'utf8');
					 data = replaceStringInHtml(data, value.src, value.file)
					 fs.writeFileSync(`./dist/${file}`, data, 'utf8');
				 })
			}
		})
	});
}

function runPostBuildScript() {
	return {
		name: 'run-post-build', // name of the plugin
		apply: 'build',          // apply this plugin only for build commands
		writeBundle: async () =>  {
			const manifest = JSON.parse(fs.readFileSync('./dist/.vite/manifest.json', 'utf8'));
			read_directory('./dist', manifest)
		}
	};
}

export default runPostBuildScript;