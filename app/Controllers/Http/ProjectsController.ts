import Drive from '@ioc:Adonis/Core/Drive';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { E_CODE } from 'App/Constants/Error'
import DatabaseException from 'App/Exceptions/DatabaseException'
import ProjectHelper from 'App/Helper/ProjectHelper'
import Result from 'App/Helper/ResponseHelper'
import Project from 'App/Models/Project'

export default class ProjectsController {

	protected signal: boolean = true

	public async create ({ request, response, logger }: HttpContextContract) {
		const decoded = request.body().token
		const info = request.original()
		if (this.signal) {
			const project = await Project.create({ ...info, user_id: decoded.payload.pubId })
				.catch(err => {
					logger.error(err)
					throw new DatabaseException(err.code, 500, E_CODE.PROJECT)
				})
			response.send(Result.success(project))
		}
		else response.status(500).send(Result.fail("Create timeout", {}))
	}

	public async update ({ request, response }: HttpContextContract) {
		const decoded = request.body().token
		const info = request.original()
		const project = await ProjectHelper.checkProjectOwner(info.id, decoded.payload.pubId)
		project.merge(info)
		project.id = project.$original.id
		await project.save()
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		response.send(Result.success(project))
	}

	public async delete ({ request, response }: HttpContextContract) {
		const projectId = request.params().id
		const decoded = request.body().token
		const project = await ProjectHelper.checkProjectOwner(projectId, decoded.payload.pubId)

		if (project.content_image.length > 0) {
			project.content_image.map(async i => {
				await Drive.delete(i)
			})
		}

		if (project.project_image) await Drive.delete(project.project_image)

		await project.delete()
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		response.send(Result.success())
	}

	public async getById ({ request, response }: HttpContextContract) {
		const projectId = request.params().id
		const project = await Project.findByOrFail('id', projectId)
			.catch(err =>  { throw new DatabaseException(err.code, 500, E_CODE.PROJECT)})
		response.send(Result.success(project))
	}

	public async getByUserId({ request, response }: HttpContextContract) {
		const userId = request.params().id
		const allProject = await Project
			.query()
			.select('*')
			.from('projects')
			.where('user_id', '=', userId)
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		response.send(Result.success(allProject))
	}

	public async all({ request, response }: HttpContextContract) {
		const allProject = await ProjectHelper.gettAllByQS(request.qs())
		response.send(Result.success(allProject))
	}

}
