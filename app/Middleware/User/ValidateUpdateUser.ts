import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import { REQEST_MSG } from 'App/Constants/ErrorMessage'

export default class ValidateUpdateUser {

	protected _customSchema = schema.create({
		username: schema.string.optional(),
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

	protected _customMessage = {
		required: 'The {{ field }} is required to create a new account',
		'email.email': 'invalid email',
		'*': (field: any, rule: any) => `${rule} validation error on ${field}`
	}

	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		if (!request.hasBody()) response.status(400).send({ status: false, error: REQEST_MSG.EMPTY, payload: null })
		else
			await request.validate({ schema: this._customSchema, messages: this._customMessage })
			await next()
	}
}
