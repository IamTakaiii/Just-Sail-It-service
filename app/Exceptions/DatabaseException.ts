import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { DB, DB_CODE } from 'App/Constants/Error'
import Result from 'App/Helper/ResponseHelper'

export default class DatabaseException extends Exception {
	public async handle(error: this, { response, logger }: HttpContextContract) {
		switch(error.message.split(" ")[1]) {
			case DB_CODE.DUPLICATE:
				logger.error(DB.DUPLICATE)
				return response.status(500).send(Result.fail(DB.DUPLICATE, null))
			case DB_CODE.UNDEFINED_COLUMN:
				logger.error(DB.UNDEFINED_COLUMN)
				return response.status(500).send(Result.fail(DB.UNDEFINED_COLUMN, null))
			default:
				const err = error.code ? `${error.code} : detect unknow error` : DB.UNKNOWN
				return response.status(500).send(Result.fail(err, null))
		}
	}
}
