import { Router } from 'express'
import { OpenCage } from '../modules/OpenCage.js'

const mapRouter = Router()

mapRouter.get('/', (req, res) => {
	res.render('map', { session: req.session })
})

// Map routes
mapRouter.post('/search-place', async (req, res) => {
	try {
		const { place, radius } = req.body

		// Find the coords of the place name input.
		const queryCoords = await OpenCage(place)

		// Make sure coords were found
		if (queryCoords) {
			// Get the battles from the DB.
			const battles = await client.collection('battles').find({}).toArray()
			const searchResults = []

			// Only grab the battles within the radius.
			battles.forEach((battle) => {
				const withinRadius = isWithinRadius(battle.coords, queryCoords, radius)
				if (withinRadius) {
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
		res.json({ status: 'error', message: error.message })
		console.error(error)
	}
})

mapRouter.post('/search-battle', async (req, res) => {
	try {
		const regex = new RegExp(req.body.battle, 'i')
		const results = await client
			.collection('battles')
			.find({
				name: { $regex: regex },
			})
			.toArray()

		if (results.length) {
			res.json({ status: 'good', results })
		} else {
			res.json({ status: 'bad', reason: 'No battles found' })
		}
	} catch (error) {
		// Return json response with error message
		res.json({ status: 'error', message: error.message })
	}
})

export { mapRouter }
