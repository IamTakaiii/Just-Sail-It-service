import { bufferToHex } from '@ethereumjs/util'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'


import Result from 'App/Helper/ResponseHelper'
import Token from 'App/Helper/TokenHelper'
import User from 'App/Models/User'

export default class AuthController {
	public async login ({ request, response }: HttpContextContract) {
		const { pubId, signature } = request.body()

		const user = await User.findByOrFail('id', pubId)
		const msg = `I am signing my one-time nonce: ${ user.nounce }`
		const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf-8'))
		const address = recoverPersonalSignature({
			data: msgBufferHex,
			signature: signature
		})

		if (address.toLowerCase() === pubId.toLowerCase()) {
			user.nounce = Math.floor(Math.random()*9999999).toString()
			await user.save()
		}

		const token = await Token.create(user.email, user.id)
		response.send(Result.success(token))
	}

	public async token ({ request, response }: HttpContextContract) {
		const decoded = await Token.decode(request.headers().authorization)
		const user = await User.findByOrFail('id', decoded.payload.pubId)
		response.send(Result.success({ userId: user.id, username: user.username, image: user.user_img }))
	}

 }
