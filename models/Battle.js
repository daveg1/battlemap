import { model, Schema } from 'mongoose'

const schema = new Schema({
	name: String,
	article: String,
	year: Number,
	place: String,
	country: String,
	war: String,
	coords: {
		lat: Number,
		lng: Number,
	},
})

const Battle = model('Battle', schema)

export { Battle }
