import path from 'node:path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import { __dirname } from './modules/__dirname.js'
import { router } from './routes/index.js'
import { connectDB } from './modules/connectDB.js'
import { timestamp } from './modules/timestamp.js'
import { IActiveUser } from './interfaces/ActiveUser.js'

if (process.env.NODE_ENV === 'development') {
	await import('dotenv/config')
}

// TODO move this to .d.ts
declare module 'express-session' {
	interface SessionData {
		activeUser: IActiveUser
	}
}

const app = express()
const baseDir = __dirname(import.meta.url)

// Server variables
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(baseDir, 'views'))
app.set('view engine', 'pug')

// Server middleware
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(baseDir, 'public')))

if (process.env.SESSION_SECRET) {
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		}),
	)
} else {
	throw new Error(`${timestamp()} Session secret must be set`)
}

// Server routes
app.use(router)

connectDB().then(() => {
	app.listen(app.get('port'), () => {
		console.log(timestamp(), `Server running at http://localhost:${app.get('port')}/`)
	})
})
