import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'

import User from 'App/Models/User'
import Token from 'App/Utils/TokenUtil'
import UserUtil from 'App/Utils/UserUtil'
import DatabaseException from 'App/Exceptions/DatabaseException'
import { DB_E } from 'App/Constants/ErrorCode'

export default class UsersController {

	public async create ({ request, response }: HttpContextContract) {
		const { pubId, username, email } = request.body()
		const payload = await UserUtil.createObject(username, pubId, email)
		const user = await User.create(payload)
			.catch(err => { throw new DatabaseException('', 0, DB_E.DUPLICATE) })
		const token = await Token.createToken(email, pubId)
		response.send({ status: user.$isPersisted, error: null, payload: token })
	}

	public async profile ({ request, response }: HttpContextContract) {
		const pubId = request.params().id
		const user = await User.findByOrFail('id', pubId)
		response.send({ status: true, error: null, payload: user })
	}

	public async update ({ request, response }: HttpContextContract) {
		const user = await User.findByOrFail('id', request.params().id)
		await user.merge(request.body())
			.save()
			.catch(err => { throw new DatabaseException('', 0, err.code)})
		response.send({ status: true, error: null, payload: null })
	}

	public async delete ({ request, response }: HttpContextContract) {
		const user = await User.findByOrFail('id', request.params().id)
		if (user.user_img) await Drive.delete(user.user_img)
		if (user.user_cover) await Drive.delete(user.user_cover)
		await user.delete()
			.catch(err =>  { throw new DatabaseException('', 0, err.code) })
		response.send({ status: true, error: null, payload: null })
	}

}
