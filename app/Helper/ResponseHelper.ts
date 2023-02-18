class Result {
	public static success(payload?: any,) {
		return {
			status: true,
			error: null,
			payload: payload
		}
	}
	public static fail(msg: string, payload: any) {
		return {
			status: false,
			error: msg,
			payload: payload
		}
	}
}

export default Result
