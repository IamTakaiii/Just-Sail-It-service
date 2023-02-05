import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'

import User from 'App/Models/User'
import ImageUtil from 'App/Utils/ImageUtil'
import DatabaseException from 'App/Exceptions/DatabaseException'
import Project from 'App/Models/Project'

export default class ImagesController {
	public async profile ({ request }: HttpContextContract) {
		const profile_image = request.file('profile_image')
		const cover_image = request.file('cover_image')
		const userId = request.params().id

		const profile = new ImageUtil()
		await profile.genName(profile_image?.extname, 'profile')
		await profile.genStream(profile_image?.tmpPath)

		const cover = new ImageUtil()
		await cover.genName(cover_image?.extname, 'cover')
		await cover.genStream(cover_image?.tmpPath)

		const user = await User.findByOrFail('id', userId)

		if (user.user_img) await Drive.delete(user.user_img)
		if (user.user_cover) await Drive.delete(user.user_cover)

		await Drive.putStream(profile.name, profile.stream, { contentType: profile_image?.headers['content-type'] })
		await Drive.putStream(cover.name, cover.stream, { contentType: cover_image?.headers['content-type'] })

		user.user_img = `${profile.host}/${profile.name}`
		user.user_cover = `${cover.host}/${cover.name}`

		await user.save().catch(err => { throw new DatabaseException('', 0, err.code) })
	}

	public async project({ request }: HttpContextContract) {
		const images = request.files('content_images')
		const projectId = request.params().id
		const project = await Project.findByOrFail('id', projectId)
		const projectImages = new ImageUtil()

		await projectImages.genArrayOfName(images, "project")
		await projectImages.genArrayOfStream(images)

		images.map(async(i, index) => {
			await Drive.putStream(projectImages.arrName[index], projectImages.arrStream[index], { contentType: i?.headers['content-type'] })
			.catch(err => console.log(err))
		})

		project.content_image = projectImages.arrUrl

		await project.save().catch(err => { throw new DatabaseException('have error in save project image process ', 500, err.code) })
	}

	public async projectCover ({ request }: HttpContextContract)  {
		const id = request.params().id
		const image = request.file('project_cover')
		const imageUtil = new ImageUtil()
		const project = await Project.findByOrFail('id', id)

		await imageUtil.genName(image?.extname, 'project_cover')
		await imageUtil.genStream(image?.tmpPath)

		await Drive.putStream(imageUtil.name, imageUtil.stream, { contentType: image?.headers['content-type'] })

		project.project_image = `${ imageUtil.host }/${imageUtil.name}`

		await project.save().catch(err => { throw new DatabaseException('have error in save project image process ', 500, err.code) })
	}

}
