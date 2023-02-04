class ProjectUtil {
	public static crateObject(id:string, info: any) {
		return {
			user_id : id,
			name: info.name,
			description: info.description,
			catagory: info.catagory,
			story: info.story,
			goal: info.goal,
			start_fund: info.start_fund,
			end_fund: info.end_fund,
			faq: info.faq,
			website: info.website ? info.website : '',
			github: info.github ? info.github : '',
			facebook: info.facebook ? info.facebook : '',
			instagram: info.instagram ? info.instagram : '',
			linkedin: info.linkedin ? info.linkedin : '',
			youtube: info.youtube ? info.youtube : ''
		}
	}
}

export default ProjectUtil
