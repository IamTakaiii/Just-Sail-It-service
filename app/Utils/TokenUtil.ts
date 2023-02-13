import jwt from 'jsonwebtoken'

import AuthException from 'App/Exceptions/AuthException'
import { AUTH_E } from 'App/Constants/ErrorCode'

class Token {

	public static extractToken(token: string  | undefined ) {
		return token ? token.split(" ")[1] : ""
	}

	public static async createToken(email: string, pubId: string) {
		const token: string = jwt.sign({
			email,
			pubId,
			exp: Math.floor(Date.now() / 1000) + (60 * 60)
		}, 'SECRET', { algorithm: 'HS256' })
		return token
	}

	public static async verifyToken(token: string | undefined): Promise<any> {
		token = token ? token : ""
		const decoded = jwt.verify(token, 'SECRET', (err, payload) => {
			if (err) console.log(err)
			if (err?.message === 'jwt expired') throw new AuthException("token expired", 400, AUTH_E.EXPIRE)
			else if (err) throw new AuthException('invalid token', 400, AUTH_E.INVALID)
			else return { isValid: true, payload }
		})
		return decoded
	}

}

export default Token
