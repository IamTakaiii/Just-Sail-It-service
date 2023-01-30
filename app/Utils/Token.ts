import TokenException from 'App/Exceptions/TokenException'
import jwt from 'jsonwebtoken'
import { INVALIDTOKEN, TOKENEXPIRED } from './ErrorCode'
class Token {
	public static async createToken(email: string, pubId: string) {
		const token: string = jwt.sign({ email: email, pubId: pubId, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'bob', { algorithm: 'HS256' })
		return token
	}

	public static async verifyToken (token: string) {
		const isVerify:any = jwt.verify(token, 'bob', (err) => {
			if (err?.message === 'jwt expired') throw new TokenException('', 0, TOKENEXPIRED)
			else if (err) throw new TokenException('', 0, INVALIDTOKEN)
			else return true
		})
		return isVerify
	}

	public static async decodeToken (token:string) {
		const decoded:any = jwt.verify(token, 'bob', (err, decoded) => {
			if (err?.message === 'jwt expired') throw new TokenException('', 0, TOKENEXPIRED)
			else return decoded
		})
		return decoded
	}
}

export default Token
