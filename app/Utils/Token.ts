import jwt from 'jsonwebtoken'

interface CustomToken {
	pubId : string
	email: string
	iat?: any
	exp?: any
}

class Token {

	private errorToken(err: Error) {
		console.log(err)
		return new Error("Token exp or key not valid")
	}

	public async createToken(email: string, pubId: string) {
		const token:string = jwt.sign({ email: email, pubId: pubId, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'bob', { algorithm: 'HS256' })
		return token
	}

	// public async verifyToken(token : string) {
	// 	const decoded = jwt.verify(token, 'bob')
	// 	const result: CustomToken = {
	// 		email:
	// 	}
	// 	return decoded
	// }
}

export default new Token()
