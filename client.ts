import io from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

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

socket.on('old_messages', (data) => {
  console.log(data);
});
