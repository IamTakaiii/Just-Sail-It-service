import Redis from '@ioc:Adonis/Addons/Redis'
import Event from '@ioc:Adonis/Core/Event'

import { EVENTDB } from 'App/Constants/EventCode'

Redis.psubscribe('project:*', (topic: string, message: string) => {
	console.log('message from event listenner has arrive !!!')
	if (topic === 'project:create_done') Event.emit(EVENTDB.SAVE_PROJECT, message)
	if (topic === 'project:donate_done') console.log(message)
	if (topic === 'project:withdraw_done') console.log(message)
})
