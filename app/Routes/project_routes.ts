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

	Route.get('/all', 'ProjectsController.getAllProject')

	Route.get('/user/:id', 'ProjectsController.getByUserId')

	Route.get('/:id', 'ProjectsController.getById')

})
	.prefix('/project')

export default route
