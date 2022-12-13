import mongoose from 'mongoose'
import { timestamp } from '../modules/timestamp.js'

export async function connectDB() {
	try {
		const uri = process.env.MONGO_URI || ''

		mongoose.set('strictQuery', false) // TODO move to options object when standardised
		await mongoose.connect(uri)
		console.log(timestamp(), 'Mongo connection made')
	} catch (error) {
		console.error(timestamp(), 'Mongo error while making connection', error)
		throw error
	}
}
