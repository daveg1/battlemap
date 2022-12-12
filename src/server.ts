import 'dotenv/config'
import path from 'node:path'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import { __dirname } from '../modules/__dirname.js'
import { router } from './routes/index.js'
import { connectDB } from '../db/mongo.js'
import { timestamp } from '../modules/timestamp.js'

const app = express()

// Server variables
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname(import.meta.url), 'views'))
app.set('view engine', 'ejs')

// Server middleware
app.use(
	session({
		secret: 'secret-key',
		resave: false,
		saveUninitialized: false,
	}),
)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

interface ActiveUser {
	username: string
}

declare module 'express-session' {
	interface SessionData {
		activeUser: ActiveUser
	}
}

// Server routes
app.use(router)

connectDB().then(() => {
	app.listen(app.get('port'), () => {
		console.log(timestamp(), `Server running at http://localhost:${app.get('port')}/`)
	})
})
