import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class ValidateRegister {

	protected _customSchema = schema.create({
		pubId: schema.string([
			rules.trim(),
			rules.minLength(1)
		]),
		username: schema.string([
			rules.trim(),
			rules.minLength(1)
		]),
		email: schema.string([
			rules.email({ ignoreMaxLength: true })
		])
	})

	protected _customMessage = {
		required: 'The { { field } } is required to create a new account',
	}

	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		await request.validate({ schema: this._customSchema, messages: this._customMessage })
		await next()
	}
}
