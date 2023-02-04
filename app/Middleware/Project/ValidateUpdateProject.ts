import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { PROJECTCATAGORY } from 'App/Constants/Enum'

export default class ValidateUpdateProject {

	protected _customSchema = schema.create({
		catagory: schema.enum.optional(Object.values(PROJECTCATAGORY)),
		name: schema.string.optional(),
		description: schema.string.optional(),
		story: schema.string.optional(),
		faq: schema.string.optional(),
		website: schema.string.optional(),
		facebook: schema.string.optional(),
		github: schema.string.optional(),
		instragram: schema.string.optional(),
		linkedin: schema.string.optional(),
		youtube: schema.string.optional(),
		goal: schema.number.optional(),
		start_fund: schema.date.optional({}, [
			rules.afterOrEqual('today')
		]),
		end_fund: schema.date.optional({}, [
			rules.afterField('start_fund')
		]),
	})

	protected _customMessage = {
		'required': 'The {{ field }} is required to create project',
		enum: 'The value of {{ field }} must be in {{ options.choices }}',
		enumSet: 'The value of {{ field }} must be in {{ options.choices }}'
	}

	public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
		await request.validate({ schema: this._customSchema, messages: this._customMessage })
		await next()
	}
}
