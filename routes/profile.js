import { Router } from 'express'
const profileRouter = Router()

profileRouter.get('/', (req, res) => {
	// Redirect to home page if no profile was specified.
	res.redirect('/')
})

profileRouter.get('/me', (req, res) => {
	if (req.session.isLoggedIn) {
		res.redirect('/profile/' + req.session.username)
	} else {
		res.redirect('/login')
	}
})

export { profileRouter }
