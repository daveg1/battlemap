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

profileRouter.get('/edit', async (req, res) => {
	try {
		if (!req.session.isLoggedIn) {
			res.redirect('/login')
			return
		}

		const username = req.session.username
		const profile = await client.collection('users').findOne(
			// search for the user
			{ username },
			// exclude their password
			{ password: 0 },
		)

		if (profile) {
			res.render('edit-profile', { profile, session })
		} else {
			res.redirect('/login')
		}
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

profileRouter.post('/edit', async (req, res) => {
	try {
		const epithet = req.body.epithet
		const username = req.session.username

		const update = await client.collection('users').updateOne(
			// WHERE username = username
			{ username },
			{ $set: { epithet } },
		)

		if (update) {
			res.json({ status: 'good' })
		} else {
			res.json({ status: 'bad', reason: 'Failed to update' })
		}
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

// Get profile with this username
profileRouter.get('/:username', async (req, res) => {
	try {
		const regex = new RegExp(req.params.username, 'i')

		const results = await Promise.all([
			client.collection('users').findOne(
				// search for the user
				{ username: { $regex: regex } },
				// exclude their password
				{ password: 0 },
			),
			client
				.collection('user_comments')
				.find(
					// match the comments for the user
					{ profile: { $regex: regex } },
					// exclude the profile field
					{ profile: 0 },
				)
				.toArray(),
		])

		const [profile, comments] = results
		const session = req.session.isLoggedIn ? req.session : null

		if (profile) {
			res.render('profile', { profile, comments, session })
		} else {
			res.render('profile', { session })
		}
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

// Insert a comment
profileRouter.post('/add-comment', async (req, res) => {
	try {
		await client.collection('user_comments').insertOne({
			content: req.body.content,
			author: req.body.author,
			profile: req.body.profile,
			date: Date.now(),
		})
	} catch (error) {
		res.redirect('error', { message: error.message })
	}
	res.redirect(`/profile/${req.body.profile}`)
})

profileRouter.post('/save-battle', async (req, res) => {
	if (!req.session.isLoggedIn) {
		res.json({ status: 'bad', reason: 'not logged in' })
		return
	}

	try {
		const name = req.body.name
		const article = req.body.article

		// Attempt to find the battle
		const user = await client.collection('users').findOne({
			username: req.session.username,
			'fave_battles.name': name,
		})

		if (user) {
			res.json({ status: 'bad', reason: 'already saved' })
			return
		}

		// Save the battle to the list
		await client.collection('users').updateOne(
			{ username: req.session.username },
			{
				$push: {
					fave_battles: {
						name,
						article,
					},
				},
			},
		)

		res.json({ status: 'good' })
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

export { profileRouter }
