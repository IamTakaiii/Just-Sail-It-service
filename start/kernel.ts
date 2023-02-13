import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
	() => import('@ioc:Adonis/Core/BodyParser'),
])

Server.middleware.registerNamed({
	ValidateAuth: () => import('App/Middleware/Auth/ValidateAuth'),
	ValidateAuthUpdate: () => import('App/Middleware/Auth/ValidateAuthUpdate'),
	ValidateAuthUserUpdate: () => import('App/Middleware/Auth/ValidateAuthUserUpdate'),
	ValidateRegister: () => import('App/Middleware/User/ValidateRegister'),
	ValidateUpdateUser: () => import('App/Middleware/User/ValidateUpdateUser'),
	ValidateLogin: () => import('App/Middleware/Auth/ValidateLogin'),
	ValidateCreateProject: () => import('App/Middleware/Project/ValidateCreateProject'),
	ValidateUpdateProject: () =>import('App/Middleware/Project/ValidateUpdateProject')
})
