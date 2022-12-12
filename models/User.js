import { model, Schema } from 'mongoose'

const schema = new Schema({
	username: String,
	password: String,
	epithet: String,
	fave_battles: [String],
})

const User = model('User', schema)

export { User }
