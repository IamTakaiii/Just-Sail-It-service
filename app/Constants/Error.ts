// Error type represent to error code
export enum E_CODE {
	TOKEN = "TOKEN_ERROR",
	AUTH = "AUTH_ERROR",
	USER = "USER_ERROR",
	PROJECT="PROJECT_ERROR",
	COMMENT="COMMENT_ERROR"
}

// Error from DB code
export enum DB_CODE {
	DUPLICATE = '23505',
	UNDEFINED_COLUMN = '42703',
}

// Message
export const TOKEN = {
	EXP : "Token Expire",
	INVALID : "Invalid Token",
	UNKNOWN: "Unknown Error In Token Helper Process"
}

export const AUTH = {
	UNAUTH: "Unauthorized To Use The Service",
	UNKNOWN: "Unknown Error Happend In Auth Process"
}

export const DB = {
	DUPLICATE: "Data have already exist in database",
	UNDEFINED_COLUMN: "Some column does not exist in relation",
	UNKNOWN: "Unknown Error In Database Process"
}

