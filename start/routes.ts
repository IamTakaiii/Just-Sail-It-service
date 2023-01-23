import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.post('/register', 'UsersController.create')
		.middleware(['ReqRegister'])
	Route.get('/profile/:id', 'UsersController.getUserProfile')
		.middleware(['AuthGetData'])
	Route.patch('/profile/update/:id', 'UsersController.updateUserProfile')
		.middleware(['AuthUpdateData', 'ReqUpdateProfile'])
	Route.delete('/delete/:id', 'UsersController.delete')
		.middleware(['AuthUpdateData'])
})
.prefix('/user')

Route.group(() => {
	Route.post('/login', 'AuthController.login')
		.middleware(['ReqLogin'])
})
.prefix('/auth')
