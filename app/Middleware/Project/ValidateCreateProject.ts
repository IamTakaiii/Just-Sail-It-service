import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { PROJECTCATAGORY } from 'App/Constants/Enum'

export default class ValidateCreateProject {

	protected _customSchema = schema.create({
		catagory: schema.enum(Object.values(PROJECTCATAGORY)),
		name: schema.string(),
		description: schema.string(),
		story: schema.string(),
		faq: schema.string(),
		website: schema.string.optional(),
		facebook: schema.string.optional(),
		github: schema.string.optional(),
		instragram: schema.string.optional(),
		linkedin: schema.string.optional(),
		youtube: schema.string.optional(),
		goal: schema.number(),
		start_fund: schema.date({}, [
			rules.afterOrEqual('today')
		]),
		end_fund: schema.date({}, [
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
