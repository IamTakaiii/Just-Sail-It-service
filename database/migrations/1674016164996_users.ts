import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'users'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('id')
				.primary()
			table.string('username', 256)
				.unique()
				.notNullable()
			table.string('email', 512)
				.unique()
				.notNullable()
			table.string('nounce', 512)
				.unique()
				.notNullable()
			table.string('location', 512)
			table.string('portfolio', 512)
			table.string('website', 512)
			table.text('user_img')
			table.text('about_me')
			table.specificType('educations', 'JSON[]')
			table.specificType('skills', 'TEXT[]')
			table.specificType('languages', 'TEXT[]')
			table.specificType('works_exp', 'JSON[]')
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
