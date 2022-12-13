import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

export function __dirname(url: string) {
	return dirname(fileURLToPath(url))
}
