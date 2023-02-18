import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
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

	public messages: CustomMessages = {
		required: 'The {{ field }} is required to update account',
		email: "Invalid email format",
		'*': (field: any, rule: any) => `${rule} validation error on ${field}`
	}
}
