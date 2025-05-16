import io from 'socket.io-client'
import dotenv from 'dotenv'

dotenv.config()

const message_data2 = {
	username: `${process.env.USERNAME}2`,
	room: process.env.TRAVEL_ID,
	userId: process.env.USER_ID_OTHER,
	travelId: process.env.TRAVEL_ID,
	message: 'Teste de mensagem do user 2',
	chatId: 0,
	type: 'text',
}

export function setupClientTwo() {
	const socket2 = io(`${process.env.CHAT_URL}`, {
		auth: {
			token: `Bearer ${process.env.TOKEN}`,
			user: {
				id: process.env.USER_ID_OTHER,
				clientId: process.env.CLIENT_ID_OTHER,
			},
		},
	})

	socket2.on('connect_error', error => {
		console.log('Erro de conexão:', error)
	})

	socket2.on('connect', () => {
		console.log('Conectado com ID:', socket2.id)
	})

	socket2.emit('select_travel_room', {
		username: `${process.env.USERNAME}2`,
		room: process.env.ROOM_OTHER,
		userId: process.env.USER_ID_OTHER,
		travelId: process.env.TRAVEL_ID,
	})

	socket2.on('old_messages', data => {
		message_data2.room = data.room
	})

	setInterval(
		() =>
			socket2.emit('leave_room', {
				roomKey: message_data2.room,
			}),
		20000
	)

	// setInterval(() => socket2.emit('message', message_data2), 20000)

	// socket2.on('message', data => {
	// 	console.log('mensagem inserida:')
	// 	console.log(data)
	// })

	socket2.on('new_msg_notification', data => {
		console.log('Notificação:')
		console.log(data.message, ' - ', data.notifyDate)
	})
}
