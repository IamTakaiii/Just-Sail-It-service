import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ReqLogin {

	private schema () {
		return schema.create({
			pubId: schema.string([
				rules.trim(),
			]),
			signature: schema.string.optional([
				rules.regex(/^((0x[0-9a-f]+)|(\$[0-9a-f]+)|([0-9a-f]+h))$/i),
				rules.trim()
			])
		})
	}

	private message () {
		return {
			'required': 'The {{ field }} is required to login',
			'signature.regex': 'your signature is not hex number.It not valid format'
		}
	}

	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		const { pubId, signature } = request.body()
		await request.validate({ schema: this.schema(), messages: this.message() })
		const user = await User.findByOrFail('id', pubId)
		request.updateBody({ pubId, signature, user })
		if (!signature) response.send({ pubId: user.id, nounce: user.nounce })
		else await next()
	}
}
