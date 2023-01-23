import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignatureException extends Exception {
	public async handle(error: this, ctx: HttpContextContract) {
		if (error.message.includes( 'Invalid signature length')) {
			ctx.response.status(400).send({ status: false, error: error.message })
		}
		else if (error.message.includes('Invalid signature v value')) {
			ctx.response.status(401).send({ status: false, error: `Incorrect signature.` })
		}
		else {
			ctx.response.status(error.status).send({ status: false, error: error.message })
		}
	}
}
