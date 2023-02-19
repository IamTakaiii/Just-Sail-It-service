import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

import { marked } from 'marked'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { v4 as uuid } from 'uuid'

const window = new JSDOM('').window
// @ts-expect-error
const purify = DOMPurify(window)

export default class Project extends BaseModel {
	@column({ isPrimary: true })
	public id: string

	@column()
	public user_id: string

	@column()
	public catagory: string

	@column()
	public name: string

	@column()
	public description: string

	@column()
	public story: string

	@column()
	public html_story: string

	@column()
	public goal: number

	@column()
	public start_fund: number

	@column()
	public end_fund: number

	@column()
	public status: string

	@column()
	public total_raised: number

	@column()
	public total_backer: number

	@column()
	public faq: string

	@column()
	public html_faq: string

	@column()
	public website: string

	@column()
	public facebook: string

	@column()
	public github: string

	@column()
	public instagram: string

	@column()
	public linkedin: string

	@column()
	public youtube: string

	@column()
	public project_image: string

	@column()
	public content_image: string[]

	@column()
	public truth_score: number

	@column()
	public smart_contract_id: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime


	@beforeCreate()
	public static beforeCreateHook(project: Project) {
		project.id = `project-${uuid()}`
		project.html_story = purify.sanitize(marked(project.story))
		project.html_faq = purify.sanitize(marked(project.faq))
	}

	@beforeSave()
	public static beforeSaveHook(project: Project) {
		project.html_story = purify.sanitize(marked(project.story))
		project.html_faq = purify.sanitize(marked(project.faq))
	}

}
