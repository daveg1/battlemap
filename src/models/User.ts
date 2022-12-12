import { model, Schema } from 'mongoose'

export type FaveBattle = {
	name: string
	article: string
}

export interface IUser {
	username: string
	password: string
	epithet: string
	fave_battles: FaveBattle[]
}

const schema = new Schema<IUser>({
	username: { type: String, required: true },
	password: { type: String, required: true },
	epithet: { type: String },
	fave_battles: [
		{
			name: { type: String, required: true },
			article: { type: String, required: true },
		},
	],
})

const User = model('User', schema)

export { User }
