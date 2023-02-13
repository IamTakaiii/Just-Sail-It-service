import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Token from 'App/Utils/TokenUtil'
import { AUTH_E } from 'App/Constants/ErrorCode'
import AuthException from 'App/Exceptions/AuthException'

export default class ValidateAuthUserUpdate {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		const params = request.params()
		const token = request.headers().authorization?.split(" ")[1]
		const checkedToken = await Token.verifyToken(token ? token : "")
		if (params.id && params.id === checkedToken.payload.pubId) await next()
		else throw new AuthException(`can't update other user data`, 400, AUTH_E.UNAUTHORIZE_UPDATE)
	}
}
