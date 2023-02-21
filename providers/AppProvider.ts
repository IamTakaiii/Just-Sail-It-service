import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
	constructor(protected app: ApplicationContract) {}

	public register() {
		// Register your own bindings
	}

	public async boot() {
		const scheduler = this.app.container.use('Adonis/Addons/Scheduler')
		scheduler.run()
	}

	public async ready() {
		// App is ready
	}

	public async shutdown() {
		// Cleanup, since app is going down
	}
}
