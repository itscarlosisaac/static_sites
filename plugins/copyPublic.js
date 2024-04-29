import path from "path"
import fs from "fs"

function copyFilesPlugin(from, to, overwrite = false) {
	return {
		name: 'copy-files-plugin',
		apply: 'build',
		writeBundle() {
			const log = msg => console.log('\x1b[36m%s\x1b[0m', msg)
			log(`copy files: ${from} → ${to}`)
			ReadDir(from, to, overwrite)
			copyFilesPlugin.done = true
		}
	}
}

function ReadDir(from, to, overwrite){
	fs.stat(to, async (err, stats) => {
		if (err) {
			fs.mkdirSync(to, { recursive: true })
		}
		Copy(from, to, overwrite)
	})
}

function Copy(from, to, overwrite){
	fs.readdirSync(from).forEach(file => {
		const fromFile = `${from}/${file}`
		const toFile = `${to}/${file}`
		
		const stat = fs.statSync(fromFile)
		
		if (fs.existsSync(toFile) && !overwrite)
			return
		
		if( stat.isDirectory() ) {
			fs.mkdirSync(toFile, { recursive: true })
			ReadDir(fromFile, toFile, overwrite)
		} else {
			log(`• ${fromFile} → ${toFile}`)
			fs.copyFileSync(
			 path.resolve(fromFile),
			 path.resolve(toFile)
			)
		}
	})
}

copyFilesPlugin.done = false

export default copyFilesPlugin