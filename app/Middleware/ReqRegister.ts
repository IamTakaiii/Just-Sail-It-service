import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReqRegister {

	private schema() {
		return schema.create({
			pubId: schema.string([ rules.trim(),]),
			username: schema.string([ rules.trim() ]),
			email: schema.string([ rules.email({ ignoreMaxLength: true, })])
		})
	}

	private message() {
		return {
			required: 'The {{ field }} is required to create a new account',
		}
	}

	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		await request.validate({ schema: this.schema(), messages: this.message() })
		await next()
	}
}
