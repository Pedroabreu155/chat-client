import io from 'socket.io-client'
import dotenv from 'dotenv'
import { setupClientTwo } from './client-two'

dotenv.config()

const message_data = {
	username: process.env.USERNAME,
	room: process.env.TRAVEL_ID,
	userId: process.env.USER_ID,
	travelId: process.env.TRAVEL_ID,
	message: 'Teste de mensagem',
	chatId: 0,
	type: 'text',
}

const socket = io(`${process.env.CHAT_URL}`, {
	auth: {
		token: `Bearer ${process.env.TOKEN}`,
		user: {
			id: process.env.USER_ID,
			clientId: process.env.CLIENT_ID,
		},
	},
})

setupClientTwo()

socket.on('connect_error', error => {
	console.log('Erro de conexão:', error)
})

socket.on('connect', () => {
	console.log('Conectado com ID:', socket.id)
})

socket.emit('select_travel_room', {
	username: process.env.USERNAME,
	room: process.env.ROOM,
	userId: process.env.USER_ID,
	travelId: process.env.TRAVEL_ID,
})

socket.on('old_messages', data => {
	console.log('mensagens:', data.messages.length)
	message_data.chatId = data.chatId
	message_data.message = 'Teste de mensagem'
	message_data.room = data.room
})

setInterval(() => socket.emit('message', message_data), 15000)

socket.on('message', data => {
	console.log('mensagem inserida:')
	console.log(data)
})

socket.on('new_msg_notification', data => {
	console.log(data)
})
