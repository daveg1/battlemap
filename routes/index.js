import { Router } from 'express'
import { baseRouter } from './base.js'
import { mapRouter } from './map.js'
import { profileRouter } from './profile.js'
import mapData from '../public/json/europe.json' assert { type: 'json' }

const router = Router()

router.use('/', baseRouter) // Home
router.use('/map', mapRouter) // Map
router.use('/profile', profileRouter) // Profile

// TODO Update to /map/data
router.get('/map-data/', (req, res) => {
	res.json(mapData)
})

export { router }
