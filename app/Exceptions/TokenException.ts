import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { TOKEN } from 'App/Constants/Error'
import Result from 'App/Helper/ResponseHelper'

export default class TokenException extends Exception {
	public async handle(error: this, { response }: HttpContextContract) {
		const group = [TOKEN.EXP, TOKEN.INVALID]
		if (group.includes(error.message)) return response.status(401).send(Result.fail(error.message, null))
		else return response.status(400).send(Result.fail(error.message, null))
	}
 }
