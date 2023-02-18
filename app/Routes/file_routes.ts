import Route from '@ioc:Adonis/Core/Route'

const prefix = 'file'

// Auth
Route.group(() => {

	Route.put('/user', 'FilesController.user')
	Route.put('/project_image/:id', 'FilesController.projectCover')
	Route.put('/project_content/:id', 'FilesController.projectContent')

})
	.prefix(prefix)
	.middleware('AuthTunnel')
