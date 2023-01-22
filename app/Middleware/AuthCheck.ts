import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenException from 'App/Exceptions/TokenException'

import Token from 'App/Utils/Token'

export default class AuthCheck {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		try {
			const token = request.headers().authorization?.split(" ")[1]
			await Token.verifyToken(token ? token : "")
			await next()
		}
		catch (err) {
			throw new TokenException('Unauthorized because invalid token', 401, 'E_INVALID_TOKEN')
		}
	}
}
