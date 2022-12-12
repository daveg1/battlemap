import { Router } from 'express'
const mapRouter = Router()

mapRouter.get('/', (req, res) => {
	res.render('map', { session: req.session })
})

export { mapRouter }
