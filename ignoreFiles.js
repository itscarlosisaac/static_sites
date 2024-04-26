
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

export default ignoreFilesPlugin;