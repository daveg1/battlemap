import { model, Schema } from 'mongoose'

export type Coords = {
	lat: number
	lng: number
}

export interface IBattle {
	name: string
	article: string
	year: number
	place: string
	country: string
	war: string
	coords: Coords
}

const schema = new Schema<IBattle>({
	name: { type: String, required: true },
	article: { type: String, required: true },
	year: { type: Number, required: true },
	place: { type: String, required: true },
	country: { type: String, required: true },
	war: { type: String, required: true },
	coords: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
})

const Battle = model('Battle', schema)

export { Battle }
