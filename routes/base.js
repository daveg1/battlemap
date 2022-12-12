import { Router } from 'express'
const baseRouter = Router()

baseRouter.get('/', (req, res) => {
	res.render('home', { session: req.session })
})

baseRouter.get('/about', (req, res) => {
	res.render('about', { session: req.session })
})

baseRouter.get('/logout', (req, res) => {
	if (req.session.isLoggedIn) {
		delete req.session.isLoggedIn
		delete req.session.username
	}

	res.redirect('/login')
})

// Users search (from navbar)
baseRouter.post('/user-search', async (req, res) => {
	try {
		const regex = new RegExp('^' + req.body.term, 'i')
		const results = await client
			.collection('users')
			.find({ username: { $regex: regex } }, { password: 0, epithet: 0 })
			.toArray()
		res.json({ status: 'success', results })
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

export { baseRouter }
