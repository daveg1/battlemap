import { Router } from 'express'
import { User } from '../models/User.js'

const loginRouter = new Router()

loginRouter.get('/', (req, res) => {
	if (req.session.isLoggedIn) {
		res.redirect(`/profile/${req.session.username}`)
	} else {
		res.render('login', { session: req.session })
	}
})

// Try to login
loginRouter.post('/', async (req, res) => {
	try {
		// Use regex for case-insensitive string matching.
		const regex = new RegExp(req.body.username, 'i')
		const user = await User.findOne(
			{
				username: { $regex: regex },
				password: req.body.password,
			},
			{ password: 0 },
		)

		if (user) {
			req.session.username = user.username
			req.session.isLoggedIn = true
			res.json({ status: 'good' })
		} else {
			res.json({ status: 'bad', reason: 'Found no user with those credentials. Try again' })
		}
	} catch (error) {
		console.error(error)
		res.json({ status: 'error', message: error.message })
	}
})

export { loginRouter }
