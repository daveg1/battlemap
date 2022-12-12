import { Router } from 'express'
import { User } from '../../models/User.js'
import { Comment } from '../../models/Comment.js'

const profileRouter = Router()

profileRouter.get('/', (_, res) => {
	// Redirect to home page if no profile was specified.
	res.redirect('/')
})

profileRouter.get('/me', (req, res) => {
	if (req.session.activeUser) {
		res.redirect('/profile/' + req.session.activeUser.username)
	} else {
		res.redirect('/login')
	}
})

profileRouter.get('/edit', async (req, res) => {
	try {
		if (req.session.activeUser) {
			const username = req.session.activeUser.username
			const profile = await User.findOne(
				// search for the user
				{ username },
				// exclude their password
				{ password: 0 },
			)

			if (profile) {
				res.render('edit-profile', { profile, session: req.session })
			} else {
				res.redirect('/login')
			}
		} else {
			res.redirect('/login')
		}
	} catch (error) {
		console.error(error)
		res.json({ status: 'error', message: 'Error loading edit' })
	}
})

profileRouter.post('/edit', async (req, res) => {
	try {
		if (req.session.activeUser) {
			const epithet = req.body.epithet
			const username = req.session.activeUser.username

			const update = await User.updateOne(
				// WHERE username = username
				{ username },
				{ $set: { epithet } },
			)

			if (update) {
				res.json({ status: 'good' })
			} else {
				res.json({ status: 'bad', reason: 'Failed to update' })
			}
		}
	} catch (error) {
		res.json({ status: 'error', message: error })
	}
})

// Get profile with this username
profileRouter.get('/:username', async (req, res) => {
	try {
		const regex = new RegExp(req.params.username, 'i')

		const results = await Promise.all([
			User.findOne(
				// search for the user
				{ username: { $regex: regex } },
				// exclude their password
				{ password: 0 },
			),
			Comment.find(
				// match the comments for the user
				{ profile: { $regex: regex } },
				// exclude the profile field
				{ profile: 0 },
			),
		])

		const [profile, comments] = results
		const session = req.session.activeUser ? req.session : null

		if (profile) {
			res.render('profile', { profile, comments, session })
		} else {
			res.render('profile', { session })
		}
	} catch (error) {
		console.error(error)
		res.json({ status: 'error', message: 'Error loading profile' })
	}
})

// Insert a comment
profileRouter.post('/add-comment', async (req, res) => {
	try {
		const comment = new Comment({
			content: req.body.content,
			author: req.body.author,
			profile: req.body.profile,
			date: new Date(),
		})

		await comment.save()
		res.redirect(`/profile/${req.body.profile}`)
	} catch (error) {
		res.redirect('error') //, { message: error }
	}
})

profileRouter.post('/save-battle', async (req, res) => {
	try {
		if (req.session.activeUser) {
			const name = req.body.name
			const article = req.body.article

			// Attempt to find the battle
			const user = await User.findOne({
				username: req.session.activeUser.username,
				'fave_battles.name': name,
			})

			if (user) {
				res.json({ status: 'bad', reason: 'already saved' })
				return
			}

			// Save the battle to the list
			await User.updateOne(
				{ username: req.session.activeUser.username },
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
		} else {
			res.json({ status: 'bad', reason: 'not logged in' })
		}
	} catch (error) {
		res.json({ status: 'error', message: error })
	}
})

export { profileRouter }
