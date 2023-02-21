import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'updates'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('id')
				.primary()

			table.string('project_id')
				.references('projects.id')
				.onDelete('CASCADE')
				.notNullable()

			table.string('title')
				.notNullable()

			table.string('description')
				.notNullable()

			table.string('html_description')

			table.specificType('images', 'text[]')
				.defaultTo('[]')

			table.timestamp('created_at', { useTz: true })

			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
