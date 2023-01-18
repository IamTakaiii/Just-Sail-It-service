import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
	DRIVE_DISK: Env.schema.enum(['s3'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	PG_HOST: Env.schema.string({ format: 'host' }),
	PG_PORT: Env.schema.number(),
	PG_USER: Env.schema.string(),
	PG_PASSWORD: Env.schema.string.optional(),
	PG_DB_NAME: Env.schema.string(),
	S3_KEY: Env.schema.string(),
	S3_SECRET: Env.schema.string(),
	S3_BUCKET: Env.schema.string(),
	S3_REGION: Env.schema.string(),
	S3_ENDPOINT: Env.schema.string.optional(),
})
