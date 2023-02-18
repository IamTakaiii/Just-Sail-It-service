import Route from '@ioc:Adonis/Core/Route'

const prefix = "auth"

Route.group(() => {

	Route.get('/token', 'AuthController.token')

	Route.post('/login', 'AuthController.login')

})
	.prefix(prefix)
	.middleware('AuthReqCheck')
