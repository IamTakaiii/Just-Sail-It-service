import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.post('/register', 'UsersController.create')
		.middleware(['ReqRegister'])
	Route.get('/profile/:id', 'UsersController.getUserProfile')
	Route.patch('/profile/update/:id', 'UsersController.updateUserProfile')
		.middleware(['AuthUpdateData', 'ReqUpdateProfile'])
	Route.delete('/delete/:id', 'UsersController.delete')
		.middleware(['AuthUpdateData'])
})
.prefix('/user')

Route.group(() => {
	Route.post('/login', 'AuthController.login')
		.middleware(['ReqLogin'])
	Route.get('/check/token', 'AuthController.checkToken')
		.middleware(['AuthGetData'])
})
.prefix('/auth')

Route.group(() => {
	Route.put('/profile/:id', 'ImagesController.uploadProfileImg')
		.middleware(['ReqUploadProfileImg'])
})
.prefix('/image')
	.middleware(['AuthUpdateData'])

