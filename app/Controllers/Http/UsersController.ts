import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { E_CODE } from 'App/Constants/Error';
import DatabaseException from 'App/Exceptions/DatabaseException';
import Result from 'App/Helper/ResponseHelper';
import Token from 'App/Helper/TokenHelper';
import User from 'App/Models/User';
import File from 'App/Helper/FileHelper';

export default class UsersController {
	public async create({ request, response }: HttpContextContract) {
		const { pubId, username, email } = request.body()
		await User
			.create({ id: pubId, username: username, email: email, nounce: Math.floor(Math.random() * 99999).toString() })
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.USER) })
		const token = await Token.create(email, pubId)
		response.send(Result.success(token))
	}

	public async update({ request, response }: HttpContextContract) {
		const token = request.body().token
		const updateInfo = request.original()
		const user = await User.findByOrFail('id', token.payload.pubId)
		user.merge(updateInfo)
		user.id = user.$original.id
		await user.save()
		response.send(Result.success(user))
	}

	public async delete ({ request, response }: HttpContextContract) {
		const token = request.body().token
		const user = await User.findByOrFail('id', token.payload.pubId)
		await user.delete()
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.USER) })
		response.send(Result.success(null))
	}

	public async get ({ request, response }: HttpContextContract) {
		const userId = request.params().id
		const user = await User.findByOrFail('id', userId)
		const host = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}`
		user.user_img = File.attechHost(host, user.user_img, 'profile')
		user.user_cover = File.attechHost(host, user.user_cover, 'profile-cover')
		response.send(Result.success(user))
	}

}
