import { Router } from 'express'
import { User } from '../models/User.js'

const signupRouter = Router()

signupRouter.get('/', (req, res) => {
	if (req.session.activeUser) {
		res.redirect('/')
	}

	res.render('signup', { session: req.session })
})

signupRouter.post('/', async (req, res) => {
	try {
		const { username, password } = req.body

		const regex = new RegExp(username, 'i')
		const user = await User.findOne({ username: { $regex: regex } }, { password: 0 })

		if (user) {
			console.log('Has user')
			res.json({ status: 'bad', reason: 'A user with that name exists. Please choose another' })
			return
		}

		const newUser = new User({
			username,
			password,
			epithet: '',
			fave_battles: [],
		})

		await newUser.save()
		res.json({ status: 'good' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'bad', message: 'Failed to create account' })
	}
})

export { signupRouter }
