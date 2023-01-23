import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class DatabaseException extends Exception {
	public async handle(error: this, { response, logger }: HttpContextContract) {
		switch (error.code) {
			case '23505':
				logger.error('Data already exist in database')
				response.status(500).send({ status: false, error:  'Data already exist in database'})
			default:
				response.status(500).send({ status: false, error: 'Unknow error in database' })
		}
	}
}
