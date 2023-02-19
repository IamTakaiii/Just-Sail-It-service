import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DatabaseException from 'App/Exceptions/DatabaseException'
import Result from 'App/Helper/ResponseHelper'
import Comment from 'App/Models/Comment'

export default class CommmentsController {

	public async getByProjectId({ request, response }: HttpContextContract) {
		const { id } = request.params()
		const { page, limit } = request.qs()
		const comments = await Comment
			.query()
			.where('project_id', id)
			.paginate(page, limit)
			.catch((err) => { throw new DatabaseException(err.message, err.code, err.sqlMessage) })
		response.status(200).send(Result.success(comments))
	}

	public async getById({ request, response }: HttpContextContract) {
		// will change to pagination later
		const { id } = request.params()
		const comment = await Comment.findByOrFail('id', id)
			.catch((err) => { throw new DatabaseException(err.message, err.code, err.sqlMessage) })
		response.status(200).send(Result.success(comment))
	}

	public async create({ request, response }: HttpContextContract) {
		const { project_id, message, parent_id, token } = request.body()
		const comment = await Comment.create({
			project_id,
			message,
			parent_id,
			user_id: token.payload.pubId,
		})
			.catch((err) => { throw new DatabaseException(err.message, err.code, err.sqlMessage) })
		response.status(200).send(Result.success(comment))
	}

	public async update({ request, response }: HttpContextContract) {
		const { id, message, like, token } = request.body()
		const comment = await Comment.findByOrFail('id', id)
			.catch((err) => { throw new DatabaseException(err.message, err.code, err.sqlMessage) })
		if (comment.user_id !== token.payload.pubId) {
			throw new DatabaseException('You are not the owner of this comment', 403, 'You are not the owner of this comment')
		}
		comment.message = message
		comment.like = like || comment.$original.like
		await comment.save()
		response.status(200).send(Result.success(comment))
	}

	public async delete({ request, response }: HttpContextContract) {
		const { id } = request.params()
		const { token } = request.body()
		const comment = await Comment.findByOrFail('id', id)
			.catch((err) => { throw new DatabaseException(err.message, err.code, err.sqlMessage) })
		if (comment.user_id !== token.payload.pubId) {
			throw new DatabaseException('You are not the owner of this comment', 403, 'You are not the owner of this comment')
		}
		await comment.delete()
		response.status(200).send(Result.success(comment.$isPersisted))
	}

}
