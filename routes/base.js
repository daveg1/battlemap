import { Router } from 'express'
const baseRouter = Router()

baseRouter.get('/', (req, res) => {
	res.render('home', { session: req.session })
})

baseRouter.get('/about', (req, res) => {
	res.render('about', { session: req.session })
})

baseRouter.get('/login', (req, res) => {
	console.log(req.session)

	if (req.session.isLoggedIn) {
		res.redirect(`/profile/${req.session.username}`)
	} else {
		res.render('login', { session: req.session })
	}
})

baseRouter.get('/logout', (req, res) => {
	if (req.session.isLoggedIn) {
		delete req.session.isLoggedIn
		delete req.session.username
	}

	res.redirect('/login')
})

baseRouter.get('/missed-battle', (req, res) => {
	if (req.session.isLoggedIn) {
		res.render('missed-battle', { session: req.session })
	} else {
		res.redirect('/login')
	}
})

baseRouter.get('/signup', (req, res) => {
	if (req.session.isLoggedIn) {
		res.redirect('/')
	}

	res.render('signup', { session: req.session })
})

export { baseRouter }
