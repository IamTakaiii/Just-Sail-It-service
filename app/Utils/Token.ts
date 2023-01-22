import TokenException from 'App/Exceptions/TokenException'
import jwt from 'jsonwebtoken'
class Token {
	public async createToken(email: string, pubId: string) {
		const token: string = jwt.sign({ email: email, pubId: pubId, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'bob', { algorithm: 'HS256' })
		return token
	}

	public async verifyToken(token: string) {
		const decoded = jwt.verify(token, 'bob', (err, decoded) => {
			if (err) throw new Error('Invalid Token')
			else decoded
		})
		return decoded
	}
}

export default new Token()
