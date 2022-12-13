export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URI: string
			OPENCAGE_API_TOKEN: string
			SESSION_SECRET: string
			NODE_ENV: 'development' | 'production'
		}
	}
}
