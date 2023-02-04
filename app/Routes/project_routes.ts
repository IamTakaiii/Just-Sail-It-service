import Route from '@ioc:Adonis/Core/Route'

const route = Route.group(() => {
	Route.post('/', 'ProjectsController.create')
		.middleware([
			'ValidateAuth',
			'ValidateCreateProject,'
		])

	Route.patch('/:id', 'ProjectsController.update')
		.middleware([
			'ValidateAuth',
			'ValidateAuthUpdate',
			'ValidateUpdateProject'
		])

})
	.prefix('/project')

export default route
