import Route from '@ioc:Adonis/Core/Route'

const route = Route.group(() => {

	Route.post('/register', 'UsersController.create')
		.middleware('ValidateRegister')

	Route.get('/profile/:id', 'UsersController.profile')

	Route.patch('/profile/update/:id', 'UsersController.update')
		.middleware([
			'ValidateAuth',
			'ValidateAuthUserUpdate',
			'ValidateUpdateUser'
		])

	Route.delete('/delete/:id', 'UsersController.delete')
		.middleware([
			'ValidateAuth',
			'ValidateAuthUserUpdate',
		])

})
	.prefix('/user')

export default route
