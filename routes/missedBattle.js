import { Router } from 'express'
import { Battle } from '../models/Battle.js'

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
		const battle = new Battle({
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

		await battle.save()
		res.json({ status: 'good' })
	} catch (error) {
		res.json({
			status: 'bad',
			reason: 'failed to insert entry',
		})
	}
})

export { missedBattleRouter }
