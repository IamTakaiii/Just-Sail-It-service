import Route from '@ioc:Adonis/Core/Route'

const route = Route.group(() => {

	Route.post('/login', 'AuthController.login')
		.middleware('ValidateLogin')

	Route.get('/check/token', 'AuthController.token')
		.middleware('ValidateAuth')

})
	.prefix('/auth')

export default route
