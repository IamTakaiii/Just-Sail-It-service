import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.post('/register', 'UsersController.create')
		.middleware(['RegisterCheck'])
	Route.get('/:id', 'UsersController.getUserById')
		.middleware(['AuthCheck'])
})
.prefix('/user')

Route.group(() => {
	Route.get('/login', 'AuthController.login')
})
.prefix('/auth')
