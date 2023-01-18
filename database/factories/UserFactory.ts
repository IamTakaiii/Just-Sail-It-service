import user from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

import { v4 as uuidv4 } from 'uuid';

export default Factory.define(user, ({ faker }) => {
	const address = faker.address
	return {
		id: `dev-user-`.concat(uuidv4()),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		nounce: faker.random.numeric(8),
		location: `${address.city()} ${address.streetAddress()}`,
		portfolio: faker.internet.domainName(),
		website: faker.internet.domainName(),
		user_img: faker.image.imageUrl(),
		about_me: faker.lorem.paragraphs(),
		educations: [{
			university: faker.company.name(),
			subject: faker.random.words()
		}],
		skills: [faker.random.word(), faker.random.word()],
		languages: [faker.word.noun(), faker.word.noun()],
		works_exp: [
			{
				companyName: faker.company.name(),
				position: faker.word.noun(),
				exp: faker.random.numeric()
			},
			{
				companyName: faker.company.name(),
				position: faker.word.noun(),
				exp: faker.random.numeric()
			},
			{
				companyName: faker.company.name(),
				position: faker.word.noun(),
				exp: faker.random.numeric()
			}
		]
	}
}).build()
