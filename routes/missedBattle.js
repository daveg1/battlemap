import { Router } from 'express'
const missedBattleRouter = new Router()

missedBattleRouter.get('/', (req, res) => {
	if (req.session.isLoggedIn) {
		res.render('missed-battle', { session: req.session })
	} else {
		res.redirect('/login')
	}
})

missedBattleRouter.post('/', async (req, res) => {
	try {
		const inserted = await client.collection('battles').insertOne({
			name: req.body.name,
			article: req.body.article,
			year: parseInt(req.body.year),
			place: req.body.place,
			country: req.body.country,
			war: req.body.war,
			coords: {
				lat: parseInt(req.body.lat),
				lng: parseInt(req.body.lng),
			},
		})

		if (inserted && inserted.insertedCount === 1) {
			res.json({
				status: 'good',
			})
		} else {
			res.json({
				status: 'bad',
				reason: 'failed to insert entry',
			})
		}
	} catch (error) {
		res.json({ status: 'error', message: error.message })
	}
})

export { missedBattleRouter }
