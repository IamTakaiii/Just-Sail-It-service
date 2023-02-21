import Logger from '@ioc:Adonis/Core/Logger';
import { BaseTask } from 'adonis5-scheduler/build'
import Project from 'App/Models/Project';

export default class CheckProjectStatus extends BaseTask {

	public static get schedule() {
		// let schedule = process.env.SCHEDULE_CHECK_PROJECT_STATUS
		return '*/5 * * * * *' // every 5 seconds
	}

	public static get useLock() {
		return false
	}

	public async handle() {
    	const projects = await Project.all()
		projects.forEach(async (project) => {
			if (project.truth_score < 6 && project.status != "scam") {
				project.status = "scam"
				Logger.info("Project " + project.id + " is scam")
				await project.save()
				// send Email to notify user to check project and click refund button
			}
		})
  	}
}
