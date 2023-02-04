import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Drive from '@ioc:Adonis/Core/Drive'

import Token from 'App/Utils/TokenUtil'
import Timer from 'App/Utils/TimerUtil'
import Project from 'App/Models/Project'

import ProjectUtil from 'App/Utils/ProjectUtil'
import { SERVER_MSG } from 'App/Constants/ErrorMessage'
import { EVENTDB } from 'App/Constants/EventCode'
import DatabaseException from 'App/Exceptions/DatabaseException'
import ImageUtil from 'App/Utils/ImageUtil'

export default class ProjectsController {

	protected signal: boolean = true

	public async create ({ request, response  }: HttpContextContract) {
		const sleep = Timer.sleep(1000)
		const token = await Token.verifyToken(Token.extractToken(request.headers().authorization))

		Event.on(EVENTDB.SAVE_PROJECT, async (str: string) => {
			if (str === request.body().name) {
				setTimeout(() => { sleep.cancel() }, 100)
				this.signal = true
			}
			else {
				setTimeout(() => { sleep.cancel() }, 1000)
			}
		})

		await sleep

		if (this.signal) {
			await Project.create(ProjectUtil.crateObject(token.payload.pubId, request.body()))
				.catch(err => {
					console.log(err)
					throw new DatabaseException("", 0, err.code)
				})
			response.send({ status: true, error: null, payload: request.body() })
		}
		else {
			response.status(500).send({ status: this.signal, error: SERVER_MSG.TIMEOUT, payload: null })
		}
	}

	public async update ({request, response}: HttpContextContract) {
		const project = await Project.findByOrFail('id', request.params().id)
		await project
			.merge(request.body())
			.save()
			.catch(err => { throw new DatabaseException('', 0, err.code) })
		response.send({ status: true, error: null, payload: project })
	}

	public async getById ({ request, response }: HttpContextContract) {
		const project = await Project.findByOrFail('id', request.params().id)
		response.send({ status: true, error: null, payload: project })
	}

	public async getByUserId ({ request, response }: HttpContextContract) {
		const { page, limit } = request.qs()
		const userId = request.params().id
		const projects = await Project
			.query()
			.where('user_id', '=', userId)
			.paginate(page ? page : 1, limit ? limit : 20)
			.catch(err => { throw new DatabaseException('', 0, err.code) })
		response.send({ status: true, error: null, payload: projects })
	}

	public async getAllProject ({ request, response }: HttpContextContract) {
		const { page, limit } = request.qs()
		const projects = await Project
			.query()
			.where('status', '=', 'funding')
			.paginate(page ? page : 1, limit ? limit : 20)
			.catch(err => { throw new DatabaseException('', 0, err.code) })
		response.send({ status: true, error: null, payload: projects })
	}

	public async delete ({ request, response }: HttpContextContract) {
		const project = await Project.findByOrFail('id', request.params().id)
		const contentImages = project.content_image
		const imgUtil = new ImageUtil()
		if (contentImages) {
			contentImages.map(async image => {
				let name = image.replace(imgUtil.host+'/' , "")
				await Drive.delete(name).catch(err => console.log(err))
			})
		}
		await project.delete()
			.catch(err => { throw new DatabaseException('', 0, err.code) })
		response.send({ status: true, error: null, payload: null })
	}

 }
