import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ReqUploadImg {

	private schema() {
		return schema.create({
			profile_image: schema.file.optional({
				size: '50mb',
				extnames: ['jpg', 'gif', 'png']
			})
		})
	}

	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		if (JSON.stringify(request.file) === '{}' || JSON.stringify(request.files) === '{}') response.status(400).send({ status: false, error: 'empty body' })
		await request.validate({ schema: this.schema() })
		await next()
	}
}
