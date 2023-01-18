import Env from '@ioc:Adonis/Core/Env'
import { driveConfig } from '@adonisjs/core/build/config'

export default driveConfig({
	disk: Env.get('DRIVE_DISK'),
	disks: {
		s3: {
			driver: 's3',
			visibility: 'public',
			key: Env.get('S3_KEY'),
			secret: Env.get('S3_SECRET'),
			region: Env.get('S3_REGION'),
			bucket: Env.get('S3_BUCKET'),
			endpoint: Env.get('S3_ENDPOINT'),
			forcePathStyle: true,
		},
	},
})
