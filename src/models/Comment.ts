import { model, Schema } from 'mongoose'

export interface IComment {
	content: string
	author: string
	profile: string
	date: Date
}

const schema = new Schema<IComment>({
	content: { type: String, required: true },
	author: { type: String, required: true },
	profile: { type: String, required: true },
	date: { type: Date, required: true },
})

const Comment = model('Comment', schema)

export { Comment }
