import { bufferToHex } from '@ethereumjs/util'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import Token from 'App/Utils/Token'
import SignatureException from 'App/Exceptions/SignatureException';
export default class AuthController {
	public async login({ request, response }:HttpContextContract) {
		try {
			const { pubId, signature, user } = request.body()
			const msg = `I am signing my one-time nonce: ${user.nonce}`
			const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf-8'))
			const address = recoverPersonalSignature({
				data: msgBufferHex,
				signature: signature
			})
			if (address.toLowerCase() === pubId.toLowerCase()) {
				user.nonce = Math.floor(Math.random() * 100000).toString()
				await user.save()
			}
			const token = await Token.createToken(user.email  ,pubId)
			response.send({status: true, error: null,  token })
		}
		catch (err) {
			throw new SignatureException(err.message)
		}
	}
}
