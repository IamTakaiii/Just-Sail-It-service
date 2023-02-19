import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateCommentValidator from 'App/Validators/comment/CreateCommentValidator'
import UpdateCommentValidator from 'App/Validators/comment/UpdateCommentValidator'

export default class CommentReqCheck {
	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		const method = request.method()
		const isHasBody = request.hasBody()

		if (!isHasBody && !['GET', 'DELETE'].includes(method)) {
			response.status(400).send({ status: false, error: "request object is empty", payload: null })
		}

		if (request.matchesRoute("CommentsController.create")) {
			await request.validate(CreateCommentValidator)
		}
		if(request.matchesRoute("CommentsController.update")) {
			await request.validate(UpdateCommentValidator)
		}

		await next()
	}
}
