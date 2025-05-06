import io from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

const message_data = {
  username: process.env.USERNAME,
  room: process.env.TRAVEL_ID,
  userId: process.env.USER_ID,
  travelId: process.env.TRAVEL_ID,
  message: '',
  chatId: 0,
};

const socket = io(`${process.env.CHAT_URL}`, {
  extraHeaders: {
    authorization: `Bearer ${process.env.TOKEN}`,
  },
});

socket.on('connect', () => {
  console.log('Conectado com ID:', socket.id);
});

socket.emit('select_travel_room', {
  username: process.env.USERNAME,
  room: process.env.ROOM,
  userId: process.env.USER_ID,
  travelId: process.env.TRAVEL_ID,
});

socket.on('connect_error', (error) => {
  console.log('Erro de conexão:', error);
});

socket.on('old_messages', (data) => {
  console.log(data);
  message_data.chatId = data.chatId;
  message_data.message = 'Teste de mensagem';

  socket.emit('message', message_data);
});

socket.on('message', (data) => {
  console.log(data);
  console.log('mensagem foi inserida');
});
