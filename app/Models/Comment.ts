import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

export default class Comment extends BaseModel {
	@column({ isPrimary: true })
	public id: string

	@column()
	public project_id: string

	@column()
	public message: string

	@column()
	public parent_id: string

	@column()
	public user_id: string

	@column()
	public like : number

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeCreate()
	public static beforeCreateHook(comment: Comment) {
		comment.id = `comment-${uuid()}`
	}

}
