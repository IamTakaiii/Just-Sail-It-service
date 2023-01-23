import { v4 as uuid } from 'uuid'
import fs from 'fs'

import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import DatabaseException from 'App/Exceptions/DatabaseException'

export default class ImagesController {

	public async uploadProfileImg ({ request }: HttpContextContract) {
		const image = request.file('profile_image')
		const userId = request.params().id
		const slugFilename = 'profile_' + uuid()
		const filename =  slugFilename+'.'+image?.extname
		const fileStream = fs.createReadStream(image?.tmpPath! )
		const user = await User.findByOrFail('id', userId)
		await Drive.delete(user.user_img)
		await Drive.putStream(filename, fileStream, { contentType: image?.headers['content-type'] })
		user.user_img = filename
		await user.save().catch(err => { throw new DatabaseException('', 0, err.code) })
	}

}
