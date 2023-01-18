import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {

	protected statusPages = {
		'404': 'errors/not-found',
		'500..599': 'errors/server-error',
	}

	constructor() {
		super(Logger)
	}

	public async handle(error: any, ctx: HttpContextContract): Promise<any> {

		if (error.status === 400) {
			return ctx.response.status(400).send({ status: false, error: error.message })
		}

		if (error.code === 'E_VALIDATION_FAILURE') {
			const customMsg = error.messages.errors.map((i) => i.message)
			return ctx.response.status(422).send({ status: false, error: customMsg })
		}

		return super.handle(error, ctx)
	}

}
