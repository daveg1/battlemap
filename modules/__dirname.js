import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

export function __dirname(url) {
	return dirname(fileURLToPath(url))
}
