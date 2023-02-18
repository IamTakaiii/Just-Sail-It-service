import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { AUTH } from 'App/Constants/Error'
import Result from 'App/Helper/ResponseHelper'

export default class AuthorizeException extends Exception {
	public async handle(error: this, { response, logger }: HttpContextContract) {
		switch(error.message) {
			case AUTH.UNAUTH:
				logger.error(error.message)
				return response.status(401).send(Result.fail(error.message, null))
			default:
				return response.status(500).send(Result.fail(error.message, null))
		}
	}
}
