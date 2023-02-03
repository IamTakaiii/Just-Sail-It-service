import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import DatabaseException from 'App/Exceptions/DatabaseException'
import File from 'App/Utils/Files'

export default class ImagesController {

	public async uploadProfileImg ({ request }: HttpContextContract) {
		const cover_image = request.file('cover_image')
		const image = request.file('profile_image')
		const userId = request.params().id

		const profile = new File()
		await profile.genName(image?.extname, 'profile')
		await profile.readStream(image?.tmpPath)

		const cover = new File()
		await cover.genName(cover_image?.extname, 'cover_profile')
		await cover.readStream(cover_image?.tmpPath)

		const user = await User.findByOrFail('id', userId)

		if (user.user_img) await Drive.delete(user.user_img)
		if (user.user_cover) await Drive.delete(user.user_cover)

		await Drive.putStream(profile.fileName, profile.fileStream, { contentType: image?.headers['content-type'] })
		await Drive.putStream(cover.fileName, cover.fileStream, { contentType: image?.headers['content-type'] })

		user.user_img = `${process.env.S3_SHOW_ENDPOINT}/${process.env.S3_BUCKET}/${profile.fileName}`
		user.user_cover = `${process.env.S3_SHOW_ENDPOINT}/${process.env.S3_BUCKET}/${cover.fileName}`

		await user.save().catch(err => { throw new DatabaseException('', 0, err.code) })
	}

}
