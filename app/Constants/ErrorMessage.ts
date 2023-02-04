export enum DB_MSG {
	DUPLICATE = "Data already exist in database, pls check your request data again",
	UNDEFINED_COLUMN = "Some column from your data does not exit",
	UNKNOWN = 'Unknow error happend in database'
}

export enum AUTH_MSG {
	INVALID = 'Invalid token may be it expire or signature not match ',
	EXPIRE = 'Token expire, pls login again',
	UNAUTHORIZE_UPDATE = 'Unauthorized to update other user data',
	UNKNOWN = 'Unknow error happend in auth module'
}


export enum REQEST_MSG {
	EMPTY = 'Empty request body'
}

export enum SERVER_MSG {
	TIMEOUT = 'Server Timeout'
}
