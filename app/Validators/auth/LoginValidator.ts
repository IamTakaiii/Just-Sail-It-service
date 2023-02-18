import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		pubId: schema.string([
			rules.trim(),
		]),
		signature: schema.string.optional([
			rules.regex(/^((0x[0-9a-f]+)|(\$[0-9a-f]+)|([0-9a-f]+h))$/i),
			rules.trim()
		])
	})

	public messages: CustomMessages = {
		'required': 'The {{ field }} is required to login',
		'signature.regex': 'your signature is not hex number.It not valid format',
		'*': (field: any, rule: any) => `${rule} validation error on ${field}`
	}
}
