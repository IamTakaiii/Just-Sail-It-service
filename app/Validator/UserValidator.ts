import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const regisValidator = {
	validator: schema.create({
		pubId: schema.string([
			rules.trim(),
		]),
		username: schema.string([
			rules.trim()
		]),
		email: schema.string([
			rules.email({ ignoreMaxLength: true, })
		])
	}),
	message: {
		required: 'The {{ field }} is required to create a new account',
	}
}
