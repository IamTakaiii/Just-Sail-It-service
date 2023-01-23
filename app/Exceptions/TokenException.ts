import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { INVALIDTOKEN, INVALIDUPDATE, TOKENEXPIRED } from 'App/Utils/ErrorCode'
export default class TokenException extends Exception {
	public async handle(error: this, { response }: HttpContextContract) {
		switch (error.code) {
			case INVALIDTOKEN:
				return response.status(401).send({ status: false, error:  'Unauthorize because invalid token'})
			case INVALIDUPDATE:
				return response.status(401).send({ status: false, error: `You can't edit other user data` })
			case TOKENEXPIRED:
				return response.status(401).send({ status: false, error: `You token expried` })
			default:
				return response.status(500).send({ status: false, error: `Unknown Token error` })
		}
	}
}
