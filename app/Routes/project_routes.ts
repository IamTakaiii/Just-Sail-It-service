import Route from '@ioc:Adonis/Core/Route'

const prefix = "project"

// No Auth
Route.group(() => {

	Route.get('/all', 'ProjectsController.all')
	Route.get('/user/:id', 'ProjectsController.getByUserId')
	Route.get('/:id', 'ProjectsController.getById')

})
	.prefix(prefix)
	.middleware('ProjectReqCheck')

// Auth
Route.group(() => {

	Route.post('/', 'ProjectsController.create')
	Route.patch('/', 'ProjectsController.update')
	Route.delete('/:id', 'ProjectsController.delete' )

})
	.prefix(prefix)
	.middleware([
		"AuthTunnel",
		"ProjectReqCheck"
	])
