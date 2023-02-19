import Drive from '@ioc:Adonis/Core/Drive';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import File from 'App/Helper/FileHelper';
import ProjectHelper from 'App/Helper/ProjectHelper';
import User from 'App/Models/User';

export default class FilesController {

	public async user({ request }: HttpContextContract) {
		const profile = request.file('profile_image')
		const cover = request.file('cover_image')
		const decoded = request.body().token
		const user = await User.findByOrFail('id', decoded.payload.pubId)

		if (profile) {
			const file = await File.make(profile, 'profile')
			user.user_img ? await Drive.delete(user.user_img) : ''
			user.user_img = file.name
			await Drive.putStream(file.name, file.stream, { contentType: profile?.headers['content-type'] })
				.catch(err => console.log(err))
		}
		if (cover) {
			const file = await File.make(cover, 'profile-cover')
			user.user_cover ? await Drive.delete(user.user_cover) : ''
			user.user_cover = file.name
			await Drive.putStream(file.name, file.stream, { contentType: cover?.headers['content-type'] })
				.catch(err => console.log(err))
		}

		await user.save()
			.catch(err => console.log(err))
	}

	public async projectCover({ request }: HttpContextContract) {
		const image = request.file('project_image')
		const decoded = request.body().token
		const projectId = request.params().id
		const project = await ProjectHelper.checkProjectOwner(projectId, decoded.payload.pubId)
		if (image) {
			const file = await File.make(image, 'project_image')
			project.project_image ? await Drive.delete(project.project_image) : ''
			project.project_image = file.name
			await Drive.putStream(file.name, file.stream, { contentType: image?.headers['content-type'] })
				.catch(err => console.log(err))
		}

		await project.save()
			.catch(err => console.log(err))
	}

	public async projectContent({ request }: HttpContextContract) {
		const images = request.files('content_image')
		const decoded = request.body().token
		const projectId = request.params().id
		const project = await ProjectHelper.checkProjectOwner(projectId, decoded.payload.pubId)

		const files = await File.makes(images, 'content_image')
			.then(result => Promise.all(result))

		files.forEach(async image => await Drive.putStream(image.name, image.stream, { contentType: images[0]?.headers['content-type'] }))

		let  fileNames = files.map(i => i.name)
		project.content_image = project.content_image ?  project.content_image : []
		fileNames = [...fileNames, ...project.content_image]

		project.content_image = fileNames

		await project.save()
			.catch(err => console.log(err))
	}
}
