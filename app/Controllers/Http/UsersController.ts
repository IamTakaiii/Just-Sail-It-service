import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Token from 'App/Utils/Token'

export default class UsersController {
	public async create({ request, response }: HttpContextContract) {
		const { pubId, username, email } = request.body()
		try {
			const user = await User.create({
				username: username,
				id: 'user-' + pubId,
				email: email,
				nounce: Math.floor(Math.random()*99999999).toString()
			})
			const token = await Token.createToken(email, pubId)
			response.send({
				status: user.$isPersisted,
				error: null,
				token: token
			})
		}
		catch (err) {
			response.send({
				status: false,
				error: err
			})
		}
	}

	// public async getUserById({ request, response }: HttpContextContract) {
	// 	return ""
	// }
}
