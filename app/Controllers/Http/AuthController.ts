import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { bufferToHex } from '@ethereumjs/util'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'

import Token from 'App/Utils/TokenUtil'
import UserUtil from 'App/Utils/UserUtil'
import User from 'App/Models/User'
import SignatureException from 'App/Exceptions/SignatureException'

export default class AuthController {
	public async login({ request, response }: HttpContextContract) {
		try {
			const { pubId, signature, user } = request.body()
			const msg = `I am signing my one-time nonce: ${user.nounce}`
			const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf-8'))
			const address = recoverPersonalSignature({
				data: msgBufferHex,
				signature: signature
			})
			if (address.toLowerCase() === pubId.toLowerCase()) {
				user.nounce = UserUtil.genNounce()
				await user.save()
			}
			const token = await Token.createToken(user.email, pubId)
			response.send({ status: true, error: null, token })
		}
		catch (err) {
			throw new SignatureException(err.message)
		}
	}

	public async token({ request, response }: HttpContextContract) {
		const token = await Token.verifyToken(Token.extractToken(request.headers().authorization))
		const user = await User.findByOrFail('email', token.payload.email)
		const payload = { userId: user.id, username: user.username, image: user.user_img }
		response.send({ status: true, error: null, payload: payload })
	}
 }
