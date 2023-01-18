import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.post('/register', 'UsersController.create')
		.middleware(['RegisterCheck'])
})
.prefix('/user')
