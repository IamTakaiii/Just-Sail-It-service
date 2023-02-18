import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateProjectValidator from 'App/Validators/project/CreateProjectValidator'
import UpdateProjectValidator from 'App/Validators/project/UpdateProjectValidator'

export default class ProjectReqCheck {
	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {

		if (request.matchesRoute('ProjectsController.create')) {
			await request.validate(CreateProjectValidator)
		}

		if(request.matchesRoute('ProjectsController.update')) {
			await request.validate(UpdateProjectValidator)
		}

		await next()
	}
}
