import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		username: schema.string.optional([rules.minLength(1), rules.trim()]),
		email: schema.string.optional([rules.email()]),
		location: schema.string.optional(),
		portfolio: schema.string.optional(),
		website: schema.string.optional(),
		user_img: schema.string.optional(),
		about_me: schema.string.optional(),
		educations: schema.array.optional([rules.minLength(1)]).anyMembers(),
		skills: schema.array.optional([rules.minLength(1)]).members(schema.string()),
		languages: schema.array.optional([rules.minLength(1)]).members(schema.string()),
		works_exp: schema.array.optional().anyMembers()
	})

	public messages: CustomMessages = {
		required: 'The {{ field }} is required to update  account',
		email: "Invalid email format",
		'*': (field: any, rule: any) => `${rule} validation error on ${field}`
	}
}
