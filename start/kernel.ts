import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
	() => import('@ioc:Adonis/Core/BodyParser'),
])


Server.middleware.registerNamed({
	RegisterCheck : () => import('App/Middleware/RegisterCheck')
})
