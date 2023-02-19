import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCommentValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		project_id: schema.string(
			[
				rules.required(),
				rules.minLength(5),
				rules.maxLength(1024),
			]
		),
		message: schema.string(
			[
				rules.required(),
				rules.minLength(5),
				rules.maxLength(255),
			]
		),
		user_id: schema.string(
			[
				rules.required(),
				rules.minLength(5),
				rules.maxLength(1024),
			]
		),
		parent_id: schema.string.optional(
			[
				rules.minLength(5),
				rules.maxLength(1024),
			],
		),
		like: schema.number.optional(
			[
				rules.minLength(1),
				rules.maxLength(1024),]
		),
	})

	public messages: CustomMessages = {
		'required': 'The {{ field }} is required for create comment',
		'minLength': 'The {{ field }} is too short',
		'maxLength': 'The {{ field }} is too long',
	}
}
