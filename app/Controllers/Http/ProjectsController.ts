import Drive from '@ioc:Adonis/Core/Drive';
import Event from '@ioc:Adonis/Core/Event'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { E_CODE } from 'App/Constants/Error'
import { EVENTDB } from 'App/Constants/EventCode';
import DatabaseException from 'App/Exceptions/DatabaseException'
import ProjectHelper from 'App/Helper/ProjectHelper'
import Result from 'App/Helper/ResponseHelper'
import Timer from 'App/Helper/TimerHelper';
import Project from 'App/Models/Project'
import File from 'App/Helper/FileHelper';


export default class ProjectsController {

	protected signal: boolean = false

	public async create({ request, response, logger }: HttpContextContract) {
		const decoded = request.body().token
		const info = request.original()
		const sleep = Timer.sleep(10000)
		let smart_contract_id = ""

		Event.on(EVENTDB.SAVE_PROJECT, async (message: string) => {
			const msgObject = JSON.parse(message)
			if (msgObject) {
				console.log(msgObject)
				smart_contract_id = msgObject.id.hex
				setTimeout(() => { sleep.cancel() }, 100)
				this.signal = true
			}
			else {
				setTimeout(() => { sleep.cancel() }, 1000)
			}
		})

		await sleep

		if (this.signal) {
			const project = await Project.create({ ...info, user_id: decoded.payload.pubId, smart_contract_id })
				.catch(err => {
					logger.error(err)
					throw new DatabaseException(err.code, 500, E_CODE.PROJECT)
				})
			response.send(Result.success(project))
		}
		else response.status(500).send(Result.fail("Create timeout", {}))
	}

	public async update({ request, response }: HttpContextContract) {
		const decoded = request.body().token
		const info = request.original()
		const project = await ProjectHelper.checkProjectOwner(info.id, decoded.payload.pubId)
		project.merge(info)
		project.id = project.$original.id
		await project.save()
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		response.send(Result.success(project))
	}

	public async delete({ request, response }: HttpContextContract) {
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

	public async getById({ request, response }: HttpContextContract) {
		const projectId = request.params().id
		const host = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}`
		const project = await Project.findByOrFail('id', projectId)
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		project.content_image = project.content_image.map(i => {
			return File.attechHost(host, i, 'content_image')
		})
		project.project_image = File.attechHost(host, project.project_image, 'project_image')
		response.send(Result.success(project))
	}

	public async getByUserId({ request, response }: HttpContextContract) {
		const userId = request.params().id
		const host = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}`
		const allProject = await Project
			.query()
			.select('*')
			.from('projects')
			.where('user_id', '=', userId)
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		allProject.map(i => {
			i.project_image = File.attechHost(host, i.project_image, 'project_image')
		})
		response.send(Result.success(allProject))
	}

	public async all({ request, response }: HttpContextContract) {
		const allProject = await ProjectHelper.gettAllByQS(request.qs())
		const host = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}`
		allProject.map(i => {
			i.project_image = File.attechHost(host, i.project_image, 'project_image')
		})
		response.send(Result.success(allProject))
	}

}
