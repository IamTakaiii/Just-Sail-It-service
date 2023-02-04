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

	// Global Handler when use validator schema
	public async handle(error: any, ctx: HttpContextContract): Promise<any> {

		if (error.code === 'E_VALIDATION_FAILURE') {
			const customMsg = error.messages.errors.map((i) => i.message)
			console.log(error)
			return ctx.response.status(422).send({ status: false, error: customMsg, payload: null })
		}

		if (error.code === 'E_ROW_NOT_FOUND') {
			console.log(error)
			return ctx.response.status(404).send({ status: false, error: `Can't find your data in service database`, payload: error })
		}

		return super.handle(error, ctx)
	}
}
