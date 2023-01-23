import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TokenException from 'App/Exceptions/TokenException'
import { INVALIDTOKEN } from 'App/Utils/ErrorCode'
import Token from 'App/Utils/Token'

export default class AuthGetData {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		const token = request.headers().authorization?.split(" ")[1]
		const isVerify = await Token.verifyToken(token ? token : "")
		if (isVerify) await next()
		else throw new TokenException('', 0, INVALIDTOKEN)
	}
}
