import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LoginValidator from 'App/Validators/auth/LoginValidator'

export default class AuthReqCheck {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		if (request.matchesRoute("AuthController.login")) {
			await request.validate(LoginValidator)
		}
		await next()
	}
}
