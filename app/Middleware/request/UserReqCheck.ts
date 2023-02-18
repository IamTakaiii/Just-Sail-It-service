import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUserValidator from 'App/Validators/user/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/user/UpdateUserValidator'

export default class UserReqCheck {
	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		const method = request.method()
		const isHasBody = request.hasBody()

		if (!isHasBody && !['GET', 'DELETE'].includes(method) ) {
			response.status(400).send({ status: false, error: "request object is empty", payload: null })
		}

		if (request.matchesRoute('UsersController.create')) {
			await request.validate(CreateUserValidator)
		}

		if (request.matchesRoute('UsersController.update')) {
			await request.validate(UpdateUserValidator)
		}

		await next()
	}
}
