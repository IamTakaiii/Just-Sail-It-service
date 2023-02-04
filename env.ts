import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	// Initialize Rules
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
	DRIVE_DISK: Env.schema.enum(['s3'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	// PostgreSQL Rules
	PG_HOST: Env.schema.string({ format: 'host' }),
	PG_PORT: Env.schema.number(),
	PG_USER: Env.schema.string(),
	PG_PASSWORD: Env.schema.string.optional(),
	PG_DB_NAME: Env.schema.string(),
	// S3 Rules
	S3_KEY: Env.schema.string(),
	S3_SECRET: Env.schema.string(),
	S3_BUCKET: Env.schema.string(),
	S3_REGION: Env.schema.string(),
	S3_ENDPOINT: Env.schema.string.optional(),
	// Redis Rules
	REDIS_CONNECTION: Env.schema.enum(['local'] as const),
	REDIS_HOST: Env.schema.string({ format: 'host' }),
	REDIS_PORT: Env.schema.number(),
	REDIS_PASSWORD: Env.schema.string.optional(),
	RAND_USER_IMG: Env.schema.string(),
	RAND_USER_COVER: Env.schema.string(),
})
