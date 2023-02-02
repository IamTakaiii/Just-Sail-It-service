import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ReqUploadProfileImg {

	private schema() {
		return schema.create({
			profile_image: schema.file.optional({
				size: '50mb',
				extnames: ['jpg', 'gif', 'png']
			}),
			cover_image: schema.file.optional({
				size: '50mb',
				extnames: ['jpg', 'gif', 'png']
			})
		})
	}

	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		const cover_image = request.file('cover_image')
		const image = request.file('profile_image')
		if (!cover_image && !image) {
			response.status(400).send({
				status: false,
				error: "Can't find cover_image or profile_image key in request object",
				payload: null
			})
		}
		else if (JSON.stringify(request.file) === '{}' || JSON.stringify(request.files) === '{}') {
			response.status(400).send({ status: false, error: 'empty body', payload: null })
		}
		else {
			await request.validate({ schema: this.schema() })
			await next()
		}
	}
}
