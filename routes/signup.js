import { Router } from 'express'
const signupRouter = new Router()

signupRouter.get('/', (req, res) => {
	if (req.session.isLoggedIn) {
		res.redirect('/')
	}

	res.render('signup', { session: req.session })
})

signupRouter.post('/', async (req, res) => {
	try {
		const { username, password } = req.body

		const regex = new RegExp(username, 'i')
		const find = await client
			.collection('users')
			.findOne({ username: { $regex: regex } }, { password: 0 })

		if (find) {
			res.json({ status: 'bad', reason: 'A user with that name exists. Please choose another' })
			return
		}

		const insert = await client.collection('users').insertOne({
			username,
			password,
			epithet: '',
			fave_battles: [],
		})
		if (insert.insertedCount === 1) {
			res.json({ status: 'good' })
		} else {
			res.json({ status: 'bad', message: 'Failed to create account' })
		}
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

export { signupRouter }
