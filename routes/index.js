import { Router } from 'express'
import { baseRouter } from './base.js'
import { loginRouter } from './login.js'
import { mapRouter } from './map.js'
import { missedBattleRouter } from './missedBattle.js'
import { signupRouter } from './signup.js'
import { profileRouter } from './profile.js'
import mapData from '../public/json/europe.json' assert { type: 'json' }

const router = Router()

router.use('/', baseRouter) // Home
router.use('/login', loginRouter) // Login
router.use('/map', mapRouter) // Map
router.use('/missed-battle', missedBattleRouter) // Missed Battle
router.use('/profile', profileRouter) // Profile
router.use('/signup', signupRouter) // Signup

// TODO Update to /map/data
router.get('/map-data/', (req, res) => {
	res.json(mapData)
})

// 404 route
router.use((req, res) => {
	res.render('404', { session: req.session })
})

export { router }
