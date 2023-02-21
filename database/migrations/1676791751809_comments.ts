import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
		table.string('id')
			.primary()
			.notNullable()

		table.string('project_id')
			.references('projects.id')
			.onDelete('CASCADE')
			.notNullable()

		table.text('message')
			.notNullable()

		table.string('parent_id')
			.references('comments.id')
			.onDelete('CASCADE')

		table.string('user_id')
			.references('users.id')
			.notNullable()

		table.integer('like')
			.defaultTo(0)

		table.timestamp('created_at', { useTz: true })
		table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
