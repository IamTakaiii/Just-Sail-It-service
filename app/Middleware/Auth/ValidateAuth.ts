import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Token from 'App/Utils/TokenUtil'
import AuthException from 'App/Exceptions/AuthException'
import { AUTH_E } from 'App/Constants/ErrorCode'

export default class ValidateAuth {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		const token = request.headers().authorization?.split(" ")[1]
		const checkedToken = await Token.verifyToken(token ? token: "")
		if (checkedToken.isValid) await next()
		else throw new AuthException('invalid token', 400, AUTH_E.INVALID)
	}
}
