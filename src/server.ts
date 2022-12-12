import 'dotenv/config'
import path from 'node:path'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import { __dirname } from './modules/__dirname.js'
import { router } from './routes/index.js'
import { connectDB } from './db/mongo.js'
import { timestamp } from './modules/timestamp.js'
import { IActiveUser } from './types/ActiveUser.js'

const app = express()
const baseDir = __dirname(import.meta.url)

// Server variables
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(baseDir, 'views'))
app.set('view engine', 'pug')

// Server middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(baseDir, 'public')))
app.use(
	session({
		secret: 'secret-key',
		resave: false,
		saveUninitialized: false,
	}),
)

declare module 'express-session' {
	interface SessionData {
		activeUser: IActiveUser
	}
}

// Server routes
app.use(router)

connectDB().then(() => {
	app.listen(app.get('port'), () => {
		console.log(timestamp(), `Server running at http://localhost:${app.get('port')}/`)
	})
})
