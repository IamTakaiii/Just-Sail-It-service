import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { PROJECT_CAT } from 'App/Constants/Enums'

export default class UpdateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
	  catagory: schema.enum.optional(Object.values(PROJECT_CAT)),
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

  public messages: CustomMessages = {
	  required: 'The {{ field }} is required to create project',
	  enum: 'The value of {{ field }} must be in {{ options.choices }}',
	  enumSet: 'The value of {{ field }} must be in {{ options.choices }}'
  }
}
