import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
	() => import('@ioc:Adonis/Core/BodyParser'),
])


Server.middleware.registerNamed({
	ReqRegister: () => import('App/Middleware/ReqRegister'),
	ReqLogin: () => import('App/Middleware/ReqLogin'),
	AuthGetData: () => import('App/Middleware/AuthGetData'),
	AuthUpdateData: () => import('App/Middleware/AuthUpdateData'),
})
