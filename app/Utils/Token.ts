import TokenException from 'App/Exceptions/TokenException'
import jwt from 'jsonwebtoken'
import { TOKENEXPIRED } from './ErrorCode'
class Token {
	public async createToken(email: string, pubId: string) {
		const token: string = jwt.sign({ email: email, pubId: pubId, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'bob', { algorithm: 'HS256' })
		return token
	}

	public async verifyToken (token: string) {
		const isVerify:any = jwt.verify(token, 'bob', (err) => {
			if (err?.message === 'jwt expired') throw new TokenException('', 0, TOKENEXPIRED)
			else return true
		})
		return isVerify
	}

	public async decodeToken (token:string) {
		const decoded:any = jwt.verify(token, 'bob', (err, decoded) => {
			if (err?.message === 'jwt expired') throw new TokenException('', 0, TOKENEXPIRED)
			else return decoded
		})
		return decoded
	}
}

export default new Token()
