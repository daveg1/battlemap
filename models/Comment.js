import { model, Schema } from 'mongoose'

const schema = new Schema({
	content: String,
	author: String,
	profile: String,
	date: Date,
})

const Comment = model('Comment', schema)

export { Comment }