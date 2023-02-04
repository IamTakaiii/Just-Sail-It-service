import Route from '@ioc:Adonis/Core/Route'

const route = Route.group(() => {

	Route.put('/profile/:id', 'ImagesController.profile')

	Route.put('/project/:id', 'ImagesController.project')

})
	.prefix('/image')
	.middleware([
		'ValidateAuth',
		'ValidateAuthUpdate'
	])

export default route
