import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Token from 'App/Helper/TokenHelper'

export default class AuthTunnel {
	public async handle({ request, logger  }: HttpContextContract, next: () => Promise<void>) {

		const method = request.method()
		logger.info(`Detect Client ${method } Request On AuthTunnel Middleware`)

		const needAuth = ['POST','PATCH', 'PUT', 'DELETE']

		if (needAuth.includes(method)) {
			const token = request.headers().authorization
			const decoded = await Token.decode(token)
			request.updateBody({ ...request.body(), token: decoded })
		}

		await next()
	}
}
