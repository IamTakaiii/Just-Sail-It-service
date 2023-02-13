import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { DB_E } from 'App/Constants/ErrorCode'
import { DB_MSG } from 'App/Constants/ErrorMessage'

export default class DatabaseException extends Exception {
	public async handle(error: this, { response, logger }: HttpContextContract) {
		switch (error.code) {
			case DB_E.DUPLICATE :
				logger.error(`${DB_E.DUPLICATE} : ${DB_MSG.DUPLICATE}`)
				return response.status(500).send({ status: false, error: DB_MSG.DUPLICATE,  payload: error })
			case DB_E.UNDEFINED_COLUMN :
				logger.error(`${DB_E.UNDEFINED_COLUMN}: ${DB_MSG.UNDEFINED_COLUMN}`)
				return response.status(500).send({ status: false, error: DB_MSG.UNDEFINED_COLUMN, payload: error })
			default:
				logger.error(`${ DB_E.UNKNOWN } : ${DB_MSG.UNKNOWN} --> ${error}`)
				return response.status(500).send({status: false, error: DB_MSG, payload: error })
		}
	}
}
