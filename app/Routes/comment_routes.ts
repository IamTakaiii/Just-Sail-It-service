import Route from '@ioc:Adonis/Core/Route'

const prefix = "comment"

// No Auth
Route.group(() => {

	Route.get('/project/:id', 'CommentsController.getByProjectId')
	Route.get('/:id', 'CommentsController.getById')

})
	.prefix(prefix)
	.middleware('CommentReqCheck')

// Auth
Route.group(() => {

	Route.post('/', 'CommentsController.create')
	Route.patch('/', 'CommentsController.update')
	Route.delete('/:id', 'CommentsController.delete' )

})
	.prefix(prefix)
	.middleware([
		"AuthTunnel",
		"CommentReqCheck"
	])
