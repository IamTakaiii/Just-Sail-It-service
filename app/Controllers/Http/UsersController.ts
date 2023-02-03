import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Token from 'App/Utils/Token'
import DatabaseException from 'App/Exceptions/DatabaseException'
import Drive from '@ioc:Adonis/Core/Drive'

export default class UsersController {
	public async create({ request, response }: HttpContextContract) {
		const { pubId, username, email } = request.body()
		try {
			const user = await User.create({
				username: username,
				id: pubId,
				email: email,
				nounce: Math.floor(Math.random() * 99999999).toString(),
				user_img: `${process.env.RAND_USER_IMG}/seed=${Math.random()}`,
				user_cover: `${process.env.RAND_USER_COVER}`
			})
			const token = await Token.createToken(email, pubId)
			response.send({
				status: user.$isPersisted,
				error: null,
				token: token
			})
		}
		catch (err) {
			console.log(err)
			throw new DatabaseException('', 0, err.code)
		}
	}

	public async getUserProfile({ request, response }: HttpContextContract) {
		const pubId = request.params().id
		const user = await User.findByOrFail('id', pubId)
		response.send({ ...user.$attributes })
	}

	public async updateUserProfile({ request, response }: HttpContextContract) {
		await User
			.query()
			.where('id', request.params().id)
			.update(request.body())
			.catch(err => { throw new DatabaseException('', 0, err.code)})
		response.send({ status: true, error: null })
	}

	public async delete({ request, response }: HttpContextContract) {
		const user = await User.findByOrFail('id', request.params().id)
		if (user.user_img) await Drive.delete(user.user_img)
		await user.delete()
			.catch(err => { throw new DatabaseException('', 0, err.code)})
		response.send({ status: true, error: null })
	}
}
