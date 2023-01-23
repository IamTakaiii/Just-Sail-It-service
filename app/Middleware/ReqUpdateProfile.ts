import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReqUpdateProfile {

	private schema () {
		return schema.create({
			username: schema.string.optional(),
			email: schema.string.optional([ rules.email() ]),
			location:schema.string.optional(),
			portfolio: schema.string.optional(),
			website: schema.string.optional(),
			user_img: schema.string.optional(),
			about_me: schema.string.optional(),
			educations: schema.array.optional([ rules.minLength(1) ]).anyMembers(),
			skills: schema.array.optional([rules.minLength(1)]).members(schema.string()),
			languages: schema.array.optional([rules.minLength(1)]).members(schema.string()),
			works_exp: schema.array.optional().anyMembers()
		})
	}

	private message () {
		return {
			required: 'The {{ field }} is required to create a new account',
			'email.email': 'invalid email',
			'*': (field, rule) => `${rule} validation error on ${field}`
		}
	}

	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		if (JSON.stringify(request.body()) === '{}') response.status(400).send({ status: false, error: 'empty body' })
		else
			await request.validate({ schema: this.schema(), messages: this.message() })
			await next()
	}
}
