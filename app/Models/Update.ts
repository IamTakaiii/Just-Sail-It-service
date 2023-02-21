import { BaseModel, beforeCreate, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { DateTime } from 'luxon'
import { marked } from 'marked'
import { v4 as uuid } from 'uuid'

import Project from 'App/Models/Project'

const window = new JSDOM('').window
// @ts-expect-error
const purify = DOMPurify(window)

export default class Update extends BaseModel {

	@hasOne(() => Project)
	public project: HasOne<typeof Project>

	@column({ isPrimary: true })
	public id: string

	@column()
	public projectId: string

	@column()
	public title: string

	@column()
	public description: string

	@column()
	public html_description: string

	@column()
	public images: string[]

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeCreate()
	public static async beforeCreateHook(update: Update) {
		update.id = `update-${uuid()}`
		update.html_description = purify.sanitize(marked(update.description))
	}

	@beforeSave()
	public static async beforeSaveHook(update: Update) {
		update.html_description = purify.sanitize(marked(update.description))
	}

}
