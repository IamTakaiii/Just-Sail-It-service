import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TokenException from 'App/Exceptions/TokenException'
import { INVALIDUPDATE  } from 'App/Utils/ErrorCode'
import Token from 'App/Utils/Token'

export default class AuthUpdateData {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		const token = request.headers().authorization?.split(" ")[1]
		const decoded = await Token.decodeToken(token ? token : "")
		if (decoded.pubId !== request.params().id) throw new TokenException('', 0, INVALIDUPDATE)
		else await next()
	}
}
