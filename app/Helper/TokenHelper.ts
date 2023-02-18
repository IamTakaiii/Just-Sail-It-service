import jwt from 'jsonwebtoken'

import { TOKEN } from 'App/Constants/Error'
import TokenException from 'App/Exceptions/TokenException'

class Token {

	protected static secretCode = "SECRET"

	public static async create(email: string, pubId: string) {
		const secret = this.secretCode
		const exp = Math.floor(Date.now() / 1000) + (60 * 60)
		return jwt.sign({
			email,
			pubId,
			exp
		}, secret, { algorithm: 'HS256' })
	}

	public static extract(token: string | undefined): string {
		if (!token) return ""
		else return token.split(" ")[1]
	}

	public static async decode(token: string | undefined): Promise<any> {
		const secret = this.secretCode
		const extracted = this.extract(token)
		const decoded = jwt.verify(extracted, secret, (err, payload) => this.decodedCallback(err, payload))
		return decoded
	}

	public static decodedCallback(error: Error | null, payload: any) {
		if (error) {
			if (error.message === 'jwt expired') throw new TokenException(TOKEN.EXP)
			else  throw new TokenException(TOKEN.INVALID)
		}
		return { isValid: true, payload: payload }
	}

}

export default Token
