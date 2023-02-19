import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
	() => import('@ioc:Adonis/Core/BodyParser'),
])

Server.middleware.registerNamed({
	AuthTunnel: () => import('App/Middleware/global/AuthTunnel'),
	AuthReqCheck: () => import('App/Middleware/request/AuthReqCheck'),
	UserReqCheck: () => import('App/Middleware/request/UserReqCheck'),
	ProjectReqCheck: () => import('App/Middleware/request/ProjectReqCheck'),
	CommentReqCheck: () => import('App/Middleware/request/CommentReqCheck'),
})
