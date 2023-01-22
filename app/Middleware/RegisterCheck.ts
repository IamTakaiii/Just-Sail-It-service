import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { regisValidator } from 'App/Validator/UserValidator'

export default class RegisterCheck {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		const { validator, message } = regisValidator
		await request.validate({ schema: validator, messages: message })
		await next()
	}
}
