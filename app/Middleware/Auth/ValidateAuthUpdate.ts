import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Project from 'App/Models/Project'
import Token from 'App/Utils/TokenUtil'
import { AUTH_E } from 'App/Constants/ErrorCode'
import AuthException from 'App/Exceptions/AuthException'
import User from 'App/Models/User'

export default class ValidateAuthUpdate {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		const token = await Token.verifyToken(Token.extractToken(request.headers().authorization))
		const id = request.params().id
		const path = request.url()

		if (path.includes(`/profile`)) {
			const user = await User.findByOrFail('id', token.payload.pubId)
			if (user.id === token.payload.pubId) await next()
			else throw new AuthException('', 0, AUTH_E.UNAUTHORIZE_UPDATE)
		}
		else if (path.includes(`/project`)) {
			const project = await Project.findByOrFail('id', id)
			if (project.user_id === token.payload.pubId) await next()
			else throw new AuthException('', 0, AUTH_E.UNAUTHORIZE_UPDATE)
		}
		else {
			await next()
		}
	}
}
