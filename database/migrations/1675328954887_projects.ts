import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'projects'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('id')
				.primary()

			table.string('user_id')
				.references('users.id')
				.onDelete('CASCADE')
				.notNullable()

			table.string('catagory')
				.notNullable()

			table.string('name')
				.unique()
				.notNullable()

			table.text('description')
				.notNullable()

			table.text('story')
				.notNullable()

			table.text('html_story')
				.notNullable()

			table.decimal('goal', 27, 18)
				.notNullable()

			table.date('start_fund')
				.notNullable()

			table.date('end_fund')
				.notNullable()

			table.string('status')
				.defaultTo('funding')
				.notNullable()

			table.decimal('total_raised', 27, 18)
				.defaultTo(0)
				.notNullable()

			table.integer('total_backer')
				.defaultTo(0)
				.notNullable()

			table.text('faq')
				.notNullable()

			table.text('html_faq')
				.notNullable()

			table.string('website')
			table.string('facebook')
			table.string('github')
			table.string('instagram')
			table.string('linkedin')
			table.string('youtube')

			table.string('project_image')

			table.specificType('content_image', 'TEXT[]')

			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
