import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { AUTH_E } from 'App/Constants/ErrorCode'
import { AUTH_MSG } from 'App/Constants/ErrorMessage'

export default class AuthException extends Exception {
	public async handle(error: this, { response, logger }: HttpContextContract) {
		switch (error.code) {
			case AUTH_E.INVALID:
				logger.error(`${AUTH_E.INVALID} : ${AUTH_MSG.INVALID}`)
				return response.status(400).send({ status: false, error: AUTH_MSG.INVALID, payload: error })
			case AUTH_E.UNAUTHORIZE_UPDATE:
				logger.error(`${AUTH_E.UNAUTHORIZE_UPDATE} : ${AUTH_MSG.UNAUTHORIZE_UPDATE}`)
				return response.status(400).send({ status: false, error: AUTH_MSG.UNAUTHORIZE_UPDATE, payload: error })
			case AUTH_E.EXPIRE:
				logger.error(`${AUTH_E.EXPIRE} : ${AUTH_MSG.EXPIRE}`)
				return response.status(400).send({ status: false, error: AUTH_MSG.EXPIRE, payload: error })
			default:
				logger.error(`${AUTH_E.UNKNOWN} : ${AUTH_MSG.UNKNOWN} --> ${error}`)
				return response.status(500).send({ status: false, error: AUTH_E.UNKNOWN, payload: error })
		}
	}
}
