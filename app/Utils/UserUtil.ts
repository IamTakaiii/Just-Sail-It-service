class UserUtil {

	public static genNounce () {
		return Math.floor(Math.random() * 99999999).toString()
	}

	public static async createObject (username: string, id: string, email: string) {
		const payload = {
			id,
			username,
			email,
			nounce: this.genNounce()
		}
		return payload
	}
}

export default UserUtil
