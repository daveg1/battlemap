import { Router } from 'express'
import { getCoords } from '../modules/getCoords.js'
import { Battle, IBattle } from '../models/Battle.js'
import { isPointWithinRadius } from 'geolib'

const mapRouter = Router()

mapRouter.get('/', (req, res) => {
	res.render('map', { session: req.session })
})

// Map routes
mapRouter.post('/search-place', async (req, res) => {
	try {
		const { place, radius } = req.body

		// Find the coords of the place name input.
		const queryCoords = await getCoords(place)

		// Make sure coords were found
		if (queryCoords) {
			// Get the battles from the DB.
			const battles = await Battle.find()
			const searchResults: IBattle[] = []

			// Only grab the battles within the radius.
			battles.forEach((battle: IBattle) => {
				if (
					isPointWithinRadius(
						{ latitude: battle.coords.lat, longitude: battle.coords.lng },
						{ latitude: queryCoords.lat, longitude: queryCoords.lng },
						radius,
					)
				) {
					searchResults.push(battle)
				}
			})

			res.json({
				status: 'good',
				place: queryCoords,
				battles: searchResults,
			})
		} else {
			res.json({
				status: 'bad',
				reason: "Couldn't find co-ordinates for that place.",
			})
		}
	} catch (error) {
		// Return json response with error message
		res.json({ status: 'error', message: error })
		console.error(error)
	}
})

mapRouter.post('/search-battle', async (req, res) => {
	try {
		const regex = new RegExp(req.body.battle, 'i')
		const results = await Battle.find({ name: { $regex: regex } })

		if (results.length) {
			res.json({ status: 'good', results })
		} else {
			res.json({ status: 'bad', reason: 'No battles found' })
		}
	} catch (error) {
		// Return json response with error message
		res.json({ status: 'error', message: error })
	}
})

export { mapRouter }
