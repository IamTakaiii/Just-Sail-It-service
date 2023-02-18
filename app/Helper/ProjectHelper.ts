import { AUTH, E_CODE } from "App/Constants/Error";
import AuthorizeException from "App/Exceptions/AuthorizeException";
import DatabaseException from "App/Exceptions/DatabaseException";
import Project from "App/Models/Project";


class ProjectHelper {

	public static async checkProjectOwner (projectId: string, userId: string ) {
		const project = await Project
			.query()
			.select('*')
			.from('projects')
			.where('id', '=', projectId)
			.andWhere('user_id', userId)
			.firstOrFail()
			.catch(_err => { throw new AuthorizeException(AUTH.UNAUTH, 401, E_CODE.PROJECT) })
		return project
	}

	public static async gettAllByQS(qs: Record<string, any>) {
		let { page, limit, catagory } = qs
		page = page ? page : 1
		limit = limit ? limit : 20
		const allProject = await Project
			.query()
			.select('*')
			.from('projects')
			.where((builder) => {
				if (catagory) builder.where('catagory', '=', catagory)
				else builder.whereNotNull('user_id')
			})
			.paginate(page, limit)
			.catch(err => { throw new DatabaseException(err.code, 500, E_CODE.PROJECT) })
		return allProject
	}

}

export default ProjectHelper
