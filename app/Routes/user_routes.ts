import Route from '@ioc:Adonis/Core/Route'

const prefix = "/user"

// No Auth
Route.group(() => {

	Route.post("/", "UsersController.create")

	Route.get("/:id", "UsersController.get")

})
	.prefix(prefix)
	.middleware('UserReqCheck')

// Auth
Route.group(() => {

	Route.patch("/", "UsersController.update")

	Route.delete("/", "UsersController.delete")

})
	.prefix(prefix)
	.middleware([
		"AuthTunnel",
		"UserReqCheck"
	])




