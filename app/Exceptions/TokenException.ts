import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TokenException extends Exception {
	public async handle(error: this, ctx: HttpContextContract) {
		ctx.response.status(error.status).send({ status: false, error: [error.message.substring(17, error.message.length)] })
	}
}
