import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

// import Project from 'App/Models/Project'

export default class User extends BaseModel {

	// @hasMany(() => Project)
	// public projects: HasMany<typeof Project>

	@column({ isPrimary: true })
	public id: string

	@column()
	public username: string

	@column()
	public email: string

	@column()
	public nounce: string

	@column()
	public location: string

	@column()
	public portfolio: string

	@column()
	public website: string

	@column()
	public user_img: string

	@column()
	public user_cover: string

	@column()
	public about_me: string

	@column()
	public skills: string[]

	@column()
	public languages: string[]

	@column()
	public works_exp: object[]

	@column()
	public educations: object[]

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

}
