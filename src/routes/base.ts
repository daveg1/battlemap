import { Router } from 'express'
import { User } from '../models/User.js'

const baseRouter = Router()

baseRouter.get('/', (req, res) => {
	res.render('home', { session: req.session })
})

baseRouter.get('/about', (req, res) => {
	res.render('about', { session: req.session })
})

baseRouter.get('/logout', (req, res) => {
	if (req.session.activeUser) {
		delete req.session.activeUser
	}

	res.redirect('/login')
})

// Users search (from navbar)
baseRouter.post('/user-search', async (req, res) => {
	try {
		const regex = new RegExp('^' + req.body.term, 'i')
		const results = await User.find({ username: { $regex: regex } }, { password: 0, epithet: 0 })
		res.json({ status: 'success', results })
	} catch (error) {
		res.json({ status: 'error', message: error })
	}
})

export { baseRouter }
