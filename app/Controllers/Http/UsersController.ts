import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Token from 'App/Utils/Token'
import DatabaseException from 'App/Exceptions/DatabaseException'

export default class UsersController {
	public async create({ request, response }: HttpContextContract) {
		const { pubId, username, email } = request.body()
		try {
			const user = await User.create({
				username: username,
				id: pubId,
				email: email,
				nounce: Math.floor(Math.random() * 99999999).toString()
			})
			const token = await Token.createToken(email, pubId)
			response.send({
				status: user.$isPersisted,
				error: null,
				token: token
			})
		}
		catch (err) {
			throw new DatabaseException('', 0, err.code)
		}
	}

	public async getUserProfile({ request, response }: HttpContextContract) {
		const pubId = request.params().id
		const user = await User.findByOrFail('id', pubId)
		response.send(user)
	}

	public async updateUserProfile({ request, response }: HttpContextContract) {
		await User
			.query()
			.where('id', request.params().id)
			.update(request.body())
			.catch(err => { throw new DatabaseException('', 0, err.code)})
		response.send({ status: true, error: null })
	}
}
